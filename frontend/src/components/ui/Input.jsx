const Input = ({ label, type, value, onChange, placeholder , name }) => {
  return (
    <div className="space-y-1">
      <label className="block form-label pl-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        required
      />
    </div>
  );
};

export default Input;