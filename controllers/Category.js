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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Get published courses for the selected category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory: null,
          mostSellingCourses: [],
        },
      });
    }

    // Pick a random other category to showcase
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;

    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findById(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Get a handful of published courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses.slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};