import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
    const role = localStorage.getItem("role");
    const adminMenuItems = [
        { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/admin/dashboard" },
        { name: "Institues", icon: "bi-building", nav: "/admin/institutes" },
        { name: "Departments", icon: "bi bi-layers", nav: "/admin/Departments" },
        { name: "Events", icon: "bi-calendar-event", nav: "/admin/events" },
        { name: "Users", icon: "bi-people", nav: "/admin/users" }
    ];

    const instituteMenuItems = [
        { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/institute/dashboard" },
        { name: "Departments", icon: "bi bi-layers", nav: "/institute/Departments" },
        { name: "Events", icon: "bi-calendar-event", nav: "/institute/events" },
        { name: "Participants", icon: "bi-people", nav: "/institute/participants" }
    ];

    const studentMenuItems = [
        { name: "Dashboard", icon: "bi-grid-1x2-fill", nav: "/student/dashboard" },
        { name: "Explore Events", icon: "bi-compass", nav: "/student/explore" },
        { name: "My Registrations", icon: "bi-ticket-perforated", nav: "/student/my-events" },
        { name: "Leaderboard", icon: "bi-trophy", nav: "/student/leaderboard" },
        { name: "Certificates", icon: "bi-patch-check", nav: "/student/certificates" }
    ];

    return (
        <aside className="lg:w-80 lg:h-[calc(100vh-72px)] glass glass-sidebar p-5 fixed bottom-0 left-0 w-full lg:sticky lg:top-[72px] z-40">

            <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-1 lg:block">
                {role === "admin" ? (
                    <>
                        {adminMenuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.nav}
                                className={({ isActive }) =>
                                    `flex items-center px-5 py-3 rounded-xl transition-all duration-300 mb-1
                            ${isActive
                                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                <i className={`bi ${item.icon} mr-3`}></i>
                                <span className="hidden lg:inline">{item.name}</span>
                            </NavLink>
                        ))}

                        <hr className="my-4 border-white/6 hidden lg:block" />

                        <NavLink
                            to="/admin/settings"
                            className={({ isActive }) =>
                                `flex items-center px-5 py-3 rounded-xl transition-all duration-300
                        ${isActive
                                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <i className="bi bi-gear mr-3"></i>
                            <span className="hidden lg:inline">Settings</span>
                        </NavLink>
                    </>
                ) : role === "institute_coordinator" ? (
                    <>
                        {instituteMenuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.nav}
                                className={({ isActive }) =>
                                    `flex items-center px-5 py-3 rounded-xl transition-all duration-300 mb-1
                            ${isActive
                                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                <i className={`bi ${item.icon} mr-3`}></i>
                                <span className="hidden lg:inline">{item.name}</span>
                            </NavLink>
                        ))}

                        <hr className="my-4 border-white/6 hidden lg:block" />

                        <NavLink
                            to="/institute/settings"
                            className={({ isActive }) =>
                                `flex items-center px-5 py-3 rounded-xl transition-all duration-300
                        ${isActive
                                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <i className="bi bi-gear mr-3"></i>
                            <span className="hidden lg:inline">Settings</span>
                        </NavLink>
                    </>
                ) : role === "student" ? (
                    studentMenuItems.map((item) => (
                        <NavLink
                            key={item.nav}
                            to={item.nav}
                            className={({ isActive }) => `flex items-center px-5 py-3 rounded-xl transition-all ${isActive ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                        >
                            <i className={`bi ${item.icon} mr-3`}></i>
                            <span>{item.name}</span>
                        </NavLink>
                    ))
                ) : null
                }
            </div>
        </aside>
    );
};

export default AdminSideBar;