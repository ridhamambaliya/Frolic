import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../features/auth/context/AuthContext";

const SideBar = () => {
  const { role } = useAuthContext();

  const adminMenuItems = [
    { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/admin/dashboard" },
    { name: "Institutes", icon: "bi-building", nav: "/admin/institutes" },
    { name: "Departments", icon: "bi-layers", nav: "/admin/departments" },
    { name: "Events", icon: "bi-calendar-event", nav: "/admin/events" },
    { name: "Users", icon: "bi-people", nav: "/admin/users" },
  ];

  const instituteMenuItems = [
    { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/institute/dashboard" },
    { name: "Departments", icon: "bi-layers", nav: "/institute/departments" },
    { name: "Events", icon: "bi-calendar-event", nav: "/institute/events" },
  ];

  const studentMenuItems = [
    { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/student/dashboard" },
    { name: "Events", icon: "bi-compass", nav: "/student/events" },
  ];

  const menuItems =
    role === "admin"
      ? adminMenuItems
      : role === "institute_coordinator"
      ? instituteMenuItems
      : studentMenuItems;

  const settingsRoute =
    role === "admin"
      ? "/admin/settings"
      : role === "institute_coordinator"
      ? "/institute/settings"
      : null;

  return (
    <aside className="lg:w-80 lg:h-[calc(100vh-72px)] glass glass-sidebar p-5 fixed bottom-0 left-0 w-full lg:sticky lg:top-[72px] z-40">
      <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-1 lg:block">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.nav}
            className={({ isActive }) =>
              `flex items-center px-5 py-3 rounded-xl transition-all duration-300 mb-1 ${
                isActive
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <i className={`bi ${item.icon} mr-3`}></i>
            <span className="hidden lg:inline">{item.name}</span>
          </NavLink>
        ))}

        {settingsRoute && (
          <>
            <hr className="my-4 border-white/6 hidden lg:block" />
            <NavLink
              to={settingsRoute}
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <i className="bi bi-gear mr-3"></i>
              <span className="hidden lg:inline">Settings</span>
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default SideBar;