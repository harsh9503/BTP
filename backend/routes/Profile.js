const express = require("express")
const router = express.Router()

const { auth, isInstructor,isStudent, isAdmin } = require("../middlewares/auth")
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, adminDashboard, instructorDashboard} = require("../controllers/Profile")
  

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.get("/instructordashboard", auth, isAdmin, adminDashboard)
router.get("/admindashboard", auth, isInstructor, instructorDashboard)

module.exports = router