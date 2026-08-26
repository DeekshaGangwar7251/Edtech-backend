const Profile=require("../models/Profile");
const User=require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

//update profile

exports.updateProfile=async(req,res)=>{
    try{
     //get data
     const{dateOfBirth="",about="",contactNumber,gender}=req.body;

     //get userid
     const id=req.user.id;

     //validation
     if(!contactNumber ||!gender||!id){
        return res.status(400).json({
            success:false,
            message:'All fields are required',
        });
     }

     //find profile
     const userDetails=await User.findById(id);
     const profileId=userDetails.additionalDetails;
     const profileDetails=await Profile.findById(profileId);

     //update profile
     profileDetails.dateOfBirth=dateOfBirth;
     profileDetails.about=about;
     profileDetails.gender=gender;
     profileDetails.contactNumber=contactNumber;
     await profileDetails.save();
     

     //return response
      return res.status(200).json({
        success:true,
        message:'profile updated Successfully',
        data: profileDetails,
     });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to update profile,please try again',
        error:error.message,
     });
    }
};


//Delete account

exports.deleteAccount = async (req, res) => {
  try {
    // get user id
    const id = req.user.id;

    // find user
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileId = userDetails.additionalDetails;

    // delete profile
    await Profile.findByIdAndDelete(profileId);

    
    //todo:unenroll user from all enrolled courses
     // unenroll user from all courses
    await Course.updateMany(
      { studentsEnrolled: id },
      { $pull: { studentsEnrolled: id } }
    );
    //delete user
    await User.findByIdAndDelete({_id:id});
    

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete account",
      error: error.message,
    });
  }
};

 //getAllUserDetails

 exports.getAllUserDetails = async (req, res) => {
  try {
    // get user id from token
    const userId = req.user.id;

    // find user and populate profile
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")   // profile
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch user details",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    userDetails = userDetails.toObject();

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let subsectionLength = 0;

      for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );

        subsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }

      let courseProgress = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      const completedCount = courseProgress?.completedVideos.length || 0;

      if (subsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (completedCount / subsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses || [],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enrolled courses",
      error: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });

    return res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  // return res.status(200).json({
  //   success: true,
  //   message: "Display picture updated",
    
  // });

  try {
        // Get the logged-in user's ID from the authentication middleware
        const userId = req.user.id; 

        
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image file under the key 'displayPicture'",
            });
        }

        // Grab the file data from the request
        const imageFile = req.files.displayPicture;

        // Upload the file to r Cloudinary storage folder
        const imageUploadDetails = await uploadImageToCloudinary(
            imageFile,
            process.env.FOLDER_NAME,
            200,
            200
        );

        // Find the user in MongoDB, update their image link, and return the NEW data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: imageUploadDetails.secure_url },
            { new: true } // 'new: true' tells mongoose to give us the fresh data back
        ).populate("additionalDetails");

       
        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: updatedUser 
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update display picture",
            error: error.message,
        });
    }
};

// ======================================================
// INSTRUCTOR DASHBOARD DATA
// ======================================================

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };
        });

        return res.status(200).json({
            success: true,
            courses: courseData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
