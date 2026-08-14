import {
  HiOutlineArrowLeft,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlay,
} from "react-icons/hi";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getCourseById,
} from "../../api/courseApi";

import {
  enrollCourse,
} from "../../api/enrollmentApi";


const CourseDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [enrolling, setEnrolling] =
    useState(false);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response =
          await getCourseById(id);

        setCourse(response.course);

      } catch (error) {
        console.error(
          "Course error:",
          error
        );

        toast.error(
          "Failed to load course"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);


  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      const response =
        await enrollCourse(course._id);

      toast.success(
        response.message ||
          "Successfully enrolled!"
      );

      navigate(
        "/student/my-courses"
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Enrollment failed"
      );

    } finally {
      setEnrolling(false);
    }
  };


  if (loading) {
    return (
      <div className="course-details-loading">
        Loading course...
      </div>
    );
  }


  if (!course) {
    return (
      <div className="course-details-empty">
        <h2>Course not found</h2>

        <button
          onClick={() =>
            navigate("/student/courses")
          }
        >
          Back to Courses
        </button>
      </div>
    );
  }


  return (
    <div className="course-details-page">

      <button
        className="course-back-btn"
        onClick={() =>
          navigate(-1)
        }
      >
        <HiOutlineArrowLeft />

        Back to Courses
      </button>


      <div className="course-details-hero">

        <div className="course-details-info">

          <span className="course-details-category">
            {course.category?.name}
          </span>

          <h1>
            {course.title}
          </h1>

          <p>
            {course.description}
          </p>


          <div className="course-details-meta">

            <span>
              <HiOutlineAcademicCap />

              {course.instructorId?.name ||
                "Instructor"}
            </span>

            <span>
              <HiOutlineClock />

              Self-paced learning
            </span>

          </div>

        </div>


        <div className="course-details-image">

          {course.thumbnail ? (

            <img
              src={course.thumbnail}
              alt={course.title}
            />

          ) : (

            <div className="course-details-placeholder">
              🎓
            </div>

          )}

        </div>

      </div>


      <div className="course-details-grid">

        {/* MAIN */}

        <div className="course-details-main">

          <div className="course-details-card">

            <h2>
              About this course
            </h2>

            <p>
              {course.description}
            </p>

          </div>


          <div className="course-details-card">

            <h2>
              What you'll learn
            </h2>

            <div className="learning-list">

              <div>
                <HiOutlineCheckCircle />
                Build practical skills
              </div>

              <div>
                <HiOutlineCheckCircle />
                Learn from structured lessons
              </div>

              <div>
                <HiOutlineCheckCircle />
                Complete quizzes and assignments
              </div>

              <div>
                <HiOutlineCheckCircle />
                Track your learning progress
              </div>

            </div>

          </div>

        </div>


        {/* ENROLL CARD */}

        <aside className="course-enroll-card">

          <div className="course-enroll-preview">

            <HiOutlinePlay />

          </div>

          <div className="course-enroll-content">

            <span>
              Course Price
            </span>

            <h2>
              {course.price === 0
                ? "Free"
                : `₹${course.price}`}
            </h2>

            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="course-enroll-btn"
            >
              {enrolling
                ? "Enrolling..."
                : "Enroll Now"}
            </button>

            <div className="course-enroll-features">

              <p>
                ✓ Full course access
              </p>

              <p>
                ✓ Study materials
              </p>

              <p>
                ✓ Quizzes & assignments
              </p>

              <p>
                ✓ Track your progress
              </p>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};


export default CourseDetails;