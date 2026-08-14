import axiosInstance from "./axiosInstance";

export const enrollCourse = async (
  courseId
) => {
  const response =
    await axiosInstance.post(
      "/enrollments",
      {
        courseId,
      }
    );

  return response.data;
};


export const getMyEnrollments =
  async () => {
    const response =
      await axiosInstance.get(
        "/enrollments/student"
      );

    return response.data;
  };


export const updateCourseProgress =
  async (courseId, progress) => {
    const response =
      await axiosInstance.put(
        "/enrollments/progress",
        {
          courseId,
          progress,
        }
      );

    return response.data;
  };