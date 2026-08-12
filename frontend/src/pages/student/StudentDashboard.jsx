import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h1>Student Dashboard</h1>

      <p className="text-muted">
        Welcome, {user?.name}
      </p>

      <div className="alert alert-info">
        You are logged in as Student.
      </div>
    </div>
  );
};

export default StudentDashboard;