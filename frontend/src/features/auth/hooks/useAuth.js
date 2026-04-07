import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const routes = {
    admin: "/admin/dashboard",
    student: "/student/dashboard",
    institute_coordinator: "/institute/dashboard",
    department_coordinator: "/department/dashboard",
};

export const useAuth = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuthContext();
    const handleAuthSuccess = (data) => {
        const { token, role } = data;

        login({ token, role });
        navigate(routes[role] || "/");
    };
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return { handleAuthSuccess, handleLogout };
};
