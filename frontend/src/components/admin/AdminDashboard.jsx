import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineCollection,
  HiOutlineTrendingUp,
  HiOutlineArrowUp,
  HiOutlineRefresh,
} from "react-icons/hi";

import { getAdminDashboardStats } from "../../api/adminDashboardApi";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [period, setPeriod] =
    useState("6months");


  // ========================================
  // FETCH DASHBOARD
  // ========================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await getAdminDashboardStats();

      setDashboard(response.data);

    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboard();
  }, []);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="dashboard-loading">

        <HiOutlineRefresh />

        <h3>
          Loading dashboard...
        </h3>

        <p>
          Fetching the latest platform
          statistics.
        </p>

      </div>
    );
  }


  // ========================================
  // SAFE DEFAULTS
  // ========================================

  const stats =
    dashboard?.stats || {
      totalStudents: 0,
      totalInstructors: 0,
      totalCourses: 0,
      totalEnrollments: 0,
    };


  const recentStudents =
    dashboard?.recentStudents || [];


  const activities =
    dashboard?.activities || [];


  const enrollmentOverview =
    dashboard?.enrollmentOverview || [];


  // ========================================
  // STAT CARDS
  // ========================================

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      growth:
        stats.studentGrowth || "0%",
      icon: <HiOutlineUserGroup />,
      type: "primary",
    },

    {
      title: "Total Instructors",
      value: stats.totalInstructors,
      growth:
        stats.instructorGrowth || "0%",
      icon: <HiOutlineAcademicCap />,
      type: "secondary",
    },

    {
      title: "Total Courses",
      value: stats.totalCourses,
      growth:
        stats.courseGrowth || "0%",
      icon: <HiOutlineCollection />,
      type: "warning",
    },

    {
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      growth:
        stats.enrollmentGrowth || "0%",
      icon: <HiOutlineTrendingUp />,
      type: "success",
    },
  ];


  return (
    <div className="admin-dashboard">


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="dashboard-page-header">

        <div>

          <p className="dashboard-greeting">
            {new Date().toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )}
          </p>

          <h1>
            Good evening, Admin 👋
          </h1>

          <p>
            Here's what's happening with
            your learning platform.
          </p>

        </div>


        <button
          className="dashboard-primary-btn"
          onClick={() =>
            navigate("/admin/courses")
          }
        >
          + Add New Course
        </button>

      </div>


      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="stats-grid">

        {statCards.map((stat) => (

          <div
            key={stat.title}
            className="stat-card"
          >

            <div className="stat-card-top">

              <div
                className={`stat-icon ${stat.type}`}
              >
                {stat.icon}
              </div>


              <span className="stat-growth">

                <HiOutlineArrowUp />

                {stat.growth}

              </span>

            </div>


            <div className="stat-info">

              <p>
                {stat.title}
              </p>

              <h3>
                {stat.value.toLocaleString()}
              </h3>

              <span>
                vs last month
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================
          CONTENT GRID
      ====================================== */}

      <div className="dashboard-grid">


        {/* ===================================
            PLATFORM OVERVIEW
        ==================================== */}

        <div className="dashboard-card overview-card">

          <div className="card-header">

            <div>

              <h3>
                Platform Overview
              </h3>

              <p>
                Enrollment activity over
                the last 6 months
              </p>

            </div>


            <select
              className="dashboard-select"
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value)
              }
            >

              <option value="6months">
                Last 6 months
              </option>

              <option value="year">
                This year
              </option>

            </select>

          </div>


          {/* CHART */}

          <div className="chart-placeholder">

            {enrollmentOverview.length >
            0 ? (

              <>

                <div className="chart-bars">

                  {enrollmentOverview.map(
                    (item, index) => (

                      <span
                        key={index}
                        style={{
                          height: `${Math.max(
                            item.percentage || 5,
                            5
                          )}%`,
                        }}
                        title={`${item.month}: ${item.enrollments}`}
                      />

                    )
                  )}

                </div>


                <div className="chart-labels">

                  {enrollmentOverview.map(
                    (item, index) => (

                      <span key={index}>
                        {item.month}
                      </span>

                    )
                  )}

                </div>

              </>

            ) : (

              <div className="dashboard-empty-chart">

                <HiOutlineTrendingUp />

                <p>
                  Enrollment data will
                  appear here.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* ===================================
            RECENT ACTIVITY
        ==================================== */}

        <div className="dashboard-card activity-card">

          <div className="card-header">

            <div>

              <h3>
                Recent Activity
              </h3>

              <p>
                Latest platform updates
              </p>

            </div>

          </div>


          <div className="activity-list">

            {activities.length > 0 ? (

              activities.map(
                (activity, index) => (

                  <div
                    className="activity-item"
                    key={activity._id || index}
                  >

                    <div
                      className={`activity-dot ${
                        activity.type ||
                        "primary"
                      }`}
                    />


                    <div>

                      <strong>
                        {activity.title}
                      </strong>

                      <p>
                        {activity.description}
                      </p>

                      <span>
                        {activity.time}
                      </span>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="dashboard-no-activity">

                <p>
                  No recent activity.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =====================================
          RECENT STUDENTS
      ====================================== */}

      <div className="dashboard-card recent-users-card">

        <div className="card-header">

          <div>

            <h3>
              Recent Students
            </h3>

            <p>
              Latest students registered
              on the platform
            </p>

          </div>


          <button
            className="view-all-btn"
            onClick={() =>
              navigate("/admin/students")
            }
          >
            View all
          </button>

        </div>


        <div className="users-table">


          {/* HEADER */}

          <div className="table-header">

            <span>
              Student
            </span>

            <span>
              Email
            </span>

            <span>
              Joined
            </span>

            <span>
              Status
            </span>

          </div>


          {/* DATA */}

          {recentStudents.length > 0 ? (

            recentStudents.map(
              (student) => (

                <div
                  key={student._id}
                  className="table-row"
                  onClick={() =>
                    navigate(
                      `/admin/students/${student._id}`
                    )
                  }
                >


                  {/* STUDENT */}

                  <div className="student-name">

                    <div className="student-avatar">

                      {student.profileImage ? (

                        <img
                          src={
                            student.profileImage
                          }
                          alt={
                            student.name
                          }
                        />

                      ) : (

                        student.name
                          ?.split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()

                      )}

                    </div>


                    <strong>
                      {student.name}
                    </strong>

                  </div>


                  {/* EMAIL */}

                  <span>
                    {student.email}
                  </span>


                  {/* JOINED */}

                  <span>

                    {student.createdAt
                      ? new Date(
                          student.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "—"}

                  </span>


                  {/* STATUS */}

                  <span
                    className={`status-badge ${
                      student.isActive
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >

                    {student.isActive
                      ? "Active"
                      : "Inactive"}

                  </span>

                </div>

              )
            )

          ) : (

            <div className="dashboard-no-students">

              <HiOutlineUserGroup />

              <p>
                No students registered yet.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;