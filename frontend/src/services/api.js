import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanagapp.onrender.com/api",
  withCredentials: true
});

export default api;