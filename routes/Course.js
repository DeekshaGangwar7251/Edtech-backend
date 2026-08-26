// // Import the required modules
// const express = require("express")
// const router = express.Router()

// // Import the Controllers

// // Course Controllers Import
// const {
//   createCourse,
//   getAllCourses,
//   getCourseDetails,
// } = require("../controllers/Course")


// // Categories Controllers Import
// const {
//   showAllCategories,
//   createCategory,
//   categoryPageDetails,
// } = require("../controllers/Category")

// // Sections Controllers Import
// const {
//   createSection,
//   updateSection,
//   deleteSection,
// } = require("../controllers/Section")

// // Sub-Sections Controllers Import
// const {
//   createSubSection,
//   updateSubSection,
//   deleteSubSection,
// } = require("../controllers/Subsection")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRating,
// } = require("../controllers/RatingAndReview")

// // Importing Middlewares
// const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// // ********************************************************************************************************
// //                                      Course routes
// // ********************************************************************************************************

// // Courses can Only be Created by Instructors
// router.post("/createCourse", auth, isInstructor, createCourse)
// //Add a Section to a Course
// router.post("/addSection", auth, isInstructor, createSection)
// // Update a Section
// router.post("/updateSection", auth, isInstructor, updateSection)
// // Delete a Section
// router.post("/deleteSection", auth, isInstructor, deleteSection)
// // Edit Sub Section
// router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// // Delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// // Add a Sub Section to a Section
// router.post("/addSubSection", auth, isInstructor, createSubSection)
// // Get all Registered Courses
// router.get("/getAllCourses", getAllCourses)
// // Get Details for a Specific Courses
// router.post("/getCourseDetails", getCourseDetails)

// // ********************************************************************************************************
// //                                      Category routes (Only by Admin)
// // ********************************************************************************************************
// // Category can Only be Created by Admin
// // TODO: Put IsAdmin Middleware here
// router.post("/createCategory", auth, isAdmin, createCategory)
// router.get("/showAllCategories", showAllCategories)
// router.post("/getCategoryPageDetails", categoryPageDetails)

// // ********************************************************************************************************
// //                                      Rating and Review
// // ********************************************************************************************************
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews",getAllRating)
// console.log("getAllRating:", getAllRating);

// module.exports = router



// const express = require("express");
// const router = express.Router();

// // Import Controllers safely
// const CourseCtrl = require("../controllers/Course");
// const CategoryCtrl = require("../controllers/Category");
// const SectionCtrl = require("../controllers/Section");
// const SubSectionCtrl = require("../controllers/Subsection");
// const RatingCtrl = require("../controllers/RatingAndReview");

// // Import Middlewares
// const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// // Debug: check what's undefined
// console.log("DEBUG CONTROLLERS:", {
//   createCourse: CourseCtrl.createCourse,
//   getAllCourses: CourseCtrl.getAllCourses,
//   getCourseDetails: CourseCtrl.getCourseDetails,

//   showAllCategories: CategoryCtrl.showAllCategories,
//   createCategory: CategoryCtrl.createCategory,
//   categoryPageDetails: CategoryCtrl.categoryPageDetails,

//   createSection: SectionCtrl.createSection,
//   updateSection: SectionCtrl.updateSection,
//   deleteSection: SectionCtrl.deleteSection,

//   createSubSection: SubSectionCtrl.createSubSection,
//   updateSubSection: SubSectionCtrl.updateSubSection,
//   deleteSubSection: SubSectionCtrl.deleteSubSection,

//   createRating: RatingCtrl.createRating,
//   getAverageRating: RatingCtrl.getAverageRating,
//   getAllRating: RatingCtrl.getAllRating,
// });

// // Helper to prevent crash
// const safe = (fn) => (typeof fn === "function" ? fn : (req, res) => {
//   return res.status(500).json({
//     success: false,
//     message: "Controller not implemented properly",
//   });
// });

// // ***************************************
// // Course routes
// // ***************************************

// router.post("/createCourse", auth, isInstructor, safe(CourseCtrl.createCourse));
// router.post("/addSection", auth, isInstructor, safe(SectionCtrl.createSection));
// router.post("/updateSection", auth, isInstructor, safe(SectionCtrl.updateSection));
// router.post("/deleteSection", auth, isInstructor, safe(SectionCtrl.deleteSection));

// router.post("/updateSubSection", auth, isInstructor, safe(SubSectionCtrl.updateSubSection));
// router.post("/deleteSubSection", auth, isInstructor, safe(SubSectionCtrl.deleteSubSection));
// router.post("/addSubSection", auth, isInstructor, safe(SubSectionCtrl.createSubSection));

// router.get("/getAllCourses", safe(CourseCtrl.getAllCourses));
// router.post("/getCourseDetails", safe(CourseCtrl.getCourseDetails));

// // ***************************************
// // Category routes
// // ***************************************

// router.post("/createCategory", auth, isAdmin, safe(CategoryCtrl.createCategory));
// router.get("/showAllCategories", safe(CategoryCtrl.showAllCategories));
// router.post("/getCategoryPageDetails", safe(CategoryCtrl.categoryPageDetails));

// // ***************************************
// // Rating routes
// // ***************************************

// router.post("/createRating", auth, isStudent, safe(RatingCtrl.createRating));
// router.get("/getAverageRating", safe(RatingCtrl.getAverageRating));
// router.get("/getReviews", safe(RatingCtrl.getAllRating));

// module.exports = router;


const express = require("express");
const router = express.Router();

// Controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  editCourse,
  deleteCourse,
} = require("../controllers/Course");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/CourseProgress");

// Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// ***************************************
// Course routes
// ***************************************

router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
// router.post("/editCourse", auth, isInstructor, editCourse);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)
// ***************************************
// Category routes
// ***************************************

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ***************************************
// Rating & Review routes
// ***************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;