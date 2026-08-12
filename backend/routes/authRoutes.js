const express = require("express");

const {
  register,
  login,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const { validateRequest } = require("../middleware/errorMiddleware");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  register
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

router.post("/logout", protect, logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/profile", protect, getProfile);

module.exports = router;