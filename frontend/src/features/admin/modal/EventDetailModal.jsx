import FormModal from "../../../components/ui/FormModal";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  const detailGroup = (label, value) => (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition shadow-lg">
      <div className="text-xs font-bold text-slate-500 mb-2">
        {label}
      </div>
      <div className="text-lg font-bold text-slate-200">{value || "---"}</div>
    </div>
  );

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={event.name || "Event Details"}
      subtitle={event.tagline || "Comprehensive event information and configuration"}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="px-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition font-bold border border-white/10"
        >
          Dismiss
        </button>
      }
    >
      <div className="space-y-8 pb-6">
        {/* Banner Image */}
        <div className="relative group w-full h-80 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={event.image || "https://images.unsplash.com/photo-1518972559570-7cc1309f3229"}
            alt={event.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 flex flex-col gap-2">
            <span className={`w-fit px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest ${event.status === "Active" ? "bg-emerald-500 text-white" : "bg-yellow-500 text-black"
              }`}>
              {event.status}
            </span>
            <h2 className="text-3xl font-black text-white">{event.name}</h2>
          </div>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {detailGroup("Category", event.category)}
          {detailGroup("Registration Fees", `₹${event.fees}`)}
          {detailGroup("Event Date", event.date ? new Date(event.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }) : null)}
          {detailGroup("Venue / Location", event.location)}
        </div>

        {/* Org Details */}
        <div className="p-8 rounded-[40px] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="bi bi-building text-7xl text-indigo-500"></i>
          </div>
          <div className="text-sm font-bold text-indigo-400 mb-6 flex items-center gap-2">
            <i className="bi bi-info-circle-fill"></i> INSTITUTE DETAILS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-tight">Host Institute</div>
              <div className="text-xl text-white font-black">{event.institute?.name || "N/A"}</div>
              <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs mt-2 font-bold">
                CODE: {event.institute?.code || "NOT_SET"}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-tight">Parent Department</div>
              <div className="text-xl text-white font-black">{event.department?.name || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
          <div className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest leading-none">Event Description</div>
          <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line font-medium">
            {event.description || "Detailed description is yet to be provided by the organizers."}
          </p>
        </div>

        {/* Technical Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participation */}
          <div className="p-8 rounded-[40px] border border-white/10 bg-white/[0.02]">
            <div className="text-sm font-bold text-pink-500 mb-6 uppercase flex items-center gap-2">
              <i className="bi bi-gear-fill"></i> LOGISTICS & CAPACITY
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-slate-400 font-bold">Participation Mode</span>
                <span className="text-white font-black capitalize">{event.participationType}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-slate-400 font-bold">Group Composition</span>
                <span className="text-white font-black">{event.groupMinParticipants} - {event.groupMaxParticipants} Person(s)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Available Slots</span>
                <span className="text-white font-black">{event.maxGroupsAllowed} Total</span>
              </div>
            </div>
          </div>

          {/* Contacts / Coordinators */}
          <div className="space-y-4">
            <div className="p-6 rounded-[32px] border border-white/10 bg-indigo-500/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 transform group-hover:scale-110 transition duration-500">
                <i className="bi bi-person-workspace text-8xl"></i>
              </div>
              <div className="text-[10px] font-black text-indigo-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                <i className="bi bi-award"></i> Faculty Coordinator Detail
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 font-black text-xl">
                  {event.coordinator?.name?.[0] || 'A'}
                </div>
                <div>
                  <div className="text-lg font-black text-white">{event.coordinator?.name || "Assigning..."}</div>
                  <div className="text-xs text-slate-400 font-medium">{event.coordinator?.email}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[32px] border border-white/10 bg-emerald-500/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 transform group-hover:scale-110 transition duration-500">
                <i className="bi bi-person-check text-8xl"></i>
              </div>
              <div className="text-[10px] font-black text-emerald-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                <i className="bi bi-person-bounding-box"></i> Student Coordinator Detail
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 font-black text-xl">
                  {event.studentCoordinatorName?.[0] || 'S'}
                </div>
                <div>
                  <div className="text-lg font-black text-white">{event.studentCoordinatorName || "To be Named"}</div>
                  <div className="text-xs text-emerald-400/70 font-bold">{event.studentCoordinatorPhone}</div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{event.studentCoordinatorEmail}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entirely New Podium-Style Prize Section */}
        <div className="relative py-12 px-6 lg:px-10 rounded-[60px] bg-slate-900/50 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
          {/* Central Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em] mb-3">Championship Rewards</h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 lg:gap-8">
              {/* 2nd Place */}
              <div className="order-2 lg:order-1 w-full lg:w-72 p-8 rounded-[40px] bg-white/[0.03] border border-white/9 text-center flex flex-col items-center group shadow-[0_0_10px_rgba(148,163,184,0.2)] hover:bg-white/[0.05] hover:scale-105 transition-transform duration-500 transition-all">
                <div className="w-16 h-16 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-400 mb-6 border border-slate-400/20 shadow-[0_0_20px_rgba(148,163,184,0.3)]">
                  <i className="bi bi-award-fill text-2xl"></i>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Runner Up</div>
                <div className="text-xl font-bold text-white leading-tight lg:text-3xl">
                  {event.prizes?.split(',')[1] || "Silver Tier Excellence"}
                </div>
              </div>

              {/* 1st Place (Center) */}
              <div className="order-1 lg:order-2 w-full lg:w-96 p-12 rounded-[50px] bg-gradient-to-b from-yellow-500/20 via-yellow-500/5 to-transparent border border-yellow-500/30 text-center flex flex-col items-center relative shadow-[0_20px_50px_-15px_rgba(234,179,8,0.3)] hover:scale-105 transition-transform duration-500">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest">
                  Champion
                </div>
                <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-black mb-6 shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                  <i className="bi bi-trophy-fill text-4xl"></i>
                </div>
                <div className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2">Grand Winner</div>
                <div className="text-3xl font-black text-white leading-tight lg:text-3xl">
                  {event.prizes?.split(',')[0] || "1st Prize To Be Announced"}
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 w-full">
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => <i key={s} className="bi bi-star-fill text-[8px] text-yellow-500"></i>)}
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3 lg:order-3 w-full lg:w-72 p-8 rounded-[40px] bg-white/[0.03] border border-orange-700/30  text-center flex flex-col items-center group shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:bg-orange-600/[0.02] hover:scale-105 transition-transform duration-500 transition-all">
                <div className="w-16 h-16 rounded-full bg-orange-700/20 flex items-center justify-center text-orange-400 mb-6 border border-orange-700/20 shadow-[0_0_20px_rgba(251,146,60,0.3)]">
                  <i className="bi bi-award-fill text-2xl"></i>
                </div>
                <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">Third Place</div>
                <div className="text-xl font-bold text-white leading-tight">
                  {event.prizes?.split(',')[2] || "Bronze Tier Merit"}
                </div>
              </div>
            </div>

            <p className="text-center mt-12 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
              * Winners will also receive official Frolic 2026 digital credentials
            </p>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default EventDetailsModal;