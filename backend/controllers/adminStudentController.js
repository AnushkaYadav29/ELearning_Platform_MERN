const User = require("../models/User");

/*
========================================
GET ALL STUDENTS
GET /api/admin/students
========================================
*/

const getStudents = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    // Base query
    const query = {
      role: "student",
    };

    // Search
    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // Status filter
    if (status === "active") {
      query.isActive = true;
    }

    if (status === "inactive") {
      query.isActive = false;
    }

    // Total students
    const totalStudents = await User.countDocuments(query);

    // Students
    const students = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit);

    const totalPages = Math.ceil(
      totalStudents / pageLimit
    );

    res.status(200).json({
      success: true,

      totalStudents,

      currentPage,

      totalPages,

      students,
    });
  } catch (error) {
    console.error(
      "Get Students Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

/*
========================================
GET SINGLE STUDENT
GET /api/admin/students/:id
========================================
*/

const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(
      "Get Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

/*
========================================
ACTIVATE / DEACTIVATE STUDENT
PATCH /api/admin/students/:id/status
========================================
*/

const updateStudentStatus = async (
  req,
  res
) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be true or false",
      });
    }

    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.isActive = isActive;

    await student.save();

    res.status(200).json({
      success: true,

      message: isActive
        ? "Student activated successfully"
        : "Student deactivated successfully",

      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        isActive: student.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Update Student Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update student status",
    });
  }
};

/*
========================================
DELETE STUDENT
DELETE /api/admin/students/:id
========================================
*/

const deleteStudent = async (
  req,
  res
) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete student",
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudentStatus,
  deleteStudent,
};