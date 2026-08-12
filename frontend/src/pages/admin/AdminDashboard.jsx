import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h1>Admin Dashboard</h1>

      <p className="text-muted">
        Welcome, {user?.name}
      </p>

      <div className="alert alert-primary">
        You are logged in as Administrator.
      </div>
    </div>
  );
};

export default AdminDashboard;