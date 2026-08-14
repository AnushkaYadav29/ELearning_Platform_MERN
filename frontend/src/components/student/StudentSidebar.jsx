import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineCollection,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

import { NavLink, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="student-sidebar">
      <div className="student-logo">
        <div className="student-logo-icon">L</div>

        <div>
          <h2>LearnFlow</h2>
          <span>STUDENT PORTAL</span>
        </div>
      </div>

      <div className="student-nav-section">
        <p className="student-nav-title">MAIN MENU</p>

        <NavLink
          to="/student/dashboard"
          className="student-nav-link"
        >
          <HiOutlineHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/student/courses"
          className="student-nav-link"
        >
          <HiOutlineBookOpen />
          <span>Browse Courses</span>
        </NavLink>

        <NavLink
          to="/student/my-courses"
          className="student-nav-link"
        >
          <HiOutlineCollection />
          <span>My Learning</span>
        </NavLink>

        <NavLink
          to="/student/assignments"
          className="student-nav-link"
        >
          <HiOutlineClipboardList />
          <span>Assignments</span>
        </NavLink>

        <NavLink
          to="/student/progress"
          className="student-nav-link"
        >
          <HiOutlineChartBar />
          <span>Progress</span>
        </NavLink>
      </div>

      <div className="student-nav-section student-account-section">
        <p className="student-nav-title">ACCOUNT</p>

        <NavLink
          to="/profile"
          className="student-nav-link"
        >
          <HiOutlineUser />
          <span>My Profile</span>
        </NavLink>

        <button
          className="student-logout-btn"
          onClick={handleLogout}
        >
          <HiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>

      <div className="student-sidebar-bottom">
        <div className="student-help-card">
          <span>💡</span>

          <div>
            <strong>Keep learning!</strong>
            <p>You're making great progress.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;