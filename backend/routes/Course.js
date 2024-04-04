const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse
} = require("../controllers/Course");

const { showAllCategories, createCategory,getCategoryInfo} = require("../controllers/Category")
const { createSection,updateSection,deleteSection} = require("../controllers/Section")
const { createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
const {getAverageRating, createRating, getAllRating} = require("../controllers/RatingAndReview");

router.post("/createCourse", auth, isInstructor, createCourse)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)

router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)

router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryInfo",getCategoryInfo)

router.post("/getAverageRating",getAverageRating)
router.post("/createRating",auth,createRating)
router.get("/getAllRatings",getAllRating);
module.exports = router