import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, authLoading } = useAuthContext(); 

  if (authLoading) {
    return <div>Processing...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;