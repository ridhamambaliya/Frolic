import { useEffect, useState } from "react";
import { getUsers } from "../../../services/authService";

const DashboardUserBox = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        const allUsers = res.data.data || [];

        const filtered = allUsers.filter(
          (user) =>
            user.role === "institute_coordinator" ||
            user.role === "department_coordinator"
        );

        setUsers(filtered.slice(0, 5));
      } catch (error) {
        console.log("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <p className="text-slate-400 text-sm">No coordinators found.</p>;
  }

  return (
    <div className="space-y-4">
      {users.map((data) => (
        <div
          key={data._id}
          className="bg-white/[0.02] border border-white/[0.05] rounded-[20px] p-4 flex items-center transition-all duration-300 hover:bg-white/[0.06] hover:border-white/50 hover:scale-[1.005]"
        >
          <div className="flex items-center w-full">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500 font-bold mr-4">
              <i className="bi bi-building"></i>
            </div>

            <div className="flex-1">
              <div className="font-bold">{data.name}</div>
              <div className="text-[12px] text-slate-400/70">{data.email}</div>
            </div>

            <div className="hidden md:block text-sm text-slate-400 capitalize">
              {data.role.replaceAll("_", " ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardUserBox;