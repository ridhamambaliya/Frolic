import StatCard from "../../../components/ui/StatCard";

const AdminDashboardAnalitics = () => {
  const stats = [
    {
      title: "Institutes",
      value: "08",
      icon: "bi-building",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-l-indigo-500",
    },
    {
      title: "Total Events",
      value: "156",
      icon: "bi-calendar-check",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-l-purple-500",
    },
    {
      title: "Participants",
      value: "3.4k",
      icon: "bi-people",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-l-pink-500",
    },
    {
      title: "Revenue",
      value: "$12k",
      icon: "bi-currency-dollar",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-l-emerald-500",
    },
  ];

  return stats.map((stat, index) => (
    <StatCard key={index} {...stat} />
  ));
};

export default AdminDashboardAnalitics;