import api from "@/services/api";
import Content from "./Content";

export async function getUsers() {
  "use server";

  try {
    const response = await api.get("/users");
    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Captured error:");
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    } else {
      console.error("Unknown error:", error);
    }
    return new Error("Error while fetching user information.");
  }
}

const UserRegistration = async () => {
  const users = await getUsers();

  return <Content users={users} updateUsers={getUsers} />;
};

export default UserRegistration;
