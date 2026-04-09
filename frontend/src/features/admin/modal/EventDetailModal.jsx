import FormModal from "../../../components/ui/FormModal";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={event.name || "Event Details"}
      subtitle={event.tagline || "Detailed event information"}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="text-white opacity-70 font-semibold"
        >
          Close
        </button>
      }
    >
      <div className="space-y-6">
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={
              event.image ||
              "https://images.unsplash.com/photo-1518972559570-7cc1309f3229"
            }
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Category
            </div>
            <div className="font-semibold text-white">{event.category || "N/A"}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Status
            </div>
            <div className="font-semibold text-white">{event.status || "N/A"}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Date
            </div>
            <div className="font-semibold text-white">
              {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Location
            </div>
            <div className="font-semibold text-white">{event.location || "N/A"}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Department
            </div>
            <div className="font-semibold text-white">
              {event.department?.name || "N/A"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Institute
            </div>
            <div className="font-semibold text-white">
              {event.institute?.name || "N/A"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Coordinator
            </div>
            <div className="font-semibold text-white">
              {event.coordinator?.name || "N/A"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Fees
            </div>
            <div className="font-semibold text-white">
              ₹{event.fees ?? 0}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">
            Description
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {event.description || "No description available."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">
              Participation
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <div>Type: {event.participationType || "N/A"}</div>
              <div>Min Participants: {event.groupMinParticipants ?? "N/A"}</div>
              <div>Max Participants: {event.groupMaxParticipants ?? "N/A"}</div>
              <div>Max Groups: {event.maxGroupsAllowed ?? "N/A"}</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">
              Student Coordinator
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <div>Name: {event.studentCoordinatorName || "N/A"}</div>
              <div>Email: {event.studentCoordinatorEmail || "N/A"}</div>
              <div>Phone: {event.studentCoordinatorPhone || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">
            Prizes
          </div>
          <p className="text-sm text-slate-300">
            {event.prizes || "No prize details available."}
          </p>
        </div>
      </div>
    </FormModal>
  );
};

export default EventDetailsModal;