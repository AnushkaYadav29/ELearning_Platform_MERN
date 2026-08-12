import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineCollection,
  HiOutlineTrendingUp,
  HiOutlineArrowUp,
} from "react-icons/hi";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      growth: "12.5%",
      icon: <HiOutlineUserGroup />,
      type: "primary",
    },
    {
      title: "Total Instructors",
      value: "86",
      growth: "8.2%",
      icon: <HiOutlineAcademicCap />,
      type: "secondary",
    },
    {
      title: "Total Courses",
      value: "142",
      growth: "16.8%",
      icon: <HiOutlineCollection />,
      type: "warning",
    },
    {
      title: "Total Enrollments",
      value: "4,892",
      growth: "24.3%",
      icon: <HiOutlineTrendingUp />,
      type: "success",
    },
  ];

  const recentStudents = [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      course: "MERN Stack Development",
      initials: "RS",
    },
    {
      name: "Priya Patil",
      email: "priya@example.com",
      course: "UI/UX Design",
      initials: "PP",
    },
    {
      name: "Amit Kumar",
      email: "amit@example.com",
      course: "Java Programming",
      initials: "AK",
    },
    {
      name: "Sneha Joshi",
      email: "sneha@example.com",
      course: "Data Science",
      initials: "SJ",
    },
  ];

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="dashboard-page-header">
        <div>
          <p className="dashboard-greeting">
            Thursday, August 13
          </p>

          <h1>
            Good evening, Admin 👋
          </h1>

          <p>
            Here's what's happening with your learning platform.
          </p>
        </div>

        <button className="dashboard-primary-btn">
          + Add New Course
        </button>
      </div>

      {/* STATISTICS */}

      <div className="stats-grid">
        {stats.map((stat) => (
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
              <p>{stat.title}</p>

              <h3>{stat.value}</h3>

              <span>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT GRID */}

      <div className="dashboard-grid">
        {/* PLATFORM OVERVIEW */}

        <div className="dashboard-card overview-card">
          <div className="card-header">
            <div>
              <h3>Platform Overview</h3>

              <p>
                Enrollment activity over the last 6 months
              </p>
            </div>

            <select className="dashboard-select">
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>

          <div className="chart-placeholder">
            <div className="chart-bars">
              <span style={{ height: "40%" }} />
              <span style={{ height: "65%" }} />
              <span style={{ height: "50%" }} />
              <span style={{ height: "80%" }} />
              <span style={{ height: "70%" }} />
              <span style={{ height: "95%" }} />
            </div>

            <div className="chart-labels">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
        </div>

        {/* ACTIVITY */}

        <div className="dashboard-card activity-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>

              <p>Latest platform updates</p>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot primary" />

              <div>
                <strong>
                  New instructor registered
                </strong>

                <p>
                  Priyanka Sharma joined LearnFlow
                </p>

                <span>10 minutes ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot secondary" />

              <div>
                <strong>
                  New course published
                </strong>

                <p>
                  React Advanced Concepts
                </p>

                <span>1 hour ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot warning" />

              <div>
                <strong>
                  Assignment deadline today
                </strong>

                <p>
                  JavaScript Fundamentals
                </p>

                <span>3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT STUDENTS */}

      <div className="dashboard-card recent-users-card">
        <div className="card-header">
          <div>
            <h3>Recent Students</h3>

            <p>
              Latest students registered on the platform
            </p>
          </div>

          <button className="view-all-btn">
            View all
          </button>
        </div>

        <div className="users-table">
          <div className="table-header">
            <span>Student</span>
            <span>Email</span>
            <span>Course</span>
            <span>Status</span>
          </div>

          {recentStudents.map((student) => (
            <div
              key={student.email}
              className="table-row"
            >
              <div className="student-name">
                <div className="student-avatar">
                  {student.initials}
                </div>

                <strong>{student.name}</strong>
              </div>

              <span>{student.email}</span>

              <span>{student.course}</span>

              <span className="status-badge status-active">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;