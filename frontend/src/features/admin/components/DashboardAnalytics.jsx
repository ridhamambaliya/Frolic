import { useEffect, useState } from "react";
import StatCard from "../../../components/ui/StatCard";
import { getInstitutes } from "../../../services/instituteService";
import { getEvents } from "../../../services/eventService";
import { getDepartments } from "../../../services/departmentService";
import { getUsers } from "../../../services/authService";

const AdminDashboardAnalytics = () => {
  const [stats, setStats] = useState([
    {
      title: "Institutes",
      value: "0",
      icon: "bi-building",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-l-indigo-500",
    },
    {
      title: "Departments",
      value: "0",
      icon: "bi-layers",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-l-purple-500",
    },
    {
      title: "Events",
      value: "0",
      icon: "bi-calendar-check",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-l-pink-500",
    },
    {
      title: "Users",
      value: "0",
      icon: "bi-people",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-l-emerald-500",
    },
  ]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [institutesRes, departmentsRes, eventsRes, usersRes] = await Promise.all([
          getInstitutes(""),
          getDepartments(""),
          getEvents(""),
          getUsers(""),
        ]);

        setStats([
          {
            title: "Institutes",
            value: String(institutesRes.data?.data?.length || 0),
            icon: "bi-building",
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            border: "border-l-indigo-500",
          },
          {
            title: "Departments",
            value: String(departmentsRes.data?.data?.length || 0),
            icon: "bi-layers",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-l-purple-500",
          },
          {
            title: "Events",
            value: String(eventsRes.data?.data?.length || 0),
            icon: "bi-calendar-check",
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "border-l-pink-500",
          },
          {
            title: "Users",
            value: String(usersRes.data?.data?.length || 0),
            icon: "bi-people",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-l-emerald-500",
          },
        ]);
      } catch (error) {
        console.log("Failed to load dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  return stats.map((stat, index) => <StatCard key={index} {...stat} />);
};

export default AdminDashboardAnalytics;