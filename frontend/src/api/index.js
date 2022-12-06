import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://43.205.190.168:8000/",
  headers: {
    Authorization: window.localStorage.getItem("Authorization"),
  },
});
