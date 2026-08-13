import axiosInstance from "./axiosInstance";

export const getAdminDashboardStats = async () => {
  const response = await axiosInstance.get(
    "/admin/dashboard"
  );

  return response.data;
};