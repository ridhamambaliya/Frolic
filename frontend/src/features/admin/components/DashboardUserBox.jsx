import { useEffect, useState } from "react";
import IconButton from "../../../components/ui/IconButton";
import { getUsers } from "../../../services/authService";

const DashboardUserBox = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const allUsers = res.data.data || [];

      // filter only coordinators
      const filtered = allUsers.filter(
        (user) =>
          user.role === "institute_coordinator" ||
          user.role === "department_coordinator"
      );

      setUsers(filtered);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return users.map((data, index) => {
    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return (
      <div
        key={index}
        className="bg-white/[0.02] border border-white/[0.05] rounded-[20px] p-4 mb-4 flex items-center transition-all duration-300 hover:bg-white/[0.06] hover:border-white/50 hover:scale-[1.005]"
      >
        <div className="flex items-center w-full lg:w-1/3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500 font-bold mr-4 relative">
            <i className={`bi bi-building`}></i></div>

          <div>
            <div className="font-bold">{data.name}</div>
            <div className="text-[12px] text-slate-400/70">
              {data.email}
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-start">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] font-bold rounded-lg uppercase tracking-wider border">
            {data.institute || "N/A"}
          </span>
        </div>

        <div className="hidden lg:block flex-1">
          <div className="text-[10px] text-slate-400/70 uppercase tracking-widest">
            Designation
          </div>
          <div className="text-sm text-slate-400 tracking-wide capitalize">
            {data.role.replace("_", " ")}
          </div>
        </div>

        <div className="flex gap-2">
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
      </div>
    );
  });
};

export default DashboardUserBox;