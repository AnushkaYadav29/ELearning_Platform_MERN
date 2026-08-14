import {
  HiOutlineBell,
  HiOutlineSearch,
} from "react-icons/hi";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const StudentHeader = () => {
  const { user } = useContext(AuthContext);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="student-header">
      <div className="student-header-search">
        <HiOutlineSearch />

        <input
          type="text"
          placeholder="Search courses, lessons..."
        />
      </div>

      <div className="student-header-right">
        <button className="student-notification">
          <HiOutlineBell />
          <span />
        </button>

        <div className="student-header-profile">
          <div className="student-header-avatar">
            {initials || "ST"}
          </div>

          <div>
            <strong>{user?.name || "Student"}</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;