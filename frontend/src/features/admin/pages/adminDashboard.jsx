import AdminLayout from "../../../components/layout/AdminLayout";
import ActionButton from "../../../components/ui/ActionButton";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminSectionCard from "../components/AdminSectionCard";
import AdminDashboardAnalitics from "../components/DashboardAnalitics";
import DashboardUserBox from "../components/DashboardUserBox";

const AdminDashboard = () => {
    const recentActivities = [
        "Computer Department added a new internal event.",
        "Mechanical Department coordinator updated profile.",
        "2 student participation requests are pending approval.",
        "Institute event report generated successfully.",
    ];
    return (
        <AdminLayout>
            <AdminPageHeader
                title="Analytics Overview"
                subtitle="Live status of Frolic 2026 event metrics."
                action={<ActionButton>Generate Report</ActionButton>}
            />
            <div className="space-y-10">
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <AdminDashboardAnalitics />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AdminSectionCard className="p-6 xl:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                                <p className="text-slate-400 text-sm">
                                    Latest updates from your institute panel
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                                        <i className="bi bi-bell"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-200">{activity}</p>
                                        <p className="text-xs text-slate-500 mt-1">Just now</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AdminSectionCard>

                    <AdminSectionCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-5">Quick Actions</h3>

                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
                                <span className="font-semibold text-white">Add Department</span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Create and assign a new department
                                </p>
                            </button>

                            <button className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
                                <span className="font-semibold text-white">Create Event</span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Launch a new institute-level event
                                </p>
                            </button>

                            <button className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
                                <span className="font-semibold text-white">Manage Coordinators</span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Review assigned department heads
                                </p>
                            </button>
                        </div>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;