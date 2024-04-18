import axios from "axios";

const newRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}`,
  withCredentials: true,
});

export default newRequest;