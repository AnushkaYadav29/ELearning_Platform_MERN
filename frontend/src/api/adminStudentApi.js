import axiosInstance from "./axiosInstance";

// Get students
export const getAdminStudents = async (params = {}) => {
  const response = await axiosInstance.get(
    "/admin/students",
    {
      params,
    }
  );

  return response.data;
};


// Get single student
export const getAdminStudentById = async (id) => {
  const response = await axiosInstance.get(
    `/admin/students/${id}`
  );

  return response.data;
};


// Activate / Deactivate student
export const updateStudentStatus = async (
  id,
  isActive
) => {
  const response = await axiosInstance.patch(
    `/admin/students/${id}/status`,
    {
      isActive,
    }
  );

  return response.data;
};


// Delete student
export const deleteAdminStudent = async (id) => {
  const response = await axiosInstance.delete(
    `/admin/students/${id}`
  );

  return response.data;
};