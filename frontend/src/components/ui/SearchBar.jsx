const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative group w-full md:w-72">
      <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-blue-400 transition-colors"></i>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input pl-11 pr-4 py-2.5 text-sm"
      />
    </div>
  );
};

export default SearchBar;