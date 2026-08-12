const Course=require("../models/Course");
const tagDetails=require("../models/Tags");
const User=require("../models/User");
const Category=require("../models/Category");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try {
        // 1. Fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category, tag } = req.body;

        // 2. Get thumbnail file
        const thumbnail = req.files.thumbnailImage;

        // 3. Validation (Removed '!tag' since tags are currently disabled on frontend)
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail || !category) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // 4. Check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not found',
            });
        }

        // 5. Check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category Details not found',
            });
        }

        // 6. Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // 7. Create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: tag || [], // Safe fallback if tag is missing
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        // 8. Add the new course to the user schema of instructor (FIXED ID HERE)
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // 9. Return success response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Course',
            error: error.message,
        });
    }
};

//getAllCourses

exports.getAllCourses=async(req,res)=>{
    try{

        const allCourses=await Course.find({},{courseName:true,
                                               price:true,
                                               thumbnail:true,
                                               instructor:true,
                                               ratingAndReview:true,
                                               studentsEnrolled:true
                                              })
                                              .populate("instructor")
                                              .exec();
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })                        

        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Not fetch course data',
            error:error.message,
        });
    }
};

//getCourseDetails

exports.getCourseDetails=async(req,res)=>{
    try{

        const {courseId}=req.body;
        const courseDetails = await Course.findById(courseId)
                                  .populate(
                                    {
                                        path:"instructor",
                                        populate:{
                                            path:"additionalDetails",
                                        },
                                    }
                                  )
                                  .populate("category")
                                  .populate("ratingAndReviews")
                                  .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    },
                                  })
                                  .exec();
        //validation
        if(!courseDetails){
            return res.status(400).json({
                status:false,
                message:`Could not find the course with ${courseId}`,
            });
        }  
        
        return res.status(200).json({
            success:true,
            message:'Course Details fetched successfully',
            data:courseDetails,
        });
    }catch(error){
      console.log(error);
      return res.status(500).json({
        status:false,
        message:error.message,
      });
    }
}

