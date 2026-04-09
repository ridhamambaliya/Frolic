import { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import ActionButton from "../../../components/ui/ActionButton";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminSectionCard from "../components/AdminSectionCard";
import Input from "../../../components/ui/Input";
import { useAuthContext } from "../../auth/context/AuthContext";
import { updateProfile, updatePassword } from "../../../services/authService";
import SectionTitle from "../../../components/ui/SectionTitle";

const AdminSettings = () => {
  const { user } = useAuthContext();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState({
    profile: false,
    password: false,
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading({ ...loading, profile: true });

    try {
      await updateProfile(profileForm);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    setLoading({ ...loading, password: true });

    try {
      await updatePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update password",
      });
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        subtitle="Manage your profile and account security."
      />

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminSectionCard className="p-8">
          <SectionTitle>Profile Information</SectionTitle>
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={profileForm.name}
              onChange={handleProfileChange}
              placeholder="Enter your name"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              placeholder="Enter your email"
            />
            <div className="pt-2">
              <ActionButton type="submit" disabled={loading.profile}>
                {loading.profile ? "Updating..." : "Update Profile"}
              </ActionButton>
            </div>
          </form>
        </AdminSectionCard>

        <AdminSectionCard className="p-8">
          <SectionTitle>Security & Password</SectionTitle>
          <form onSubmit={handleUpdatePassword} className="mt-6 space-y-6">
            <Input
              label="Current Password"
              name="oldPassword"
              type="password"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              placeholder="********"
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="********"
            />
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="********"
            />
            <div className="pt-2">
              <ActionButton type="submit" disabled={loading.password}>
                {loading.password ? "Changing..." : "Change Password"}
              </ActionButton>
            </div>
          </form>
        </AdminSectionCard>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;