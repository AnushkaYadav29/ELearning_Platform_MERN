import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    { password }
  );

  return response.data;
};