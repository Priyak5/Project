import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://7861-43-205-190-168.in.ngrok.io/",
  headers: { Authorization: window.localStorage.getItem("Authorization") },
});
