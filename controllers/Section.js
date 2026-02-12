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
     const newSection=await Section.createSection({sectionName});

     //update course with section objectId
     const updateCourseDetails=await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                          $push:{
                                            courseContent:newSection._id,
                                          }
                                        },
                                        {new:true},
                                        );
                                        // .populate({
                                        //   path: "courseContent",
                                        //   populate: {
                                        //     path: "subSection", 
                                        //   },
                                        // });
    //return response
    return res.status(200).json({
        status:true,
        message:'Section created successfully',
    });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to create section ,please try again',
        error:error.message,
     });
    }
};

//UPDATE SECTION

exports.updateSection=async(req,res)=>{
    try{
     //data input
     const{sectionName,sectionId}=req.body;

     //data validation
     if(!sectionName || !sectionId){
        return res.status(400).json({
            success:false,
            message:'Missing Properties',
        });
     }

     //update data
     const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

     //return response
     return res.status(200).json({
        success:true,
        message:'Section Updated Successfully',
     });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to update section ,please try again',
        error:error.message,
     });
    }
};

//Delete section

exports.deleteSection=async(req,res)=>{
    try{
     //get id
     const {sectionId}=req.params;

     //find by id and delete
     await Section.findByIdAndDelete(sectionId);
       
     //return response
     return res.status(200).json({
        success:true,
        message:'Section Deleted Successfully',
     });

    }catch(error){
      return res.status(500).json({
        success:false,
        message:'Unable to delete section ,please try again',
        error:error.message,
     });
    }
};