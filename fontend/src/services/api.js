import { cookies, headers } from "next/headers";
import { decode } from "html-entities";

const { default: axios } = require("axios");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL of the API
  withCredentials: true, // Ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
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

api.interceptors.request.use(async (config) => {
  const header = await headers();
  const host = header.get("host");
  config.headers.set("X-Custom-Origin", "http://" + host);
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    // Adds the token to the authorization header
    config.headers.Authorization = `Bearer ${token.value}`;
  }

  return config;
});

export default api;
