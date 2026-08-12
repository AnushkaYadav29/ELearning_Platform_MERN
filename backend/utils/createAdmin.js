const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@lms.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 12);

    await User.create({
      name: "LMS Administrator",
      email: "admin@lms.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
  }
};

module.exports = createAdmin;