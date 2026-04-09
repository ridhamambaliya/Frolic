const PrizeCards = ({ prizes, setPrizes }) => {
  const cards = [
    {
      key: "first",
      label: "1st Prize (₹)",
      icon: "bi-trophy-fill",
      iconColor: "text-yellow-400",
      glow: "hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]",
      border: "after:bg-yellow-400",
    },
    {
      key: "second",
      label: "2nd Prize (₹)",
      icon: "bi-patch-check-fill",
      iconColor: "text-slate-300",
      glow: "hover:shadow-[0_0_30px_rgba(226,232,240,0.18)]",
      border: "after:bg-slate-300",
    },
    {
      key: "third",
      label: "3rd Prize (₹)",
      icon: "bi-star-fill",
      iconColor: "text-orange-500",
      glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.18)]",
      border: "after:bg-orange-500",
    },
  ];

  const handleChange = (key, value) => {
    setPrizes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`glass glass-card relative overflow-hidden rounded-[22px] border border-white/10 px-5 pt-2 pb-4 ${card.glow}
          after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full ${card.border}`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`text-[28px] ${card.iconColor}`}>
              <i className={`bi ${card.icon}`}></i>
            </div>

            <p className="mt-3 text-[15px] font-semibold text-slate-300">
              {card.label}
            </p>
          </div>

          <div className="mt-8">
            <input
              type="number"
              placeholder={
                card.key === "first"
                  ? "50000"
                  : card.key === "second"
                  ? "30000"
                  : "15000"
              }
              value={prizes?.[card.key] || ""}
              onChange={(e) => handleChange(card.key, e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-[24px] font-semibold tracking-wide text-white outline-none placeholder:text-white/10 focus:border-white/20"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrizeCards;