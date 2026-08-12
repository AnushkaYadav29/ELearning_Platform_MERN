import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === "instructor") {
      return <Navigate to="/instructor/dashboard" replace />;
    }

    return <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;