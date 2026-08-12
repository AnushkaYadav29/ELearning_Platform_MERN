import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiAcademicCap,
  HiUserGroup,
} from "react-icons/hi";

import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "student",
    },
  });

  const password = watch("password");
  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const {
  confirmPassword,
  terms,
  ...userData
} = data;

      const response = await registerUser(userData);

      toast.success(
        response.message || "Account created successfully!"
      );

      if (response.user.role === "instructor") {
        navigate("/instructor/dashboard", {
          replace: true,
        });
      } else {
        navigate("/student/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account ✨"
      subtitle="Join LearnFlow and start your learning journey today."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FULL NAME */}

        <div className="auth-form-group">
          <label className="auth-label">
            Full name
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineUser className="auth-input-icon" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="auth-input"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message:
                    "Name must contain at least 2 characters",
                },
              })}
            />
          </div>

          {errors.name && (
            <p className="auth-error">
              {errors.name.message}
            </p>
          )}
        </div>

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

        {/* ROLE SELECTION */}

        <div className="auth-form-group">
          <label className="auth-label">
            I want to join as
          </label>

          <input
            type="hidden"
            {...register("role", {
              required: "Please select a role",
            })}
          />

          <div className="role-selection">
            {/* STUDENT */}

            <button
              type="button"
              className={`role-card ${
                selectedRole === "student"
                  ? "role-card-active"
                  : ""
              }`}
              onClick={() =>
                setValue("role", "student")
              }
            >
              <div className="role-card-icon">
                <HiAcademicCap />
              </div>

              <div>
                <h4>Student</h4>

                <p>
                  Learn new skills and track
                  your progress.
                </p>
              </div>

              <div className="role-radio">
                {selectedRole === "student" && (
                  <span />
                )}
              </div>
            </button>

            {/* INSTRUCTOR */}

            <button
              type="button"
              className={`role-card ${
                selectedRole === "instructor"
                  ? "role-card-active"
                  : ""
              }`}
              onClick={() =>
                setValue("role", "instructor")
              }
            >
              <div className="role-card-icon instructor-icon">
                <HiUserGroup />
              </div>

              <div>
                <h4>Instructor</h4>

                <p>
                  Create courses and teach
                  students.
                </p>
              </div>

              <div className="role-radio">
                {selectedRole === "instructor" && (
                  <span />
                )}
              </div>
            </button>
          </div>

          {errors.role && (
            <p className="auth-error">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}

        <div className="auth-form-group">
          <label className="auth-label">
            Password
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineLockClosed className="auth-input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
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
            Confirm password
          </label>

          <div className="auth-input-wrapper">
            <HiOutlineLockClosed className="auth-input-icon" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm your password"
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

        {/* TERMS */}

        <div className="register-terms">
          <label className="remember-me">
            <input
              type="checkbox"
              {...register("terms", {
                required:
                  "You must accept the terms to continue",
              })}
            />

            <span>
              I agree to the Terms of Service and
              Privacy Policy
            </span>
          </label>

          {errors.terms && (
            <p className="auth-error">
              {errors.terms.message}
            </p>
          )}
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
              Creating your account...
            </>
          ) : (
            "Create my account"
          )}
        </button>
      </form>

      {/* LOGIN */}

      <div className="auth-bottom-text">
        <span>
          Already have an account?
        </span>

        <Link
          to="/login"
          className="auth-link"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;