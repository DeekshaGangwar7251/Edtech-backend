const Profile=require("../models/Profile");
const User=require("../models/User");

//update profile

exports.updateProfile=async(req,res)=>{
    try{
     //get data
     const{dateOfBirth="",about="",constactNumber,gender}=req.body;

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
        updatedSection,
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

exports.deleteProfile = async (req, res) => {
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
