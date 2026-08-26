const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

// ======================================================
// UPDATE COURSE PROGRESS (mark a lecture/sub-section as completed)
// ======================================================

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the sub-section actually exists
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Invalid sub-section / lecture",
            });
        }

        // Find the progress document for this user + course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            // If for some reason it doesn't exist yet (e.g. old enrollment), create it
            courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });
        }

        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(200).json({
                success: true,
                message: "Lecture already marked as completed",
            });
        }

        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: "Course progress updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
