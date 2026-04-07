import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";

const InstituteDashboard = () => {
  const institute = {
    name: "Atmiya University",
    departments: 8,
    events: 14,
    coordinators: 5,
  };

  const stats = [
    {
      label: "Departments",
      value: institute.departments,
      color: "text-indigo-400",
    },
    {
      label: "Events",
      value: institute.events,
      color: "text-pink-400",
    },
    {
      label: "Coordinators",
      value: institute.coordinators,
      color: "text-emerald-400",
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title={institute.name}
        subtitle="Manage departments, events and coordinators."
        action={
          <div className="flex gap-3 flex-wrap">
            {stats.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[110px]"
              >
                <span className={`text-lg font-bold ${item.color}`}>
                  {item.value}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        }
      />

      {/* optional empty section or future content */}
      <div className="mt-6"></div>
    </AdminLayout>
  );
};

export default InstituteDashboard;