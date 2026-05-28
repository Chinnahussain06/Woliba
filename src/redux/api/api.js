import axios from "axios";

const isDevelopment =
  typeof window !== "undefined" && window.location.hostname === "localhost";

const WOLIBA_API_BASE_URL = "https://dev.api.woliba.io";

const api = axios.create({
  baseURL: isDevelopment ? "/v1" : WOLIBA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
