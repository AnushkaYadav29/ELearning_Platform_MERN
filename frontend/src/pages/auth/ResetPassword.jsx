import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
} from "react-icons/hi";

import { resetPassword } from "../../api/authApi";
import AuthLayout from "../../components/auth/AuthLayout";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await resetPassword(
        token,
        data.password
      );

      toast.success(
        response.message ||
          "Password reset successfully!"
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create new password 🔐"
      subtitle="Your new password should be secure and easy for you to remember."
    >
      <div className="reset-password-icon">
        <HiOutlineCheckCircle />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NEW PASSWORD */}

        <div className="auth-form-group">
          <label className="auth-label">
            New password
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineLockClosed className="auth-input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your new password"
              className="auth-input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must contain at least 6 characters",
                },
              })}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <HiOutlineEyeOff />
              ) : (
                <HiOutlineEye />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="auth-error">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}

        <div className="auth-form-group">
          <label className="auth-label">
            Confirm new password
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineLockClosed className="auth-input-icon" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm your new password"
              className="auth-input"
              {...register("confirmPassword", {
                required:
                  "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff />
              ) : (
                <HiOutlineEye />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="auth-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* PASSWORD REQUIREMENTS */}

        <div className="password-requirements">
          <p>Password requirements:</p>

          <span>
            <HiOutlineCheckCircle />
            At least 6 characters
          </span>
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </button>
      </form>

      <div className="auth-back-link">
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

export default ResetPassword;