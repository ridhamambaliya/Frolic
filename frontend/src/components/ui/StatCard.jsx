const StatCard = ({ title, value, icon, color, bg, border }) => {
  return (
    <div className={`glass-card p-6 transition-transform hover:-translate-y-1 border-l-4 ${border} border border-white/10 rounded-2xl bg-white/[0.03]`}>
      <div className="flex justify-between">
        <div>
          <div className="text-[12px] font-bold text-slate-400/70 uppercase tracking-wide mb-1">
            {title}
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {value}
          </div>
        </div>

        <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center ${color} text-xl hover:rotate-[-15deg]`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;