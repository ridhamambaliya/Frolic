import IconButton from "../../../components/ui/IconButton";

const EventCard = ({ events = [], loading = false, onView, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-slate-400">
        Loading events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        No events found.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:scale-[1.02] transition cursor-pointer"
          onClick={() => onView(event)}
        >
          <div className="h-60 w-full overflow-hidden">
            <img
              src={
                event.image ||
                "https://images.unsplash.com/photo-1518972559570-7cc1309f3229"
              }
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="text-lg font-bold flex items-center gap-2">
              <i className="bi bi-calendar-event text-indigo-400"></i>
              {event.name}
            </div>

            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {event.description}
            </p>

            <div className="mt-4 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <i className="bi bi-calendar3"></i>
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : "No date"}
              </div>

              <div className="flex items-center gap-2">
                <i className="bi bi-geo-alt"></i>
                {event.location || "No location"}
              </div>

              <div className="flex items-center gap-2">
                <i className="bi bi-diagram-3"></i>
                {event.department?.name || "No department"}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  event.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : event.status === "Pending"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {event.status}
              </span>

              <div
                className="flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton icon="bi-pencil" variant="edit" />
                <IconButton
                  icon="bi-trash"
                  variant="delete"
                  onClick={() => onDelete(event)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;