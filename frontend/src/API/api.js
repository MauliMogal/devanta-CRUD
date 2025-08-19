// src/API/api.js
import axios from "axios";

const API = axios.create(); // baseURL not needed, CRA proxy will handle it

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
