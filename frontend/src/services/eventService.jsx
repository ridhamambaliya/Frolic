import api from "../api/axios";

export const getEvents = (search = "") => {
  return api.get("/event", {
    params: { search },
  });
};

export const createEvent = (data) => {
  return api.post("/event", data);
};

export const updateEvent = (id, data) => {
  return api.put(`/event/${id}`, data);
};

export const deleteEvent = (id) => {
  return api.delete(`/event/${id}`);
};

export const getEventById = (id) => {
  return api.get(`/event/${id}`);
};