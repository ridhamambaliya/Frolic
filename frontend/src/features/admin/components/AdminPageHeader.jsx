const AdminPageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <h2 className="text-4xl font-bold mb-1 tracking-normal">{title}</h2>
        <p className="text-slate-400/70 text-xs font-semibold uppercase tracking-wide">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
};

export default AdminPageHeader;