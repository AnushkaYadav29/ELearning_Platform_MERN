import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineCollection,
  HiOutlineX,
} from "react-icons/hi";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoryApi";

import "../../styles/categories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response =
        await getCategories({
          search,
        });

      setCategories(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCategories();
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const handleAdd = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      image: "",
    });

    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name || "",
      description: category.description || "",
      image: category.image || "",
    });

    setShowModal(true);
  };

  // ==========================================
  // SUBMIT CATEGORY
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error(
        "Category name is required"
      );
    }

    try {
      if (editingCategory) {
        await updateCategory(
          editingCategory._id,
          formData
        );

        toast.success(
          "Category updated successfully"
        );
      } else {
        await createCategory(formData);

        toast.success(
          "Category created successfully"
        );
      }

      setShowModal(false);

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      toast.success(
        "Category deleted successfully"
      );

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================

  const handleStatusChange = async (category) => {
    try {
      await updateCategory(category._id, {
        isActive: !category.isActive,
      });

      toast.success(
        `Category ${
          category.isActive
            ? "deactivated"
            : "activated"
        }`
      );

      fetchCategories();
    } catch (error) {
      toast.error(
        "Failed to update category status"
      );
    }
  };

  return (
    <div className="categories-page">

      {/* HEADER */}

      <div className="categories-header">
        <div>
          <span className="categories-eyebrow">
            COURSE MANAGEMENT
          </span>

          <h1>Categories</h1>

          <p>
            Organize and manage learning categories
            across your platform.
          </p>
        </div>

        <button
          className="category-primary-btn"
          onClick={handleAdd}
        >
          <HiOutlinePlus />
          Add Category
        </button>
      </div>

      {/* STATS */}

      <div className="category-stats">

        <div className="category-stat-card">
          <div className="category-stat-icon">
            <HiOutlineCollection />
          </div>

          <div>
            <span>Total Categories</span>

            <strong>
              {categories.length}
            </strong>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="category-stat-icon active">
            ✓
          </div>

          <div>
            <span>Active</span>

            <strong>
              {
                categories.filter(
                  (category) =>
                    category.isActive
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="category-stat-icon inactive">
            —
          </div>

          <div>
            <span>Inactive</span>

            <strong>
              {
                categories.filter(
                  (category) =>
                    !category.isActive
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* CONTENT */}

      <div className="categories-card">

        <div className="categories-toolbar">

          <div>
            <h2>All Categories</h2>

            <p>
              {categories.length} categories found
            </p>
          </div>

          <form
            className="category-search"
            onSubmit={handleSearch}
          >
            <HiOutlineSearch />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button type="submit">
              Search
            </button>

            <button
              type="button"
              className="refresh-btn"
              onClick={() => {
                setSearch("");
                setTimeout(
                  fetchCategories,
                  0
                );
              }}
            >
              <HiOutlineRefresh />
            </button>

          </form>

        </div>

        {loading ? (
          <div className="categories-loading">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="categories-empty">
            <HiOutlineCollection />

            <h3>
              No categories found
            </h3>

            <p>
              Create your first learning category.
            </p>

            <button
              className="category-primary-btn"
              onClick={handleAdd}
            >
              <HiOutlinePlus />
              Add Category
            </button>
          </div>
        ) : (
          <div className="category-grid">

            {categories.map((category) => (
              <div
                className="category-item-card"
                key={category._id}
              >

                <div className="category-card-top">

                  <div className="category-image">

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                      />
                    ) : (
                      <HiOutlineCollection />
                    )}

                  </div>

                  <span
                    className={`category-status ${
                      category.isActive
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    <span />

                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                <div className="category-card-content">

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description ||
                      "No description provided."}
                  </p>

                </div>

                <div className="category-card-actions">

                  <button
                    className="category-edit-btn"
                    onClick={() =>
                      handleEdit(category)
                    }
                  >
                    <HiOutlinePencil />
                    Edit
                  </button>

                  <button
                    className="category-status-btn"
                    onClick={() =>
                      handleStatusChange(
                        category
                      )
                    }
                  >
                    <HiOutlineRefresh />

                    {category.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    className="category-delete-btn"
                    onClick={() =>
                      handleDelete(category._id)
                    }
                  >
                    <HiOutlineTrash />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* MODAL */}

      {showModal && (
        <div className="category-modal-overlay">

          <div className="category-modal">

            <div className="category-modal-header">

              <div>
                <span>
                  CATEGORY MANAGEMENT
                </span>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Create Category"}
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <HiOutlineX />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="category-form-group">

                <label>
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Example: Web Development"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />

              </div>

              <div className="category-form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Describe this category..."
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="category-form-group">

                <label>
                  Image URL (Optional)
                </label>

                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
                />

              </div>

              <div className="category-modal-actions">

                <button
                  type="button"
                  className="category-cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="category-primary-btn"
                >
                  {editingCategory
                    ? "Save Changes"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminCategories;