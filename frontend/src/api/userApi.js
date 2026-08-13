import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  const response = await axiosInstance.get(
    "/users/profile"
  );

  return response.data;
};

export const updateUserProfile = async (
  userData
) => {
  const response = await axiosInstance.put(
    "/users/profile",
    userData
  );

  return response.data;
};

export const changeUserPassword = async (
  passwordData
) => {
  const response = await axiosInstance.put(
    "/users/change-password",
    passwordData
  );

  return response.data;
};