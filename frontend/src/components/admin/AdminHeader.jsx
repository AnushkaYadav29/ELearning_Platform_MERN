import {
  HiOutlineBell,
  HiOutlineSearch,
} from "react-icons/hi";

const AdminHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="header-search">
        <HiOutlineSearch />

        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="header-actions">
        <button className="header-icon-btn notification-btn">
          <HiOutlineBell />

          <span className="notification-dot" />
        </button>

        <div className="header-profile">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin</strong>

            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;