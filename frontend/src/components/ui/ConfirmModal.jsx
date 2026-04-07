import ActionButton from "./ActionButton";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  subtitle = "Are you sure you want to continue?",
  message = "This action cannot be undo.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50  pb-50 overflow-y-auto">
      <div className="glass glass-card w-full max-w-md rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h5 className="font-bold text-lg text-white">{title}</h5>
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

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/10">
            <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 text-white">
              <i className="bi bi-trash3"></i>
            </div>

            <div>
              <div className="font-semibold text-white">Delete Warning</div>
              <p className="text-sm text-slate-400 mt-1">{message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="text-white opacity-60 font-semibold"
            disabled={loading}
          >
            {cancelText}
          </button>

          <ActionButton onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmText}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;