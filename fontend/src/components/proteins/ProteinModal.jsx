"use client";

import Form from "@/components/form/Form";
import InputForm from "@/components/form/InputForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import { NextApiHandler } from "@/services/NextApiHandler";
import { Drumstick, X } from "lucide-react";
import { useState } from "react";

const ProteinModal = ({ onClose, protein, onSave }) => {
  const [proteinRecord, setProteinRecord] = useState({
    id: protein?.id || "",
    name: protein?.name || "",
    monthlyIncidence: protein?.monthlyIncidence || "",
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
    onSave(proteinRecord);
  }
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        {/* Modal */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-2 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <Form
            formTitle={protein ? "Edit Protein" : "Register Protein"}
            formTitleIcon={
              <Drumstick className="w-10 h-10 text-blue-600 mr-2" />
            }
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
        </div>
      </div>
    </>
  );
};

export default ProteinModal;
