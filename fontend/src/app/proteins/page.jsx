import api from "@/services/api";
import MainForm from "./MainForm";
import Content from "./Content";

export async function getProteins() {
  "use server";

  try {
    const response = await api.get("/proteins");
    return response.data.map((protein) => ({
      id: protein.id,
      name: protein.name,
      monthlyIncidence: protein.monthlyIncidence,
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
    return new Error("Error while fetching protein information.");
  }
}

const RecordProteinPage = async () => {
  const proteins = await getProteins();

  return (
    <>
      {/* <MainForm /> */}
      <Content proteins={proteins} updateProteins={getProteins} />
    </>
  );
};

export default RecordProteinPage;