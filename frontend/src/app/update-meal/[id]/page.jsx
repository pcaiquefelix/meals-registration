import api from "@/services/api";
import MainForm from "./MainForm";

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

export async function getCurrentMeal(id) {
  try {
    const response = await api.get(`/meals/${id}`);
    const { protein1, protein2, updated_at, created_at, ...data } = {
      ...response.data,
    };
    data.protein1 = { value: protein1.id, label: protein1.name };
    data.protein2 = { value: protein2.id, label: protein2.name };
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
    return new Error(error.response.data);
  }
}

const MealUpdate = async ({ params }) => {
  const proteins = await getProteins();
  const { id } = await params;
  const currentMeal = await getCurrentMeal(id);

  return (
    <MainForm proteins={proteins} currentId={id} currentMeal={currentMeal} />
  );
};

export default MealUpdate;
