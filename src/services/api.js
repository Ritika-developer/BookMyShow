import axios from "axios";

const API = axios.create({
  baseURL: "https://bookmyshow-backend-gw5l.onrender.com/api"
});

export default API;