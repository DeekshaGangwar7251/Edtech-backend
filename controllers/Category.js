// const Category=require("../models/Category");

// exports.createCategory=async(req,res)=>{
//     try{

//     const {name,description}=req.body;
//     if(!name||!description){
//         return res.status(400).json({
//             success:false,
//             message:'All fields are required',
//         });
//     }

//     const categoryDetails=await Category.create({
//         name:name,
//         description:description,
//     });
//     console.log(categoryDetails);

//     return res.status(200).json({
//         success:true,
//         message:'Category created Successfully',
//     });

//     }catch(error){
//       return res.status(500).json({
//         success:false,
//         message:error.message,
//       })
//     }
// };

// //getAllTags

// exports.showAllCategories=async(req,res)=>{
//     try{
//       const allTags=await Category.find({},{name:true,description:true});
//       res.status(200).json({
//         success:true,
//         message:'All categories returned successfully',
//         allTags,
//       });
//     }catch(error){
//      return res.status(500).json({
//         success:false,
//         message:error.message,
//      });
//     }
// };

// //category page details

//  exports.categoryPageDetails=async(req,res)=>{
//   try{
//        //get category id
//        const {categoryId}=req.body;
//       // get courses for specified id
//       const selectedCategory=await Category.findById(categoryId)
//                                            .populate("courses")
//                                            .exec();
//       //validate
//       if(!selectedCategory){
//          return res.status(404).json({
//         success:false,
//         message:'Data not found',
//       });
//      }

//       //get courses for diff category
//       const differentCategories=await Category.find({
//                                 _id:{$ne:categoryId},
//                                  })
//                                  .populate("courses")
//                                  .exec();
//       //get top selling courses

//       //return 
//        return res.status(200).json({
//         success:true,
//         data:{
//           selectedCategory,
//           differentCategories,
//         },     
//     });
//   }
//   catch(error){
//      return res.status(200).json({
//         success:false,
//         message:error.message,
//     });
//   }
//  }

const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryDetails = await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created Successfully",
      data: categoryDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ FIXED NAME
exports.showAllCategories = async (req, res) => {
  try {
    const allTags = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      data: allTags,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};