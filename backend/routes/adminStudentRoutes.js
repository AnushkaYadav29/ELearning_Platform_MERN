const express = require("express");

const {
  getStudents,
  getStudentById,
  updateStudentStatus,
  deleteStudent,
} = require("../controllers/adminStudentController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
========================================
ALL ROUTES ARE ADMIN ONLY
========================================
*/

router.use(
  protect,
  authorize("admin")
);

/*
GET /api/admin/students
*/

router.get(
  "/",
  getStudents
);

/*
GET /api/admin/students/:id
*/

router.get(
  "/:id",
  getStudentById
);

/*
PATCH /api/admin/students/:id/status
*/

router.patch(
  "/:id/status",
  updateStudentStatus
);

/*
DELETE /api/admin/students/:id
*/

router.delete(
  "/:id",
  deleteStudent
);

module.exports = router;