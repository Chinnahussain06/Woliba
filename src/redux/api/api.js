import axios from "axios";

const isDevelopment =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname.includes("run.app") ||
    window.location.hostname.includes("aistudio"));

const api = axios.create({
  baseURL: isDevelopment ? "/v1" : "https://dev.api.woliba.io/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
