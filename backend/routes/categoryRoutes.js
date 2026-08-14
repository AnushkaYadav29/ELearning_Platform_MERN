const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

// Public / authenticated users can view categories

router.get("/", protect, getCategories);

router.get("/:id", protect, getCategoryById);

// Admin only

router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategory
);

module.exports = router;