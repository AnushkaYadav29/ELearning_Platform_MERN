import {
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getMyEnrollments,
} from "../../api/enrollmentApi";


const MyCourses = () => {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    const fetchEnrollments =
      async () => {
        try {
          const response =
            await getMyEnrollments();

          setEnrollments(
            response.enrollments || []
          );

        } catch (error) {
          console.error(
            "Enrollment error:",
            error
          );

        } finally {
          setLoading(false);
        }
      };

    fetchEnrollments();
  }, []);


  if (loading) {
    return (
      <div className="course-loading">
        Loading your courses...
      </div>
    );
  }


  return (
    <div className="my-courses-page">

      <div className="my-courses-header">

        <div>
          <p>MY LEARNING SPACE</p>

          <h1>
            Continue your journey 🚀
          </h1>

          <span>
            Track your progress and
            continue learning.
          </span>
        </div>

        <div className="my-courses-count">
          <HiOutlineBookOpen />

          <strong>
            {enrollments.length}
          </strong>

          <span>Courses</span>
        </div>

      </div>


      {enrollments.length === 0 ? (

        <div className="my-courses-empty">

          <HiOutlineBookOpen />

          <h2>
            No courses yet
          </h2>

          <p>
            Explore our courses and
            start learning today.
          </p>

          <button
            onClick={() =>
              navigate("/student/courses")
            }
          >
            Browse Courses
          </button>

        </div>

      ) : (

        <div className="my-courses-grid">

          {enrollments.map(
            (enrollment) => {
              const course =
                enrollment.courseId;

              return (
                <div
                  className="my-course-card"
                  key={enrollment._id}
                >

                  <div className="my-course-image">

                    {course.thumbnail ? (

                      <img
                        src={course.thumbnail}
                        alt={course.title}
                      />

                    ) : (

                      <div>
                        🎓
                      </div>

                    )}

                  </div>


                  <div className="my-course-content">

                    <span>
                      {course.category?.name}
                    </span>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.instructorId?.name}
                    </p>


                    <div className="my-course-progress-info">

                      <div>
                        <span>
                          Progress
                        </span>

                        <strong>
                          {enrollment.progress}%
                        </strong>
                      </div>

                      <div className="my-course-progress-bar">
                        <div
                          style={{
                            width:
                              `${enrollment.progress}%`,
                          }}
                        />
                      </div>

                    </div>


                    <button
                      onClick={() =>
                        navigate(
                          `/student/courses/${course._id}`
                        )
                      }
                    >
                      <HiOutlinePlay />

                      {enrollment.progress > 0
                        ? "Continue Learning"
                        : "Start Learning"}
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
};


export default MyCourses;