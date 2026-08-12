import { useAuth } from "../../context/AuthContext";

const InstructorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h1>Instructor Dashboard</h1>

      <p className="text-muted">
        Welcome, {user?.name}
      </p>

      <div className="alert alert-success">
        You are logged in as Instructor.
      </div>
    </div>
  );
};

export default InstructorDashboard;