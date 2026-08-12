import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Layouts
import AdminLayout from "./layouts/AdminLayout";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />

        <Routes>
          {/* =========================
              PUBLIC ROUTES
          ========================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* =========================
              PROTECTED ROUTES
          ========================== */}

          <Route element={<ProtectedRoute />}>

            {/* =====================
                ADMIN
            ====================== */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route
                path="/admin"
                element={<AdminLayout />}
              >
                <Route
                  path="dashboard"
                  element={<AdminDashboard />}
                />
              </Route>
            </Route>

            {/* =====================
                INSTRUCTOR
            ====================== */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={["instructor"]}
                />
              }
            >
              <Route
                path="/instructor/dashboard"
                element={<InstructorDashboard />}
              />
            </Route>

            {/* =====================
                STUDENT
            ====================== */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={["student"]}
                />
              }
            >
              <Route
                path="/student/dashboard"
                element={<StudentDashboard />}
              />
            </Route>

          </Route>

          {/* =========================
              FALLBACK
          ========================== */}

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;