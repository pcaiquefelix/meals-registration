"use client";

import { useState } from "react";
import { Save, Soup, Calendar } from "lucide-react";
import Form from "@/components/form/Form";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import TextareaForm from "@/components/form/TextareaForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import { NextApiHandler } from "@/services/NextApiHandler";

const MainForm = ({ proteins, meal }) => {
  const currentMeal = meal
    ? Object.fromEntries(
        Object.entries(meal).filter(([key]) => key !== "day_of_week")
      )
    : undefined;
  const mealTypes = ["Supper", "Lunch", "Dinner"];
  const [date, setDate] = useState({
    date: null,
    dateString: "",
  });
  const [mealRecord, setMealRecord] = useState(
    meal
      ? { ...currentMeal }
      : {
          protein1: {},
          protein2: {},
          mealType: mealTypes[0],
          description: "",
          sides: "",
          salads: "",
          desserts: "",
        }
  );
  const dateNow = new Date();
  const calendarLimits = {
    min: new Date(dateNow.toISOString().slice(0, 10))
      .toISOString()
      .slice(0, 10),
    max: (() => {
      const dateNowCopy = new Date(dateNow);
      dateNowCopy.setDate(dateNowCopy.getDate() + 30);
      const [day, month, year] = dateNowCopy
        .toLocaleDateString()
        .split("/")
        .map(Number);
      const dateUpdate = new Date(`${year}-${month}-${day}`)
        .toISOString()
        .slice(0, 10);
      return dateUpdate;
    })(),
  };
  const mealLimitHour = {
    supper: new Date(new Date().setHours(4)),
    lunch: new Date(new Date().setHours(13)),
    dinner: new Date(new Date().setHours(21)),
  };

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
    if (!mealRecord.mealType) {
      return alert("Select a meal type.");
    }
    const mealRecordSubmit = {
      day_of_week: date.date,
      protein1: mealRecord.protein1.value,
      protein2: mealRecord.protein2.value,
      mealType: mealRecord.mealType,
      description: mealRecord.description,
      sides: mealRecord.sides,
      salads: mealRecord.salads,
      desserts: mealRecord.desserts,
    };

    try {
      const response = await NextApiHandler.post(
        "/api/meals/create-meals",
        mealRecordSubmit
      );
      if (response instanceof Error) {
        console.error(`Message: ${response.message}`);

        return alert(
          "The submission encountered the following error: " + response.message
        );
      }
      alert("Meal successfully saved!");

      if (meal) return window.history.back();

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
      return alert("An unexpected error occurred. Please try again.");
    }
  };

  const protein2Options = proteins.length
    ? proteins.filter(
        (option) =>
          option.value === "" || option.value !== mealRecord.protein1.value
      )
    : [];

  const protein1Options = proteins.length
    ? proteins.filter(
        (option) =>
          option.value === "" || option.value !== mealRecord.protein2.value
      )
    : [];

  const handleDateOnChanged = (e) => {
    setDate({ ...date, dateString: e.target.value });
  };

  const handleDateOnBlur = (e) => {
    function toStringWithTwoChars(dateTimeGetNameFunction = "getHours") {
      return String(new Date()[dateTimeGetNameFunction]()).length < 2
        ? `0${String(new Date()[dateTimeGetNameFunction]())}`
        : String(new Date()[dateTimeGetNameFunction]());
    }
    const dateNowHours = toStringWithTwoChars();
    const dateNowMinutes = toStringWithTwoChars("getMinutes");
    const dateNowSeconds = toStringWithTwoChars("getSeconds");
    const selectedDate = new Date(
      `${e.target.value}T${dateNowHours}:${dateNowMinutes}:${dateNowSeconds}`
    );
    const minDay = new Date(calendarLimits.min + "T00:00");
    const maxDay = new Date(calendarLimits.max + "T00:00");
    setDate({
      ...date,
      date: selectedDate,
    });
    if (selectedDate >= minDay && selectedDate <= maxDay) {
      setDate({
        ...date,
        date: selectedDate,
      });
    } else if (selectedDate > maxDay) {
      setDate({
        date: maxDay,
        dateString: calendarLimits.max,
      });
    } else if (selectedDate < minDay) {
      setDate({
        date: minDay,
        dateString: calendarLimits.min,
      });
    }

    if (
      new Date(selectedDate).setUTCHours(0, 0, 0, 0) <=
        new Date(dateNow).setUTCHours(0, 0, 0, 0) &&
      mealRecord.mealType &&
      dateNow.getHours() >=
        mealLimitHour[mealRecord.mealType.toLowerCase()].getHours()
    ) {
      for (const i in mealTypes) {
        if (
          !(
            dateNow.getHours() >=
            mealLimitHour[mealTypes[i].toLowerCase()].getHours()
          )
        ) {
          setMealRecord({
            ...mealRecord,
            mealType: mealTypes[i],
          });
          break;
        } else if (parseInt(i) + 1 === mealTypes.length) {
          setMealRecord({
            ...mealRecord,
            mealType: "",
          });
        }
      }
    } else if (
      !mealRecord.mealType &&
      selectedDate.toLocaleDateString() !== dateNow.toLocaleDateString()
    ) {
      setMealRecord({
        ...mealRecord,
        mealType: mealTypes[0],
      });
    }
  };

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
      {/* Date */}
      <InputForm
        type="date"
        id="date"
        name="dateInput"
        labelText="Meal Date"
        min={calendarLimits.min}
        max={calendarLimits.max}
        value={date.dateString}
        handleOnChange={handleDateOnChanged}
        handleOnBlur={handleDateOnBlur}
        iconComponent={<Calendar className="h-5 w-5 text-gray-400" />}
        required
      />

      {/* Protein 1 */}
      <SelectForm
        id="protein1"
        labelText="Protein 1"
        value={mealRecord.protein1.value}
        list={protein1Options}
        handleOnChange={(e) => handleProtein1Change(e.target.value)}
        required
      />

      {/* Protein 2 */}
      <SelectForm
        id="protein2"
        labelText="Protein 2"
        value={mealRecord.protein2.value}
        list={protein2Options}
        handleOnChange={(e) => handleProtein2Change(e.target.value)}
        required
      />

      {/* Meal Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meal Types
        </label>
        <div className="space-y-2">
          {mealTypes.map((type) => {
            const isDisabled =
              date.date &&
              date.date.toLocaleDateString() === dateNow.toLocaleDateString() &&
              dateNow.getHours() >=
                mealLimitHour[type.toLowerCase()].getHours();

            return (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id="mealType"
                  checked={mealRecord.mealType === type}
                  onChange={(e) => mealRecordHandleOnChange(e, type)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isDisabled}
                />
                <label
                  htmlFor={type}
                  className="ml-2 block text-sm text-gray-900 capitalize"
                >
                  {type}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
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

      {/* Submit Button */}
      <SubmitButtonForm
        buttonText="Save Menu"
        iconComponent={<Save className="w-5 h-5 mr-2" />}
      />
    </Form>
  );
};

export default MainForm;
