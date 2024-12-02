import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.10.3:8080/api/v1",
  withCredentials: true
});

export default api;
