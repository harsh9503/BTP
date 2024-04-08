const Course = require('../models/Course');
const User = require('../models/User');

//const { mongoose } = require("mongoose");
//-------------------------------------------------------------------------------------------------
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        if(!userId){
            return res.status(404).json({
                success:false,
                message:'You are not logged In, Please login to add Course',
            });
        }
       
        // Check if the course already exists in the wishlist
        const user = await User.findById(userId);
        const courseDetails = await Course.findById(courseId);

        if (user.wishlist.includes(courseId)) {
            return res.status(400).json({ 
                success : false,
                message : 'Course already exists in wishlist' 
            });
        }

        const curtotalprice = user.totalPrice;
        const newtotalprice = curtotalprice + courseDetails.price;

        const updatedUserDetails = await User.findByIdAndUpdate({_id:userId},
            {
                totalPrice: newtotalprice,
                $push: {
                    wishlist: courseId,
                }
            },
            {new: true});

        console.log(updatedUserDetails);

      res.status(200).json({ 
        updatedUserDetails,
        message: 'Course added to wishlist successfully', 
        success : true
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: 'Internal server error' 
    });
    }
  };

  //------------------------------------------------------------------------------------------------
  exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: 'You are not logged in. Please login to remove a course from the wishlist.',
            });
        }

        // Check if the course exists in the user's wishlist
        const user = await User.findById(userId);

        if (!user.wishlist.includes(courseId)) {
            return res.status(400).json({
                success: false,
                message: 'Course does not exist in wishlist.',
            });
        }

        // Find the course details
        const courseDetails = await Course.findById(courseId);

        // Calculate the new total price
        const newTotalPrice = user.totalPrice - courseDetails.price;

        // Remove the course from the wishlist and update the total price
        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            {
                totalPrice: newTotalPrice,
                $pull: { wishlist: courseId },
            },
            { new: true }
        );

        console.log(updatedUserDetails);

        return res.status(200).json({
            updatedUserDetails,
            message: 'Course removed from wishlist successfully.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

//-----------------------------------------------------------------------------------------

exports.getWishlistDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please login to continue.',
            });
        }

        const user = await User.findById(userId);

        const wishlist = user.wishlist;

        // Fetch course details for each course in the wishlist
        const wishlistDetails = await Promise.all(wishlist.map(async courseId => {
            const course = await Course.findById(courseId).populate('instructor', 'firstName lastName');
            return {
                _id: course._id,
                courseName: course.courseName,
                instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
                price: course.price,
                avgRating: course.avg_rating.toFixed(2), // Rounded to 2 decimal places
                totalRatingCount: course.ratingAndReviews.length,
            };
        }));

        const totalPrice = user.totalPrice;

        return res.status(200).json({
            wishlist: wishlistDetails,
            totalPrice,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error.',
        });
    }
};
