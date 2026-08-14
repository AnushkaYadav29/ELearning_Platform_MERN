const Course = require("../models/Course");


/* =================================
   GET ALL PUBLISHED COURSES
================================= */

const getCourses = async (req, res) => {
  try {
    const {
      search,
      category,
      level,
    } = req.query;

    const query = {
      published: true,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    const courses = await Course.find(query)
      .populate(
        "category",
        "name"
      )
      .populate(
        "instructorId",
        "name email profileImage"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });

  } catch (error) {
    console.error(
      "Get courses error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};


/* =================================
   GET SINGLE COURSE
================================= */

const getCourseById = async (
  req,
  res
) => {
  try {
    const course =
      await Course.findOne({
        _id: req.params.id,
        published: true,
      })
        .populate(
          "category",
          "name"
        )
        .populate(
          "instructorId",
          "name email profileImage"
        );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
};