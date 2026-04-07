import api from "../api/axios";

export const getInstitutes = (search = "") => {
  return api.get("/institute", {
    params: { search },
  });
};

export const createInstitute = (data) => {
  return api.post("/institute", data);
};

export const updateInstitute = (id, data) => {
  return api.put(`/institute/${id}`, data);
};

export const deleteInstitute = (id) => {
  return api.delete(`/institute/${id}`);
};