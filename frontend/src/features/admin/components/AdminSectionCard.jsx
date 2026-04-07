const AdminSectionCard = ({ children, className = "" }) => {
  return (
    <div className={`admin-card ${className}`}>
      {children}
    </div>
  );
};

export default AdminSectionCard;