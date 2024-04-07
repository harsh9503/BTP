const express = require("express")
const router = express.Router()

const { auth, isInstructor,isStudent, isAdmin } = require("../middlewares/auth")
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, adminDashboard, instructorDashboard} = require("../controllers/Profile")
const { addToWishlist, removeFromWishlist, getWishlistDetails} = require("../controllers/Wishlist")

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.get("/admindashboard", auth, isAdmin, adminDashboard)
router.get("/instructordashboard", auth, isInstructor, instructorDashboard)

router.post("/addtowishlist", auth, isStudent, addToWishlist)
router.delete("/removefromwishlist", auth, isStudent, removeFromWishlist)
router.post("/getwishlist", auth, isStudent, getWishlistDetails)


module.exports = router