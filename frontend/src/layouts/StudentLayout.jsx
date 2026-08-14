import { Outlet } from "react-router-dom";

import StudentSidebar from "../components/student/StudentSidebar";
import StudentHeader from "../components/student/StudentHeader";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <StudentSidebar />

      <div className="student-main">
        <StudentHeader />

        <main className="student-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;