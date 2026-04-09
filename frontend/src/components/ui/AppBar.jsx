import { useAuth } from "../../features/auth/hooks/useAuth";
import { useAuthContext } from "../../features/auth/context/AuthContext";

const roleLabelMap = {
  admin: "System Administrator",
  institute_coordinator: "Institute Coordinator",
  department_coordinator: "Department Coordinator",
  event_coordinator: "Event Coordinator",
  student: "Student",
};

const AppBar = () => {
  const { handleLogout } = useAuth();
  const { user, role } = useAuthContext();

  return (
    <nav className="sticky top-0 z-40 bg-secondary/80 backdrop-blur-md border-b border-white/10 px-9 py-5">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold tracking-tight">
          Frolic. <span className="text-sm font-light opacity-50">2026</span>
        </span>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold">{user?.name || "User"}</div>
            <div className="text-[0.6rem] uppercase tracking-wide text-slate-400">
              {roleLabelMap[role] || "User"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 px-5 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;