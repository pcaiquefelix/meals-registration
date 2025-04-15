import api from "@/services/api";
import MainForm from "./MainForm";

export async function getUser(id) {
  try {
    const response = await api.get(`/users/${id}`);
    const { name, email, role, status, ...rest } = response.data;
    return { name, email, role, status, ...rest };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Captured error:");
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    } else {
      console.error("Unknown error:", error);
    }
    return new Error(
      "Error while fetching user information. Please contact support."
    );
  }
}

const ProfileConfigPage = async ({ params }) => {
  const { id } = await params;
  const user = id ? { ...(await getUser(id)) } : {};

  return <MainForm user={user} />;
};

export default ProfileConfigPage;
