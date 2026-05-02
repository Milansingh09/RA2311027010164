import api from "../config/api.js";

export const fetchDepots = async () => {
  const res = await api.get("/depots");
  return res.data.depots;
};

export const fetchVehicles = async () => {
  const res = await api.get("/vehicles");
  return res.data.vehicles;
};