import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.159.162:8080/api/v1",
  withCredentials: true
});

export default api;
