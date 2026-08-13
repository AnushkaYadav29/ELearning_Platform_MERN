import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../../styles/profile.css";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineSave,
  HiOutlineCamera,
} from "react-icons/hi";

import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../../api/userApi";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [profileImage, setProfileImage] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ========================================
  // GET PROFILE
  // ========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response =
        await getUserProfile();

      setUser(response.data);

      setName(response.data.name);

      setProfileImage(
        response.data.profileImage || ""
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ========================================
  // UPDATE PROFILE
  // ========================================

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response =
        await updateUserProfile({
          name,
          profileImage,
        });

      setUser(response.data);

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // CHANGE PASSWORD
  // ========================================

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setSaving(true);

      const response =
        await changeUserPassword({
          currentPassword,
          newPassword,
        });

      toast.success(response.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HEADER */}

      <div className="profile-page-header">
        <div>
          <p className="profile-eyebrow">
            Account Settings
          </p>

          <h1>My Profile</h1>

          <p>
            Manage your personal information
            and account security.
          </p>
        </div>
      </div>

      <div className="profile-grid">

        {/* PROFILE CARD */}

        <div className="profile-card">

          <div className="profile-avatar-section">

            <div className="profile-avatar">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user?.name}
                />
              ) : (
                user?.name
                  ?.charAt(0)
                  .toUpperCase()
              )}

            </div>

            <button
              type="button"
              className="profile-camera-btn"
            >
              <HiOutlineCamera />
            </button>

          </div>

          <h3>{user?.name}</h3>

          <p>{user?.email}</p>

          <span className="profile-role">
            {user?.role}
          </span>

        </div>


        {/* PROFILE FORM */}

        <div className="profile-card profile-form-card">

          <h2>
            Personal Information
          </h2>

          <form
            onSubmit={handleProfileSubmit}
          >

            <div className="profile-input-group">

              <label>
                Full Name
              </label>

              <div className="profile-input">

                <HiOutlineUser />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="profile-input-group">

              <label>
                Email Address
              </label>

              <div className="profile-input">

                <HiOutlineMail />

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                />

              </div>

            </div>


            <div className="profile-input-group">

              <label>
                Profile Image URL
              </label>

              <input
                type="text"
                placeholder="Enter image URL"
                value={profileImage}
                onChange={(e) =>
                  setProfileImage(
                    e.target.value
                  )
                }
              />

            </div>


            <button
              type="submit"
              className="profile-save-btn"
              disabled={saving}
            >

              <HiOutlineSave />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </form>

        </div>

      </div>


      {/* CHANGE PASSWORD */}

      <div className="profile-card password-card">

        <h2>
          Security
        </h2>

        <p>
          Update your account password.
        </p>

        <form
          onSubmit={handlePasswordSubmit}
        >

          <div className="password-form-grid">

            <div className="profile-input-group">

              <label>
                Current Password
              </label>

              <div className="profile-input">

                <HiOutlineLockClosed />

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="profile-input-group">

              <label>
                New Password
              </label>

              <div className="profile-input">

                <HiOutlineLockClosed />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="profile-input-group">

              <label>
                Confirm Password
              </label>

              <div className="profile-input">

                <HiOutlineLockClosed />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          <button
            type="submit"
            className="profile-save-btn"
            disabled={saving}
          >

            <HiOutlineLockClosed />

            Change Password

          </button>

        </form>

      </div>

    </div>
  );
};

export default Profile;