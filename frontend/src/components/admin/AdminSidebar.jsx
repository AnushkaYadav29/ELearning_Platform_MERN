import { NavLink } from "react-router-dom";

import {
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineCollection,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

const AdminSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <HiOutlineViewGrid />,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <HiOutlineUserGroup />,
    },
    {
      name: "Instructors",
      path: "/admin/instructors",
      icon: <HiOutlineAcademicCap />,
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: <HiOutlineCollection />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <HiOutlineCollection />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <HiOutlineChartBar />,
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      {/* LOGO */}

      <div className="dashboard-brand">
        <div className="dashboard-brand-icon">
          <HiOutlineAcademicCap />
        </div>

        <span>LearnFlow</span>
      </div>

      {/* NAVIGATION */}

      <div className="sidebar-section">
        <p className="sidebar-label">
          MENU
        </p>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "sidebar-link-active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM */}

      <div className="sidebar-bottom">
        <NavLink
          to="/admin/settings"
          className="sidebar-link"
        >
          <HiOutlineCog />

          <span>Settings</span>
        </NavLink>

        <button className="sidebar-logout">
          <HiOutlineLogout />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;