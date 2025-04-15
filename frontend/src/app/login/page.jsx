import api from "@/services/api";
import { cookies } from "next/headers";
import MainForm from "./MainForm";

const LoginPage = async () => {
  return <MainForm />;
};

export default LoginPage;
