import api from "../api/axios";

export const getDepartments = (search = "") => {
    return api.get("/department",{
        params : {search},
    });
};

export const createDepartment = (data) => {
    return api.post("/department",data);
};

export const updateDepartment = (id,data) => {
    return api.put(`/department/${id}`,data);
};

export const deleteDepartment = (id) => {
    return api.delete(`/department/${id}`);
};