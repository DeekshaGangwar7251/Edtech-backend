const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}= require("../utils/imageUploader");


//CREATE SUB-SECTION
exports.createSubSection=async(req,res)=>{
    try{
    //fetch data
    const{sectionId,title,timeDuration,description}=req.body;

    //extract file/vid
    const video=req.files.videoFile;
    //validation
     if(!sectionId || !title || !timeDuration || !description || !video){
        return res.status(400).json({
            success:false,
            message:'Missing Properties',
        });
     }
    //upload vid to cloudinary
    const uploadDetails= await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

    //create sub-section
    const subSectionDetails=await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
    })
    //update section with this subsection objectid
    const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                                            {$push:{
                                                subSection:SubSectionDetails._id,
                                            }},
                                            {new:true}
                                            ).populate("subSection");

    //return response
    return res.status(200).json({
        success:true,
        message:'Sub-section created Successfully',
        updatedSection,
     });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to create subsection ,please try again',
        error:error.message,
     });
    }
};

//update sub-section

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;

    const updateData = { title, timeDuration, description };

    // if new video is uploaded
    if (req.files && req.files.videoFile) {
      const uploadDetails = await uploadImageToCloudinary(
        req.files.videoFile,
        process.env.FOLDER_NAME
      );

      updateData.videoUrl = uploadDetails.secure_url;
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection Updated Successfully",
      data: updatedSubSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating subsection",
      error: error.message,
    });
  }
};


//delete sub-section

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    // delete subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // remove from section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
      data: updatedSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting subsection",
      error: error.message,
    });
  }
};


