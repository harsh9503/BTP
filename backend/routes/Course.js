const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse,
  editCourse,
  updateCourseProgress
} = require("../controllers/Course");

const { showAllCategories, createCategory,getCategoryInfo,categoryPageDetails,topSellingcouses} = require("../controllers/Category")
const { createSection,updateSection,deleteSection} = require("../controllers/Section")
const { createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
const {  createRating, getAllRating} = require("../controllers/RatingAndReview");
const { getEnrolledCourses }= require("../controllers/Profile");

router.post("/createCourse", auth, isInstructor, createCourse)
router.get("/getAllCourses", getAllCourses)
router.get("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails",auth, getFullCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse",auth, deleteCourse)
router.put("/editCourse", auth, isInstructor, editCourse)
router.put("/updateCourseProgress",auth,updateCourseProgress)
router.get("/getEnrolledCourses",auth, isStudent, getEnrolledCourses)

router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)

router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryInfo",getCategoryInfo)
router.get("/topselling",topSellingcouses)
router.get("/getCategoryPageDetails",categoryPageDetails)

//router.get("/getAverageRating",getAverageRating)
router.post("/createRating",auth, createRating)
router.post("/getReviews",getAllRating)

module.exports = router