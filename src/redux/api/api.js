import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/v1"
      : "https://dev.api.woliba.io/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
