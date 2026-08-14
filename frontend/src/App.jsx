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
import BrowseCourses from "./pages/student/BrowseCourses";
import CourseDetails from "./pages/student/CourseDetails";
import MyCourses from "./pages/student/MyCourses";
// Profile
import Profile from "./pages/profile/Profile";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminStudentProfile from "./pages/admin/AdminStudentProfile";
import AdminCategories from "./pages/admin/AdminCategories";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";

// Student Pages
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

            {/* COMMON PROFILE */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* =====================
                ADMIN ROUTES
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

                <Route
                  path="students"
                  element={<AdminStudents />}
                />

                <Route
                  path="students/:id"
                  element={<AdminStudentProfile />}
                />

                <Route
                  path="categories"
                  element={<AdminCategories />}
                />
              </Route>
            </Route>

            {/* =====================
                INSTRUCTOR ROUTES
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
                STUDENT ROUTES
            ====================== */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={["student"]}
                />
              }
            >
              <Route
                path="/student"
                element={<StudentLayout />}
              >
                <Route
                  path="dashboard"
                  element={<StudentDashboard />}
                />

                <Route
  path="courses"
  element={<BrowseCourses />}
/>

                <Route
  path="courses/:id"
  element={<CourseDetails />}
/>
                <Route
                  path="my-courses"
                  element={<MyCourses />}
                />
              </Route>
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