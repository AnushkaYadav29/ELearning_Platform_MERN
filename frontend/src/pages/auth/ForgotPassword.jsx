import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  HiOutlineMail,
  HiOutlineArrowLeft,
} from "react-icons/hi";

import { forgotPassword } from "../../api/authApi";
import AuthLayout from "../../components/auth/AuthLayout";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    setLoading(true);

    const response = await forgotPassword(data.email);

    toast.success(
      response.message ||
        "Password reset link sent successfully!"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries. Enter your email and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form-group">
          <label className="auth-label">
            Email address
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineMail className="auth-input-icon" />

            <input
              type="email"
              placeholder="Enter your registered email"
              className="auth-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address",
                },
              })}
            />
          </div>

          {errors.email && (
            <p className="auth-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Sending reset link...
            </>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      <div className="auth-back-link">
        <HiOutlineArrowLeft />

        <Link
          to="/login"
          className="auth-link"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;