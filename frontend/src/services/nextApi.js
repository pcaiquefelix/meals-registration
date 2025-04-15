const { default: axios } = require("axios");
import { decode } from "html-entities";

const nextApi = axios.create({
  baseURL: process.env.NEXT_LOCAL_API_BASE_URL, // Base URL of the API
  withCredentials: true, // Ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});

nextApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.headers["content-type"].includes("text/html")
    ) {
      error.response.data = decode(
        error.response.data.replace(/<\/?[^>]+(>|$)/g, "")
      ).trim();
    }
    return Promise.reject(error);
  }
);

export default nextApi;