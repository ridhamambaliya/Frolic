const ActionButton = ({ children, onClick, type = "button", form, disabled= false }) => {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className="action-btn"
    >
      {children}
    </button>
  );
};

export default ActionButton;