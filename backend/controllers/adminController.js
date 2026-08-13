const User = require("../models/User");

// ==========================================
// GET ADMIN DASHBOARD
// ==========================================

const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalInstructors =
      await User.countDocuments({
        role: "instructor",
      });

    const activeUsers =
      await User.countDocuments({
        isActive: true,
      });

    res.status(200).json({
      success: true,

      data: {
        stats: {
          totalStudents,
          totalInstructors,
          activeUsers,
        },
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin dashboard data",
    });
  }
};

module.exports = {
  getAdminDashboard,
};