import {
  HiOutlineSearch,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineArrowRight,
} from "react-icons/hi";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { getCourses } from "../../api/courseApi";


const BrowseCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response =
        await getCourses({
          search,
        });

      setCourses(
        response.courses || []
      );

    } catch (error) {
      console.error(
        "Course fetch error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const delay =
      setTimeout(() => {
        fetchCourses();
      }, 400);

    return () =>
      clearTimeout(delay);

  }, [search]);


  return (
    <div className="browse-courses-page">

      {/* HEADER */}

      <div className="browse-courses-hero">

        <div>
          <span>
            EXPLORE YOUR POTENTIAL
          </span>

          <h1>
            Discover your next
            <br />
            learning journey.
          </h1>

          <p>
            Explore courses designed to
            help you build practical skills.
          </p>
        </div>

        <div className="browse-hero-icon">
          🚀
        </div>

      </div>


      {/* SEARCH */}

      <div className="course-search-wrapper">

        <HiOutlineSearch />

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* SECTION */}

      <div className="browse-course-header">

        <div>
          <h2>Explore Courses</h2>

          <p>
            Find the perfect course
            for your career goals.
          </p>
        </div>

        <span>
          {courses.length} courses
        </span>

      </div>


      {/* COURSES */}

      {loading ? (

        <div className="course-loading">
          Loading courses...
        </div>

      ) : courses.length === 0 ? (

        <div className="course-empty">

          <HiOutlineAcademicCap />

          <h3>
            No courses found
          </h3>

          <p>
            Try searching with
            different keywords.
          </p>

        </div>

      ) : (

        <div className="browse-courses-grid">

          {courses.map((course) => (

            <div
              className="browse-course-card"
              key={course._id}
            >

              <div className="course-thumbnail">

                {course.thumbnail ? (

                  <img
                    src={course.thumbnail}
                    alt={course.title}
                  />

                ) : (

                  <div className="course-placeholder">
                    🎓
                  </div>

                )}

                <span className="course-level">
                  {course.level}
                </span>

              </div>


              <div className="browse-course-content">

                <span className="course-category">
                  {course.category?.name}
                </span>

                <h3>
                  {course.title}
                </h3>

                <p>
                  {course.description}
                </p>


                <div className="course-meta">

                  <span>
                    <HiOutlineAcademicCap />

                    {course.instructorId?.name ||
                      "Instructor"}
                  </span>

                  <span>
                    <HiOutlineClock />

                    Self-paced
                  </span>

                </div>


                <div className="course-card-footer">

                  <strong>
                    {course.price === 0
                      ? "Free"
                      : `₹${course.price}`}
                  </strong>

                  <button
                    onClick={() =>
                      navigate(
                        `/student/courses/${course._id}`
                      )
                    }
                  >
                    View Course

                    <HiOutlineArrowRight />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};


export default BrowseCourses;