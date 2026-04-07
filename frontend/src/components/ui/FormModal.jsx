const FormModal = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 px-4 py-10 overflow-y-auto">
      <div className="glass glass-card w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h5 className="font-bold text-lg">{title}</h5>
            {subtitle && (
              <small className="text-[12px] uppercase text-slate-400 tracking-wide">
                {subtitle}
              </small>
            )}
          </div>

          <button onClick={onClose} type="button">
            <i className="bi bi-x-lg text-white"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-4 p-6 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;