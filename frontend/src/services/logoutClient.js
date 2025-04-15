import { NextApiHandler } from "./NextApiHandler";

export default async function logoutClient() {
  try {
    localStorage.clear();
    await NextApiHandler.get("/api/authentication/logout");
    window.location.assign("/login");
  } catch (error) {
    return new Error(error.response.data);
  }
}
