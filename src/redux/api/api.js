import axios from "axios";

const WOLIBA_API_BASE_URL = "https://dev.api.woliba.io/v1";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "/v1" : WOLIBA_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
