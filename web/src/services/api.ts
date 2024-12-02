import axios from "axios";
import { env } from "next-runtime-env";

const api = axios.create({
  baseURL: env("NEXT_PUBLIC_BACKEND_URL") ?? "http://localhost:8080/api/v1",
  withCredentials: true
});

export default api;
