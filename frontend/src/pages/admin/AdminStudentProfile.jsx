import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiArrowLeft,
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineAcademicCap,
} from "react-icons/hi";

import {
  getAdminStudentById,
  updateStudentStatus,
  deleteAdminStudent,
} from "../../api/adminStudentApi";

const AdminStudentProfile = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);


  // ========================================
  // GET STUDENT
  // ========================================

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const response =
        await getAdminStudentById(id);

      setStudent(response.student);

    } catch (error) {
      console.error(
        "Fetch student error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load student"
      );

      navigate("/admin/students");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStudent();
  }, [id]);


  // ========================================
  // INITIALS
  // ========================================

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };


  // ========================================
  // STATUS CHANGE
  // ========================================

  const handleStatusChange = async () => {
    try {
      setActionLoading(true);

      const newStatus =
        !student.isActive;

      await updateStudentStatus(
        student._id,
        newStatus
      );

      setStudent({
        ...student,
        isActive: newStatus,
      });

      toast.success(
        newStatus
          ? "Student activated successfully"
          : "Student deactivated successfully"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update status"
      );

    } finally {
      setActionLoading(false);
    }
  };


  // ========================================
  // DELETE STUDENT
  // ========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);

      await deleteAdminStudent(
        student._id
      );

      toast.success(
        "Student deleted successfully"
      );

      navigate("/admin/students");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete student"
      );

    } finally {
      setActionLoading(false);
    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="student-profile-loading">

        <HiOutlineRefresh />

        <h3>
          Loading student profile...
        </h3>

      </div>
    );
  }


  // ========================================
  // NOT FOUND
  // ========================================

  if (!student) {
    return (
      <div className="student-profile-loading">

        <h3>
          Student not found
        </h3>

        <button
          className="dashboard-primary-btn"
          onClick={() =>
            navigate("/admin/students")
          }
        >
          Back to Students
        </button>

      </div>
    );
  }


  // ========================================
  // UI
  // ========================================

  return (
    <div className="admin-student-profile-page">


      {/* =====================================
          BACK BUTTON
      ====================================== */}

      <button
        className="student-profile-back"
        onClick={() =>
          navigate("/admin/students")
        }
      >
        <HiArrowLeft />

        Back to Students
      </button>


      {/* =====================================
          PROFILE HEADER
      ====================================== */}

      <div className="student-profile-header">

        <div className="student-profile-main">


          {/* AVATAR */}

          <div className="student-profile-avatar">

            {student.profileImage ? (

              <img
                src={student.profileImage}
                alt={student.name}
              />

            ) : (

              getInitials(
                student.name
              )

            )}

          </div>


          {/* INFORMATION */}

          <div className="student-profile-identity">

            <div className="student-profile-name-row">

              <h1>
                {student.name}
              </h1>

              <span
                className={`student-status ${
                  student.isActive
                    ? "student-status-active"
                    : "student-status-inactive"
                }`}
              >

                <span />

                {student.isActive
                  ? "Active"
                  : "Inactive"}

              </span>

            </div>


            <p>
              <HiOutlineMail />

              {student.email}
            </p>


            <p>
              <HiOutlineAcademicCap />

              Student
            </p>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="student-profile-actions">

          <button
            className="student-profile-status-btn"
            disabled={actionLoading}
            onClick={
              handleStatusChange
            }
          >

            <HiOutlineRefresh />

            {student.isActive
              ? "Deactivate"
              : "Activate"}

          </button>


          <button
            className="student-profile-delete-btn"
            disabled={actionLoading}
            onClick={handleDelete}
          >

            <HiOutlineTrash />

            Delete

          </button>

        </div>

      </div>


      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="student-profile-stats">


        <div className="student-profile-stat-card">

          <div className="student-profile-stat-icon">
            <HiOutlineAcademicCap />
          </div>

          <div>

            <span>
              Enrolled Courses
            </span>

            <strong>
              —
            </strong>

          </div>

        </div>


        <div className="student-profile-stat-card">

          <div className="student-profile-stat-icon">
            ✓
          </div>

          <div>

            <span>
              Completed Courses
            </span>

            <strong>
              —
            </strong>

          </div>

        </div>


        <div className="student-profile-stat-card">

          <div className="student-profile-stat-icon">
            ↗
          </div>

          <div>

            <span>
              Average Progress
            </span>

            <strong>
              —
            </strong>

          </div>

        </div>


        <div className="student-profile-stat-card">

          <div className="student-profile-stat-icon">
            %
          </div>

          <div>

            <span>
              Quiz Average
            </span>

            <strong>
              —
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================
          CONTENT GRID
      ====================================== */}

      <div className="student-profile-content">


        {/* ===================================
            PERSONAL INFORMATION
        ==================================== */}

        <div className="dashboard-card student-info-card">

          <div className="student-profile-section-header">

            <div>

              <h3>
                Personal Information
              </h3>

              <p>
                Student account details
              </p>

            </div>

          </div>


          <div className="student-info-grid">


            <div className="student-info-item">

              <div>
                <HiOutlineUser />
              </div>

              <section>

                <span>
                  Full Name
                </span>

                <strong>
                  {student.name}
                </strong>

              </section>

            </div>


            <div className="student-info-item">

              <div>
                <HiOutlineMail />
              </div>

              <section>

                <span>
                  Email Address
                </span>

                <strong>
                  {student.email}
                </strong>

              </section>

            </div>


            <div className="student-info-item">

              <div>
                <HiOutlineShieldCheck />
              </div>

              <section>

                <span>
                  Account Role
                </span>

                <strong>
                  Student
                </strong>

              </section>

            </div>


            <div className="student-info-item">

              <div>
                <HiOutlineCalendar />
              </div>

              <section>

                <span>
                  Joined On
                </span>

                <strong>
                  {formatDate(
                    student.createdAt
                  )}
                </strong>

              </section>

            </div>


          </div>

        </div>


        {/* ===================================
            LEARNING PROGRESS
        ==================================== */}

        <div className="dashboard-card student-learning-card">

          <div className="student-profile-section-header">

            <div>

              <h3>
                Learning Progress
              </h3>

              <p>
                Course progress will appear
                after enrollment.
              </p>

            </div>

          </div>


          <div className="student-empty-learning">

            <div className="student-empty-learning-icon">
              <HiOutlineAcademicCap />
            </div>

            <h4>
              No Course Data Yet
            </h4>

            <p>
              Once this student enrolls in
              courses, their learning progress,
              completion status and quiz
              performance will appear here.
            </p>

          </div>

        </div>


      </div>

    </div>
  );
};

export default AdminStudentProfile;