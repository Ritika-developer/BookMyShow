import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://bookmyshow-backend-gw5l.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default adminApi;