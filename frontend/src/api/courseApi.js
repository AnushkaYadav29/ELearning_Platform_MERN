import axiosInstance from "./axiosInstance";


export const getCourses = async (
  params = {}
) => {
  const response =
    await axiosInstance.get(
      "/courses",
      {
        params,
      }
    );

  return response.data;
};


export const getCourseById = async (
  id
) => {
  const response =
    await axiosInstance.get(
      `/courses/${id}`
    );

  return response.data;
};