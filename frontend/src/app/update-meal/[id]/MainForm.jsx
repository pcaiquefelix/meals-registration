"use client";

import { useEffect, useState } from "react";
import { Save, Soup, Calendar } from "lucide-react";
import Form from "@/components/form/Form";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import TextareaForm from "@/components/form/TextareaForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import CustomLoader from "@/components/common/CustomLoader";
import { NextApiHandler } from "@/services/NextApiHandler";

const MainForm = ({ currentId, proteins, currentMeal }) => {
  const mealTypes = ["Supper", "Lunch", "Dinner"];
  const [date, setDate] = useState({
    date: null,
    dateString: "",
  });
  const [mealRecord, setMealRecord] = useState({
    id: null,
    protein1: {},
    protein2: {},
    mealType: mealTypes[0],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { day_of_week, ...mealRecordUpdate } = currentMeal;
    const dateUpdate = new Date(day_of_week);
    const [day, month, year] = dateUpdate.toLocaleDateString().split("/");

    setIsLoading(false);
    setMealRecord(mealRecordUpdate);
    setDate({ date: dateUpdate, dateString: `${year}-${month}-${day}` });
  }, [currentMeal]);

  const handleProtein1Change = (value) => {
    const mealRecordUpdate = {
      ...mealRecord,
      protein1: proteins.find((protein) => protein.value.toString() === value),
    };
    if (
      mealRecord.protein2.value &&
      value === mealRecord.protein2.value.toString()
    ) {
      mealRecordUpdate.protein2 = proteins[0];
    }
    setMealRecord(mealRecordUpdate);
  };

  const handleProtein2Change = (value) => {
    const mealRecordUpdate = {
      ...mealRecord,
      protein2: proteins.find((protein) => protein.value.toString() === value),
    };
    if (
      mealRecord.protein1.value &&
      value === mealRecord.protein1.value.toString()
    ) {
      mealRecordUpdate.protein1 = proteins[0];
    }
    setMealRecord(mealRecordUpdate);
  };

  const submit = async (e) => {
    e.preventDefault();
    const mealRecordSubmit = {
      day_of_week: date.date,
      id: mealRecord.id,
      protein1: mealRecord.protein1.value,
      protein2: mealRecord.protein2.value,
      mealType: mealRecord.mealType,
      description: mealRecord.description,
      sides: mealRecord.sides,
      salads: mealRecord.salads,
      desserts: mealRecord.desserts,
    };

    try {
      const response = await NextApiHandler.put(
        `/api/meals/update-meals/${currentId}`,
        mealRecordSubmit
      );
      if (response instanceof Error) {
        return alert(
          "The update encountered the following error: " + response.message
        );
      }
      alert("Meal successfully updated!");
      window.location.assign("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Captured error:");
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
      } else {
        console.error("Unknown error:", error);
      }
      return alert("An unexpected error occurred. Please try again.");
    }
  };

  const protein2Options = proteins.filter(
    (option) =>
      option.value === "" || option.value !== mealRecord.protein1.value
  );

  const protein1Options = proteins.filter(
    (option) =>
      option.value === "" || option.value !== mealRecord.protein2.value
  );

  const mealRecordHandleOnChange = (e, type) => {
    setMealRecord({
      ...mealRecord,
      [e.target.id]: type ? type : e.target.value,
    });
  };

  return (
    <Form
      formTitle="Meal Registration"
      formTitleIcon={<Soup className="w-10 h-10 text-blue-600 mr-2" />}
      isSomeComponentRequired={true}
      handleSubmit={submit}
    >
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <InputForm
            type="date"
            id="date"
            name="dateInput"
            labelText="Meal Date"
            value={date.dateString}
            iconComponent={<Calendar className="h-5 w-5 text-gray-400" />}
            disabled
          />

          <SelectForm
            id="protein1"
            labelText="Protein 1"
            value={mealRecord.protein1.value}
            list={protein1Options}
            handleOnChange={(e) => handleProtein1Change(e.target.value)}
            required
          />

          <SelectForm
            id="protein2"
            labelText="Protein 2"
            value={mealRecord.protein2.value}
            list={protein2Options}
            handleOnChange={(e) => handleProtein2Change(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Types
            </label>
            <div className="space-y-2">
              {mealTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id="mealType"
                    checked={mealRecord.mealType === type}
                    onChange={(e) => mealRecordHandleOnChange(e, type)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled
                  />
                  <label
                    htmlFor={type}
                    className="ml-2 block text-sm text-gray-900 capitalize"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <TextareaForm
            id="description"
            labelText="Main Dish"
            value={mealRecord.description || ""}
            rows={4}
            maxLength={70}
            handleOnChange={mealRecordHandleOnChange}
            placeholder="Main dish of the menu (maximum 70 characters)"
            isResizeNone
            required
          />

          <TextareaForm
            id="sides"
            labelText="Sides"
            value={mealRecord.sides || ""}
            rows={4}
            maxLength={70}
            handleOnChange={mealRecordHandleOnChange}
            placeholder="Enter the sides (maximum 70 characters)"
            isResizeNone
            required
          />

          <TextareaForm
            id="salads"
            labelText="Salads"
            value={mealRecord.salads || ""}
            rows={4}
            maxLength={70}
            handleOnChange={mealRecordHandleOnChange}
            placeholder="Enter the salads (maximum 70 characters)"
            isResizeNone
            required
          />

          <TextareaForm
            id="desserts"
            labelText="Desserts"
            value={mealRecord.desserts || ""}
            rows={4}
            maxLength={70}
            handleOnChange={mealRecordHandleOnChange}
            placeholder="Enter the desserts (maximum 70 characters)"
            isResizeNone
          />

          <SubmitButtonForm
            buttonText="Save Menu"
            iconComponent={<Save className="w-5 h-5 mr-2" />}
          />
        </>
      )}
    </Form>
  );
};

export default MainForm;
