
const Course = require("../models/Course");
const tagDetails = require("../models/Tags");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


// ======================================================
// CREATE COURSE
// ======================================================

exports.createCourse = async (req, res) => {
    try {
        // 1. Fetch data
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            instructions,
            status,
        } = req.body;

        // 2. Get thumbnail file
        const thumbnail = req.files?.thumbnailImage;

        // 3. Validation
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 4. Check for instructor
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);

        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        // 5. Check category
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found",
            });
        }

        // 6. Upload thumbnail
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // 7. Parse instructions
        let parsedInstructions = [];

        if (instructions) {
            try {
                parsedInstructions =
                    typeof instructions === "string"
                        ? JSON.parse(instructions)
                        : instructions;
            } catch (error) {
                parsedInstructions = [];
            }
        }

        // 8. Create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,

            // IMPORTANT
            whatYouWillLearn,

            price,

            tag: tag || [],

            category: categoryDetails._id,

            thumbnail: thumbnailImage.secure_url,

            // IMPORTANT
            instructions: parsedInstructions,

            status: status || "Draft",
        });

        // 9. Add course to instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // 9b. Add course to its category
        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // 10. Return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create Course",
            error: error.message,
        });
    }
};


// ======================================================
// EDIT COURSE DETAILS
// ======================================================

exports.editCourse = async (req, res) => {
    try {
        const {
            courseId,
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            category,
            instructions,
            status,
        } = req.body;

        // Find course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // ==================================================
        // UPDATE BASIC COURSE INFORMATION
        // ==================================================

        if (courseName !== undefined) {
            course.courseName = courseName;
        }

        if (courseDescription !== undefined) {
            course.courseDescription = courseDescription;
        }

        if (price !== undefined) {
            course.price = price;
        }

        if (whatYouWillLearn !== undefined) {
            course.whatYouWillLearn = whatYouWillLearn;
        }

        if (category !== undefined && category !== String(course.category)) {
            // Remove course from old category, add to new category
            await Category.findByIdAndUpdate(course.category, {
                $pull: { courses: course._id },
            });
            await Category.findByIdAndUpdate(category, {
                $push: { courses: course._id },
            });
            course.category = category;
        }

        if (status !== undefined) {
            course.status = status;
        }

        // ==================================================
        // UPDATE REQUIREMENTS
        // ==================================================

        if (instructions !== undefined) {
            try {
                course.instructions =
                    typeof instructions === "string"
                        ? JSON.parse(instructions)
                        : instructions;
            } catch (error) {
                console.log(
                    "Error parsing instructions:",
                    error
                );
            }
        }

        // ==================================================
        // UPDATE THUMBNAIL
        // ==================================================

        if (req.files && req.files.thumbnailImage) {
            console.log("thumbnail update");

            const thumbnail =
                req.files.thumbnailImage;

            const thumbnailImage =
                await uploadImageToCloudinary(
                    thumbnail,
                    process.env.FOLDER_NAME
                );

            course.thumbnail =
                thumbnailImage.secure_url;
        }

        // Save updated course
        await course.save();

        // ==================================================
        // FETCH UPDATED COURSE
        // ==================================================

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// ======================================================
// GET ALL COURSES
// ======================================================

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            { status: "Published" },
            {
                courseName: true,
                courseDescription: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Not fetch course data",
            error: error.message,
        });
    }
};


// ======================================================
// GET COURSE DETAILS
// ======================================================

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                status: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration) || 0;
                totalDurationInSeconds += timeDurationInSeconds;
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: {
                courseDetails,
                totalDuration,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};


// ======================================================
// GET FULL COURSE DETAILS
// ======================================================

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }

        const courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                totalDurationInSeconds += parseInt(subSection.timeDuration || 0);
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount.completedVideos
                    : [],
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// GET INSTRUCTOR COURSES
// ======================================================

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: instructorCourses,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};


// ======================================================
// DELETE COURSE
// ======================================================

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        const studentsEnrolled =
            course.studentsEnrolled;

        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(
                studentId,
                {
                    $pull: {
                        courses: courseId,
                    },
                }
            );
        }

        const courseSections =
            course.courseContent;

        for (const sectionId of courseSections) {
            const section =
                await Section.findById(sectionId);

            if (section) {
                const subSections =
                    section.subSection;

                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(
                        subSectionId
                    );
                }
            }

            await Section.findByIdAndDelete(
                sectionId
            );
        }

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


