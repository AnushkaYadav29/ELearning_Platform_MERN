import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectByRole = (role) => {
    if (role === "admin") {
      navigate("/admin/dashboard", {
        replace: true,
      });
    } else if (role === "instructor") {
      navigate("/instructor/dashboard", {
        replace: true,
      });
    } else {
      navigate("/student/dashboard", {
        replace: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await login(data);

      toast.success(
        response.message || "Welcome back!"
      );

      redirectByRole(response.user.role);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Enter your details to continue your learning journey."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}

        <div className="auth-form-group">
          <label className="auth-label">
            Email address
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineMail className="auth-input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              className="auth-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email",
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

        {/* PASSWORD */}

        <div className="auth-form-group">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="auth-label mb-0">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="auth-link"
            >
              Forgot password?
            </Link>
          </div>

          <div className="auth-input-wrapper">
            <HiOutlineLockClosed className="auth-input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              className="auth-input"
              {...register("password", {
                required: "Password is required",
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

        {/* REMEMBER ME */}

        <div className="login-options">
          <label className="remember-me">
            <input type="checkbox" />

            <span>Remember me</span>
          </label>
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
              Signing you in...
            </>
          ) : (
            "Sign in to LearnFlow"
          )}
        </button>
      </form>

      {/* REGISTER */}

      <div className="auth-bottom-text">
        <span>
          New to LearnFlow?
        </span>

        <Link
          to="/register"
          className="auth-link"
        >
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;