"use client";

import Form from "@/components/form/Form";
import InputForm from "@/components/form/InputForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import { NextApiHandler } from "@/services/NextApiHandler";
import { Drumstick } from "lucide-react";
import { useState } from "react";

const MainForm = () => {
  const [proteinRecord, setProteinRecord] = useState({
    name: "",
    monthlyIncidence: "",
  });

  function handleInputFormOnChange(e) {
    setProteinRecord({
      ...proteinRecord,
      [e.target.name]:
        e.target.name === "monthlyIncidence"
          ? parseInt(e.target.value)
          : e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await NextApiHandler.post(
        "/api/proteins/create-proteins",
        proteinRecord
      );

      if (response instanceof Error) {
        return alert(
          "The creation encountered the following error: " + response.message
        );
      }
      alert(response.message);
      window.location.href = window.location.pathname;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Captured error:");
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
      } else {
        console.error("Unknown error:", error);
      }
      alert("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <Form
      formTitle="Protein Registration"
      formTitleIcon={<Drumstick className="w-10 h-10 text-blue-600 mr-2" />}
      handleSubmit={submit}
    >
      <InputForm
        type="text"
        name="name"
        value={proteinRecord.name || ""}
        labelText="Protein Name"
        handleOnChange={handleInputFormOnChange}
        placeholder="Enter the protein name"
        required
      />

      <InputForm
        type="number"
        name="monthlyIncidence"
        value={proteinRecord.monthlyIncidence || ""}
        min={1}
        max={30}
        labelText="Monthly Incidence"
        handleOnChange={handleInputFormOnChange}
        placeholder="Enter the monthly incidence of the protein"
        required
      />
      <SubmitButtonForm buttonText="Save" />
    </Form>
  );
};

export default MainForm;
