const Section=require("../models/Section");
const Course=require("../models/Course");


//CREATE SECTION

exports.createSection=async(req,res)=>{
    try{
     //data fetch
     const{sectionName,courseId}=req.body;

     //data validation
     if(!sectionName || !courseId){
        return res.status(400).json({
            success:false,
            message:'Missing Properties',
        });
     }

     //create Section
     const newSection=await Section.create({sectionName});
     
     

     //update course with section objectId
     const updateCourseDetails=await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                          $push:{
                                            courseContent:newSection._id,
                                          }
                                        },
                                        {new:true},
                                        )

                                        .populate({
            path: "courseContent",
            select: "sectionName subSection" // 👈 This maps and replaces the IDs with the actual fields!
        })
        .exec();


                                       
                                        
    //return response
    return res.status(200).json({
        success:true,
        message:'Section created successfully',
        data: updateCourseDetails
    });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to create section ,please try again',
        error:error.message,
     });
    }
};

// UPDATE SECTION

exports.updateSection = async (req, res) => {
  try {
    // data input
    const { sectionName, sectionId, courseId } = req.body;

    // data validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // update section
    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // get updated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        select: "sectionName subSection",
      })
      .exec();

    // return updated course
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: updatedCourse,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section, please try again",
      error: error.message,
    });
  }
};

// DELETE SECTION

exports.deleteSection = async (req, res) => {
  try {
    // get id
    const { sectionId, courseId } = req.body;

    // find and delete section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    console.log("Deleted Section:", deletedSection);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // remove section from course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        select: "sectionName subSection",
      })
      .exec();

    // return updated course
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
      data: updatedCourse,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message,
    });
  }
};