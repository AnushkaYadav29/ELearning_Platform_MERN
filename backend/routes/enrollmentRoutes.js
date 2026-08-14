const express = require("express");

const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} = require(
  "../controllers/enrollmentController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");


router.post(
  "/",
  protect,
  authorize("student"),
  enrollCourse
);

router.get(
  "/student",
  protect,
  authorize("student"),
  getMyEnrollments
);

router.put(
  "/progress",
  protect,
  authorize("student"),
  updateProgress
);


module.exports = router;