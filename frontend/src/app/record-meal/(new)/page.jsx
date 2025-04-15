import MainForm from "../MainForm";
import api from "@/services/api";

export async function getProteins() {
  try {
    const response = await api.get("/proteins");
    const data = response.data.map((protein) => {
      return { value: protein.id, label: protein.name };
    });
    data.unshift({ value: "", label: "Select a protein" });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Captured error:");
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    } else {
      console.error("Unknown error:", error);
    }
    return new Error("Error while fetching protein information.");
  }
}

const MenuRegistrationPage = async () => {
  const proteins = await getProteins();

  return <MainForm proteins={proteins} />;
};

export default MenuRegistrationPage;
