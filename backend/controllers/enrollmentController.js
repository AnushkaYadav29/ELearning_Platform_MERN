const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

/* ================================
   ENROLL IN COURSE
================================ */

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const studentId = req.user._id;

    const course = await Course.findOne({
      _id: courseId,
      published: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not published",
      });
    }

    const existingEnrollment =
      await Enrollment.findOne({
        studentId,
        courseId,
      });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message:
          "You are already enrolled in this course",
      });
    }

    const enrollment =
      await Enrollment.create({
        studentId,
        courseId,
      });

    return res.status(201).json({
      success: true,
      message:
        "Successfully enrolled in the course",
      enrollment,
    });

  } catch (error) {
    console.error(
      "Enrollment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to enroll in course",
    });
  }
};


/* ================================
   GET MY ENROLLED COURSES
================================ */

const getMyEnrollments = async (
  req,
  res
) => {
  try {
    const enrollments =
      await Enrollment.find({
        studentId: req.user._id,
      })
        .populate({
          path: "courseId",
          populate: [
            {
              path: "category",
              select: "name",
            },
            {
              path: "instructorId",
              select:
                "name email profileImage",
            },
          ],
        })
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });

  } catch (error) {
    console.error(
      "Get enrollments error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch enrollments",
    });
  }
};


/* ================================
   UPDATE COURSE PROGRESS
================================ */

const updateProgress = async (
  req,
  res
) => {
  try {
    const {
      courseId,
      progress,
    } = req.body;

    const enrollment =
      await Enrollment.findOne({
        studentId: req.user._id,
        courseId,
      });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message:
          "Enrollment not found",
      });
    }

    enrollment.progress = progress;

    if (progress >= 100) {
      enrollment.completed = true;
    }

    await enrollment.save();

    return res.status(200).json({
      success: true,
      message:
        "Progress updated successfully",
      enrollment,
    });

  } catch (error) {
    console.error(
      "Progress update error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update progress",
    });
  }
};


module.exports = {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
};