import api from "@/services/api";
import MainForm from "../../MainForm";

export async function getMeal(id) {
  try {
    const response = await api.get(`/meals/${id}`);
    const data = response.data;
    data.protein1 = { value: data.protein1?.id, label: data.protein1?.name };
    data.protein2 = { value: data.protein2?.id, label: data.protein2?.name };

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
    return new Error(
      "Error while fetching meal information. Please contact support."
    );
  }
}

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

const MenuRegistrationPage = async ({ params }) => {
  const { id } = await params;
  const meal = id ? await getMeal(id) : {};
  const proteins = await getProteins();

  return <MainForm proteins={proteins} meal={meal} />;
};

export default MenuRegistrationPage;
