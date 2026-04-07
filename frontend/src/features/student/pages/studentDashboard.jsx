import AdminLayout from "../../../components/layout/AdminLayout";
import ActionButton from "../../../components/ui/ActionButton";
import IconButton from "../../../components/ui/IconButton";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import AdminSectionCard from "../../admin/components/AdminSectionCard";

const StudentDashboard = () => {
    return (
        <AdminLayout>
            <AdminPageHeader
                title="Welcome back, Alex! 👋"
                subtitle="Ready to compete in Frolic 2026?"
                action={<ActionButton>View Schedule</ActionButton>}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* RECOMMENDED FOR YOU */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Recommended Events</h3>
                            <button className="text-sm text-indigo-400 hover:underline">See All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Robo-Wars 2.0", dept: "Mechanical", date: "April 12", img: "🤖" },
                                { title: "Code Sprint", dept: "CSE", date: "April 15", img: "💻" }
                            ].map((event, i) => (
                                <div key={i} className="glass glass-card p-5 group hover:border-indigo-500/50 transition-all cursor-pointer">
                                    <div className="text-4xl mb-4">{event.img}</div>
                                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{event.dept}</span>
                                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">{event.title}</h4>
                                    <p className="text-sm text-slate-400 mb-4">{event.date} • 10:00 AM</p>
                                    <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-indigo-600 text-sm font-bold transition-all">
                                        Register Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* MY REGISTRATIONS TABLE */}
                    <AdminSectionCard title="Active Registrations">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-white/5">
                                    <tr>
                                        <th className="px-4 py-3">Event</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                                        <td className="px-4 py-4 font-semibold text-white">Hackathon 2026</td>
                                        <td className="px-4 py-4">
                                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">CONFIRMED</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <IconButton icon="bi-ticket" variant="view" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </AdminSectionCard>
                </div>

                {/* RIGHT: SIDEBAR WIDGETS */}
                <div className="space-y-6">
                    {/* STATS */}
                    <div className="glass glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent">
                        <div className="text-xs text-indigo-300 font-bold uppercase tracking-tighter mb-4">Your Progress</div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-3xl font-black text-white">04</div>
                                <div className="text-[10px] text-slate-400 uppercase">Events Joined</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white">02</div>
                                <div className="text-[10px] text-slate-400 uppercase">Certificates</div>
                            </div>
                        </div>
                    </div>

                    {/* ANNOUNCEMENTS */}
                    <AdminSectionCard title="Notices">
                        <div className="space-y-4">
                            <div className="p-3 rounded-xl bg-white/5 border-l-2 border-yellow-500">
                                <p className="text-xs text-slate-200">Gaming Fest registration ends in 2 hours!</p>
                                <span className="text-[10px] text-slate-500">10 mins ago</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border-l-2 border-indigo-500">
                                <p className="text-xs text-slate-200">New rulebook uploaded for Robo-Wars.</p>
                                <span className="text-[10px] text-slate-500">Yesterday</span>
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>

            </div>
        </AdminLayout>
    );
};

export default StudentDashboard;