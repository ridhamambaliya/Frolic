const IconButton = ({ icon, onClick, variant = "default", title, animation, disabled }) => {
    const variantClasses = {
        default: "hover:bg-white/10",
        edit: "hover:bg-yellow-300/30",
        delete: "hover:bg-pink-500/30",
        view: "hover:bg-indigo-500/30",
        success: "hover:bg-emerald-500/30",
    };

    return (
        <button
            disabled={disabled}
            type="button"
            title={title}
            onClick={onClick}
            className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white ${animation}  transition-all duration-300 ${variantClasses[variant] || variantClasses.default}`}
        >
            <i className={`bi ${icon}`}></i>
        </button>
    );
};

export default IconButton;