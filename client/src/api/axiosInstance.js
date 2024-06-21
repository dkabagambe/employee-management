import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5066/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure this line is added
});

export default axiosInstance;
