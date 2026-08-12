const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

/*
 * ADMIN
 */
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the Admin API.",
      user: req.user,
    });
  }
);

/*
 * INSTRUCTOR
 */
router.get(
  "/instructor",
  protect,
  authorize("instructor"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the Instructor API.",
      user: req.user,
    });
  }
);

/*
 * STUDENT
 */
router.get(
  "/student",
  protect,
  authorize("student"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the Student API.",
      user: req.user,
    });
  }
);

module.exports = router;