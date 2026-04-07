import api from "../api/axios";

export const loginUser = (data) => api.post(`auth/login`, data);
export const registerUser = (data) => api.post(`auth/register`, data);
export const getUsers = (search = "") => {
    return api.get("/auth/users", {
        params: { search },
    });
};
export const toggleBanUser = (id) => {
    return api.patch(`/auth/users/${id}/toggle-ban`);
};
export const updateUserRole = (id, role) => {
    return api.patch(`/auth/users/${id}/role`, { role });
};