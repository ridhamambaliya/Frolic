import IconButton from "../../../components/ui/IconButton";

const EventCard = () => {
  const events = [
    {
      title: "Annual Music Festival",
      description: "Rock, Pop, and Classical performances by renowned campus artists.",
      date: "Mar 15, 2026",
      location: "Main Auditorium",
      registered: 250,
      capacity: 500,
      status: "Active",
      icon: "bi-music-note-beamed",
      image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
    },
    {
      title: "Gaming Championship",
      description: "Multi-platform eSports tournament featuring Valorant and FIFA.",
      date: "Mar 20, 2026",
      location: "Cyber Arena",
      registered: 180,
      capacity: 200,
      status: "Active",
      icon: "bi-controller",
      image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
    },
    {
      title: "Art & Design Expo",
      description: "Showcase of digital art, sculptures, and student architecture projects.",
      date: "Mar 25, 2026",
      location: "Exhibition Hall",
      registered: 45,
      capacity: 100,
      status: "Pending",
      icon: "bi-palette",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:scale-[1.02] transition"
        >
          <div className="h-60 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="text-lg font-bold flex items-center gap-2">
              <i className={`bi ${event.icon} text-indigo-400`}></i>
              {event.title}
            </div>

            <p className="text-sm text-slate-400 mt-2">
              {event.description}
            </p>

            <div className="mt-4 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <i className="bi bi-calendar3"></i> {event.date}
              </div>

              <div className="flex items-center gap-2">
                <i className="bi bi-geo-alt"></i> {event.location}
              </div>

              <div className="flex items-center gap-2">
                <i className="bi bi-people"></i>
                {event.registered} / {event.capacity}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  event.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {event.status}
              </span>

              <div className="flex gap-2">
                <IconButton icon="bi-pencil" variant="edit" />
                <IconButton icon="bi-trash" variant="delete" />

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;