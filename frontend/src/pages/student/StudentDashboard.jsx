import {
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
  HiOutlineCalendar,
} from "react-icons/hi";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = [
    {
      title: "Enrolled Courses",
      value: "4",
      icon: <HiOutlineBookOpen />,
      type: "purple",
    },
    {
      title: "Completed",
      value: "1",
      icon: <HiOutlineAcademicCap />,
      type: "green",
    },
    {
      title: "Learning Hours",
      value: "32.5",
      icon: <HiOutlineClock />,
      type: "orange",
    },
    {
      title: "Average Progress",
      value: "68%",
      icon: <HiOutlineTrendingUp />,
      type: "blue",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "MERN Stack Development",
      instructor: "Rahul Sharma",
      progress: 72,
      lessons: "18 / 25 Lessons",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Priya Kulkarni",
      progress: 45,
      lessons: "9 / 20 Lessons",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },
    {
      id: 3,
      title: "Java Programming Masterclass",
      instructor: "Amit Patil",
      progress: 30,
      lessons: "6 / 22 Lessons",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
  ];

  const assignments = [
    {
      title: "React Component Assignment",
      course: "MERN Stack Development",
      deadline: "Tomorrow",
    },
    {
      title: "Wireframe Design",
      course: "UI/UX Design",
      deadline: "Aug 18",
    },
    {
      title: "Java OOP Assignment",
      course: "Java Programming",
      deadline: "Aug 20",
    },
  ];

  return (
    <div className="student-dashboard-page">

      {/* HERO */}

      <div className="student-welcome-card">
        <div>
          <p className="student-welcome-small">
            KEEP LEARNING, KEEP GROWING ✨
          </p>

          <h1>
            Welcome back,{" "}
            {user?.name?.split(" ")[0] || "Student"}!
          </h1>

          <p>
            You have made great progress. Continue where
            you left off and keep building your skills.
          </p>

          <button
            onClick={() =>
              navigate("/student/my-courses")
            }
          >
            Continue Learning
            <HiOutlineArrowRight />
          </button>
        </div>

        <div className="student-welcome-graphic">
          🎓
        </div>
      </div>

      {/* STATS */}

      <div className="student-stats-grid">
        {stats.map((stat) => (
          <div
            className="student-stat-card"
            key={stat.title}
          >
            <div
              className={`student-stat-icon ${stat.type}`}
            >
              {stat.icon}
            </div>

            <div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}

      <div className="student-dashboard-grid">

        {/* COURSES */}

        <div className="student-section-card student-courses-section">
          <div className="student-section-header">
            <div>
              <h2>Continue Learning</h2>
              <p>Pick up where you left off.</p>
            </div>

            <button
              onClick={() =>
                navigate("/student/my-courses")
              }
            >
              View All
              <HiOutlineArrowRight />
            </button>
          </div>

          <div className="student-course-list">
            {courses.map((course) => (
              <div
                className="student-dashboard-course"
                key={course.id}
              >
                <img
                  src={course.image}
                  alt={course.title}
                />

                <div className="student-course-details">
                  <h3>{course.title}</h3>

                  <p>{course.instructor}</p>

                  <span>{course.lessons}</span>

                  <div className="student-course-progress">
                    <div className="student-progress-top">
                      <span>Progress</span>
                      <strong>
                        {course.progress}%
                      </strong>
                    </div>

                    <div className="student-progress-track">
                      <div
                        className="student-progress-fill"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="student-play-btn"
                  onClick={() =>
                    navigate(
                      `/student/courses/${course.id}`
                    )
                  }
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ASSIGNMENTS */}

        <div className="student-section-card student-assignment-section">
          <div className="student-section-header">
            <div>
              <h2>Upcoming</h2>
              <p>Assignments & deadlines</p>
            </div>

            <HiOutlineCalendar />
          </div>

          <div className="student-assignment-list">
            {assignments.map(
              (assignment, index) => (
                <div
                  className="student-assignment-item"
                  key={index}
                >
                  <div className="student-assignment-date">
                    <span>
                      {assignment.deadline ===
                      "Tomorrow"
                        ? "15"
                        : assignment.deadline.split(
                            " "
                          )[1]}
                    </span>

                    <small>AUG</small>
                  </div>

                  <div>
                    <h4>{assignment.title}</h4>

                    <p>
                      {assignment.course}
                    </p>

                    <span>
                      Due: {assignment.deadline}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          <button
            className="student-view-assignments"
            onClick={() =>
              navigate("/student/assignments")
            }
          >
            View All Assignments
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;