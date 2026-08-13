import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineUserAdd,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineRefresh,
} from "react-icons/hi";

import {
  getAdminStudents,
  updateStudentStatus,
  deleteAdminStudent,
} from "../../api/adminStudentApi";

const AdminStudents = () => {
  // ========================================
  // STATE
  // ========================================

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalStudents, setTotalStudents] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(null);

  // ========================================
  // GET INITIALS
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
  // FETCH STUDENTS
  // ========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await getAdminStudents({
        search,
        status: statusFilter,
        page: currentPage,
        limit: 10,
      });

      setStudents(response.students || []);

      setTotalStudents(
        response.totalStudents || 0
      );

      setTotalPages(
        response.totalPages || 1
      );

    } catch (error) {
      console.error(
        "Fetch students error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FETCH WHEN FILTERS CHANGE
  // ========================================

  useEffect(() => {
    fetchStudents();
  }, [
    search,
    statusFilter,
    currentPage,
  ]);

  // ========================================
  // ACTIVATE / DEACTIVATE
  // ========================================

  const handleStatusChange = async (
    student
  ) => {
    try {
      const newStatus =
        !student.isActive;

      await updateStudentStatus(
        student._id,
        newStatus
      );

      toast.success(
        newStatus
          ? "Student activated successfully"
          : "Student deactivated successfully"
      );

      setOpenMenu(null);

      fetchStudents();

    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update student status"
      );
    }
  };

  // ========================================
  // DELETE STUDENT
  // ========================================

  const handleDelete = async (
    student
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminStudent(
        student._id
      );

      toast.success(
        "Student deleted successfully"
      );

      setOpenMenu(null);

      // If last student on current page
      // was deleted, move to previous page
      if (
        students.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          currentPage - 1
        );
      } else {
        fetchStudents();
      }

    } catch (error) {
      console.error(
        "Delete student error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete student"
      );
    }
  };

  // ========================================
  // VIEW STUDENT
  // ========================================

  const handleView = (student) => {
    console.log(
      "View student:",
      student
    );

    setOpenMenu(null);

    // We will create the profile page later.
    toast(
      "Student profile page will be added next."
    );
  };

  // ========================================
  // RESET FILTERS
  // ========================================

  const handleRefresh = () => {
    setSearch("");

    setStatusFilter("all");

    setCurrentPage(1);
  };

  // ========================================
  // PAGINATION
  // ========================================

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        currentPage - 1
      );
    }
  };

  const handleNextPage = () => {
    if (
      currentPage < totalPages
    ) {
      setCurrentPage(
        currentPage + 1
      );
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="admin-students-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="dashboard-page-header">

        <div>
          <p className="dashboard-greeting">
            User Management
          </p>

          <h1>Students</h1>

          <p>
            Manage students, monitor their
            learning activity and account
            status.
          </p>
        </div>

        <button className="dashboard-primary-btn">
          <HiOutlineUserAdd />

          Add Student
        </button>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className="student-summary-grid">

        <div className="student-summary-card">

          <div className="summary-card-icon">
            👨‍🎓
          </div>

          <div>
            <span>
              Total Students
            </span>

            <strong>
              {totalStudents}
            </strong>
          </div>

        </div>


        <div className="student-summary-card">

          <div className="summary-card-icon active-icon">
            ✓
          </div>

          <div>
            <span>
              Active Students
            </span>

            <strong>
              {students.filter(
                (student) =>
                  student.isActive
              ).length}
            </strong>
          </div>

        </div>


        <div className="student-summary-card">

          <div className="summary-card-icon inactive-icon">
            —
          </div>

          <div>
            <span>
              Inactive Students
            </span>

            <strong>
              {students.filter(
                (student) =>
                  !student.isActive
              ).length}
            </strong>
          </div>

        </div>


        <div className="student-summary-card">

          <div className="summary-card-icon progress-icon">
            ↗
          </div>

          <div>
            <span>
              Avg. Progress
            </span>

            <strong>
              —
            </strong>
          </div>

        </div>

      </div>


      {/* =========================
          TABLE CARD
      ========================== */}

      <div className="dashboard-card students-table-card">


        {/* =========================
            TOOLBAR
        ========================== */}

        <div className="students-toolbar">

          <div>

            <h3>
              All Students
            </h3>

            <p>
              {totalStudents} students found
            </p>

          </div>


          <div className="students-toolbar-actions">


            {/* SEARCH */}

            <div className="student-search">

              <HiOutlineSearch />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => {
                  setSearch(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              />

            </div>


            {/* FILTER */}

            <div className="student-filter">

              <HiOutlineFilter />

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              >

                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>


            {/* REFRESH */}

            <button
              className="table-refresh-btn"
              onClick={handleRefresh}
              title="Reset filters"
            >
              <HiOutlineRefresh />
            </button>

          </div>

        </div>


        {/* =========================
            TABLE
        ========================== */}

        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>

              <tr>

                <th>
                  Student
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Courses
                </th>

                <th>
                  Progress
                </th>

                <th>
                  Status
                </th>

                <th></th>

              </tr>

            </thead>


            <tbody>

              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-students"
                  >

                    <div>

                      <HiOutlineRefresh />

                      <h4>
                        Loading students...
                      </h4>

                      <p>
                        Please wait.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : students.length > 0 ? (

                /* STUDENTS */

                students.map(
                  (student) => (

                    <tr
                      key={student._id}
                    >

                      {/* STUDENT */}

                      <td>

                        <div className="student-table-user">

                          <div className="student-table-avatar">

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

                              getInitials(
                                student.name
                              )

                            )}

                          </div>


                          <div>

                            <strong>
                              {student.name}
                            </strong>

                            <span>
                              {student.email}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* JOINED */}

                      <td>

                        <span className="table-muted">

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

                      </td>


                      {/* COURSES */}

                      <td>

                        <span className="course-count">
                          —
                        </span>

                      </td>


                      {/* PROGRESS */}

                      <td>

                        <div className="student-progress">

                          <div className="progress-top">

                            <span>
                              —
                            </span>

                          </div>

                          <div className="progress-track">

                            <div
                              className="progress-fill"
                              style={{
                                width: "0%",
                              }}
                            />

                          </div>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

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

                      </td>


                      {/* ACTIONS */}

                      <td className="student-actions-cell">

                        <button
                          className="student-actions-btn"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                student._id
                                ? null
                                : student._id
                            )
                          }
                        >

                          <HiOutlineDotsVertical />

                        </button>


                        {openMenu ===
                          student._id && (

                          <div className="student-action-menu">


                            {/* VIEW */}

                            <button
                              onClick={() =>
                                handleView(
                                  student
                                )
                              }
                            >

                              <HiOutlineEye />

                              View Profile

                            </button>


                            {/* STATUS */}

                            <button
                              onClick={() =>
                                handleStatusChange(
                                  student
                                )
                              }
                            >

                              <HiOutlineRefresh />

                              {student.isActive
                                ? "Deactivate"
                                : "Activate"}

                            </button>


                            {/* DELETE */}

                            <button
                              className="delete-action"
                              onClick={() =>
                                handleDelete(
                                  student
                                )
                              }
                            >

                              <HiOutlineTrash />

                              Delete Student

                            </button>

                          </div>

                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="6"
                    className="empty-students"
                  >

                    <div>

                      <HiOutlineSearch />

                      <h4>
                        No students found
                      </h4>

                      <p>
                        Try changing your
                        search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =========================
            PAGINATION
        ========================== */}

        <div className="students-pagination">

          <span>

            Showing{" "}

            <strong>
              {students.length}
            </strong>{" "}

            of{" "}

            <strong>
              {totalStudents}
            </strong>{" "}

            students

          </span>


          <div className="pagination-controls">


            {/* PREVIOUS */}

            <button
              disabled={
                currentPage === 1 ||
                loading
              }
              onClick={
                handlePreviousPage
              }
            >

              <HiChevronLeft />

            </button>


            {/* CURRENT PAGE */}

            <button className="pagination-active">

              {currentPage}

            </button>


            {/* NEXT */}

            <button
              disabled={
                currentPage >=
                  totalPages ||
                loading
              }
              onClick={
                handleNextPage
              }
            >

              <HiChevronRight />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminStudents;