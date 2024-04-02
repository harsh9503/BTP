const Category = require("../models/Category");

//------------------------------------------------------------------------------------
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "Name is required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};


//---------------------------------------------------------------------------------

exports.showAllCategories = async (req, res) => {
	try {
        
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


//--------------------------------------------------------------------------------
exports.getCategoryInfo = async(req,res) =>{
	try{
		const {catalogId} = req.body;
		if(!catalogId){
			return res.status(403).json({
				success: false,
				message: "CatalogId undefined",
			});
		}
		const category = await Category.findById(catalogId);
		return res.status(200).json({
			success:true,
			data: category
		})
	}
	catch(error){
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

//---------------------------------------------------------------------------------------------

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);

      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      // Handle the case when the Category is not found
      if (!selectedCategory) {
        console.log("category not found.")
        return res
          .status(404)
          .json({ 
			success: false, 
			message: "Category not found" 
		  })
      }
      // when there are no courses in category
      if (selectedCategory.courses.length === 0) 
	  {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
      
	  res.status(200).json({
        success: true,
        data: selectedCategory,
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  //------------------------------------------------------------------------------------------------

  exports.topSellingcouses = async (req, res) => {
    try {
		const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

		const allCourses = allCategories.flatMap((category) => category.courses)
		// Calculate number of units sold for each course
		const coursesWithSoldCount = allCourses.map(course => {
					return {
						...course.toObject(),
						sold: course.studentsEnrolled.length  // Number of enrolled students indicates units sold
					};
		});
		
		// Sort courses based on units sold
		const mostSellingCourses = coursesWithSoldCount
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);
		
		// Return the most selling courses
		res.status(200).json({
			success: true,
			message: "Top selling courses retrieved successfully",
			courses: mostSellingCourses
		});
		
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
