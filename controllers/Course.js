const Course= require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")

const { uploadImageToCloudinary } = require("../utils/imageUploader")


exports.createCourse = async (req, res) => {
        try{
            
            const{ courseName, courseDescription,whatYouWillLearn,price,tag}= req.body;

            const thumbnail=req.files.thumbnailImage;

             // Check if any of the required fields are missing
            if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail ||) {
                 return res.status(400).json({
                 success: false,
                 message: "All Fields are Mandatory",
                })
            } 

            const userId=req.user.id;

            const instructorDetails= await User.findById(userId);

            console.log(instructorDetails);

            if(!instructorDetails){
                return res.status(404).json({
                    success: false,
                    message: "Instructor Details not found",
                   })
            }

            const tagDetails= await Tag.findById(tag);
            if(!tagDetails){
                return res.status(404).json({
                    success: false,
                    message: "Tag Details not found",
                   })
            }

            const thumbnailImage=await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

            const newCourse = await Course.create(
                {
                    courseName, 
                    courseDescription,
                    instructor:instructorDetails._id,
                    whatYouWillLearn:whatYouWillLearn,
                    tag:tagDetails._id,
                    thumbnail:thumbnailImage.secure_url
                }
            )

                // Add the new course to the User Schema of the Instructor
            await User.findByIdAndUpdate(
                {
                _id: instructorDetails._id,
                },
                {
                $push: {
                    courses: newCourse._id,
                },
                }, 
                { new: true }
            )

            // Return the new course and a success message
            res.status(200).json({
                success: true,
                data: newCourse,
                message: "Course Created Successfully",
            })

        }
        catch{
            console.error(error)
            res.status(500).json({
              success: false,
              message: "Failed to create course",
              error: error.message,
            })        

        }
}

// Get Course List
exports.getAllCourses = async (req, res) => {
    try {
      const allCourses = await Course.find(
        {},
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReviews: true,
          studentsEnrolled: true,
        }
      )
        .populate("instructor")
        .exec()
  
      return res.status(200).json({
        success: true,
        data: allCourses,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
      })
    }
  }
  
  