import {
  HiAcademicCap,
  HiCheckCircle,
  HiChartBar,
  HiUserGroup,
} from "react-icons/hi";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-page">
      {/* LEFT VISUAL SECTION */}
      <section className="auth-visual">
        <div className="auth-brand">
          <div className="brand-icon">
            <HiAcademicCap size={26} />
          </div>

          <span>LearnFlow</span>
        </div>

        <div className="auth-hero">
          <h1>
            Learn without
            <br />
            limits.
          </h1>

          <p>
            A smarter way to learn, teach, and grow.
            Build skills with structured courses,
            expert instructors, and measurable progress.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">
                <HiCheckCircle />
              </div>

              <span>
                Learn at your own pace
              </span>
            </div>

            <div className="auth-feature">
              <div className="auth-feature-icon">
                <HiChartBar />
              </div>

              <span>
                Track your learning progress
              </span>
            </div>

            <div className="auth-feature">
              <div className="auth-feature-icon">
                <HiUserGroup />
              </div>

              <span>
                Learn from expert instructors
              </span>
            </div>
          </div>
        </div>

        <div className="auth-visual-footer">
          © 2026 LearnFlow. Learn. Grow. Achieve.
        </div>
      </section>

      {/* RIGHT FORM SECTION */}
      <section className="auth-content">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2>{title}</h2>

            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;