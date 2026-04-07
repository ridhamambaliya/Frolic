import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import SearchBar from "../../../components/ui/SearchBar";
import AdminSectionCard from "../components/AdminSectionCard";
import IconButton from "../../../components/ui/IconButton";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { getUsers, toggleBanUser, updateUserRole } from "../../../services/authService";
import UpdateUserRoleModal from "../../auth/modal/UpdateRoleModal";

const tabs = ["All", "Active", "Banned"];

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(null);

  const [loading, setLoading] = useState({
    list: false,
    ban: false,
    role: false,
  });

  const fetchUsers = async (searchValue = "") => {
    try {
      setLoading((prev) => ({ ...prev, list: true }));
      const res = await getUsers(searchValue);
      setUsers(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    } finally {
      setLoading((prev) => ({ ...prev, list: false }));
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const filteredUsers = useMemo(() => {
    if (activeTab === "Banned") {
      return users.filter((user) => user.isBanned);
    }

    if (activeTab === "Active") {
      return users.filter((user) => !user.isBanned);
    }

    return users;
  }, [users, activeTab]);

  const handleOpenBanModal = (user) => {
    setSelectedUser(user);
    setModal("ban");
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setModal("edit");
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModal(null);
  };

  const handleToggleBan = async () => {
    if (!selectedUser?._id) return;

    try {
      setLoading((prev) => ({ ...prev, ban: true }));
      await toggleBanUser(selectedUser._id);
      handleCloseModal();
      fetchUsers(search);
    } catch (error) {
      console.log("Failed to toggle ban:", error);
    } finally {
      setLoading((prev) => ({ ...prev, ban: false }));
    }
  };

  const handleUpdateRole = async (role) => {
    if (!selectedUser?._id) return;

    try {
      setLoading((prev) => ({ ...prev, role: true }));
      await updateUserRole(selectedUser._id, role);
      handleCloseModal();
      fetchUsers(search);
    } catch (error) {
      console.log("Failed to update role:", error);
    } finally {
      setLoading((prev) => ({ ...prev, role: false }));
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="User Management"
        subtitle="Manage system users and roles."
        action={
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
          />
        }
      />

      <AdminSectionCard className="p-5">
        <div className="flex flex-wrap gap-3 mb-5 border-b border-white/10 pb-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${isActive
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10 tracking-wide">
              <th className="pb-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading.list ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-white/5">
                  <td className="py-4 text-sm text-slate-400">{user.name}</td>
                  <td className="text-sm text-slate-400">{user.email}</td>

                  <td>
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${user.isBanned
                        ? "bg-red-500/20 text-red-400"
                        : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>

                  <td className="text-right py-2">
                    <div className="flex justify-end gap-2">
                      <IconButton
                        onClick={() => handleOpenEditModal(user)}
                        icon="bi-pencil"
                        variant="edit"
                        animation="hover:rotate-[15deg]"
                      />

                      <IconButton
                        onClick={() => handleOpenBanModal(user)}
                        icon={user.isBanned ? "bi-shield-x" : "bi-shield-check"}
                        variant="delete"
                        animation="hover:rotate-[-15deg]"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminSectionCard>

      <ConfirmModal
        isOpen={modal === "ban"}
        onClose={handleCloseModal}
        onConfirm={handleToggleBan}
        title={selectedUser?.isBanned ? "Unban User" : "Ban User"}
        subtitle="This action will affect the user account"
        message={
          selectedUser
            ? selectedUser.isBanned
              ? `Are you sure you want to unban ${selectedUser.name}?`
              : `Are you sure you want to ban ${selectedUser.name}?`
            : "Are you sure?"
        }
        confirmText={selectedUser?.isBanned ? "Unban" : "Ban"}
        loading={loading.ban}
      />
      <UpdateUserRoleModal
        isOpen={modal === "edit"}
        onClose={handleCloseModal}
        onSubmit={handleUpdateRole}
        loading={loading.role}
        selectedUser={selectedUser}
      />
    </AdminLayout>

  );
};

export default AdminUsers;