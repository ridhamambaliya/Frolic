import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import { useAuthContext } from "../../auth/context/AuthContext";
import { getDepartments } from "../../../services/departmentService";
import { getEvents } from "../../../services/eventService";

const InstituteDashboard = () => {
  const { meta } = useAuthContext();
  const [stats, setStats] = useState({
    departments: 0,
    events: 0,
    coordinators: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [departmentsRes, eventsRes] = await Promise.all([
          getDepartments(""),
          getEvents(""),
        ]);

        const departments = departmentsRes.data?.data || [];
        const events = eventsRes.data?.data || [];

        setStats({
          departments: departments.length,
          events: events.length,
          coordinators: departments.length + 1,
        });
      } catch (error) {
        console.log("Failed to load institute dashboard:", error);
      }
    };

    loadData();
  }, []);

  const institute = meta?.institute;

  return (
    <AdminLayout>
      <AdminPageHeader
        title={institute?.name || "Institute Dashboard"}
        subtitle="Manage departments, events and coordinators."
        action={
          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[110px]">
              <span className="text-lg font-bold text-indigo-400">{stats.departments}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Departments</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[110px]">
              <span className="text-lg font-bold text-pink-400">{stats.events}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Events</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[110px]">
              <span className="text-lg font-bold text-emerald-400">{stats.coordinators}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Coordinators</span>
            </div>
          </div>
        }
      />
    </AdminLayout>
  );
};

export default InstituteDashboard;