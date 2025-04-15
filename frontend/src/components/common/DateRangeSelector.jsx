"use client";

import React, { useState } from "react";
import Form from "@/components/form/Form";
import { Calendar } from "lucide-react";
import InputForm from "@/components/form/InputForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import RecordedMenus from "@/components/meals/RecordedMenus";
import { months } from "@/components/config/calendarNames";
import { NextApiHandler } from "@/services/NextApiHandler";

const DateRangeSelector = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [meals, setMeals] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await NextApiHandler.get("/api/meals/get-meals-date-range", {
        params: { startDate, endDate },
      });

      if (response instanceof Error) {
        return alert(
          "The query encountered the following error: " + response.message
        );
      }

      const formattedMeals = response.map((meal) => ({
        id: meal.id,
        protein1: meal.protein1,
        protein2: meal.protein2,
        day_of_week: new Date(meal.day_of_week),
        meal_type: meal.meal_type.toLowerCase(),
        description: meal.description,
        sides: meal.sides,
        salads: meal.salads,
        desserts: meal.desserts,
      }));

      const datesUpdate = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };

      setDates(datesUpdate);
      setMeals(formattedMeals);
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

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      return setStartDate(endDate);
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      return setEndDate(startDate);
    }
    setEndDate(newEndDate);
  };

  return (
    <section className="flex flex-col">
      <Form
        formTitle="Registered Meals"
        formTitleIcon={<Calendar className="mr-3 text-blue-600" />}
        handleSubmit={submit}
      >
        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="start-date"
              className="text-sm font-bold text-gray-700 mb-1"
            >
              Start Date
            </label>
            <InputForm
              id="start-date"
              type="date"
              value={startDate}
              max={endDate || ""}
              handleOnChange={handleStartDateChange}
              iconComponent={<Calendar className="h-5 w-5 text-gray-400" />}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="end-date"
              className="text-sm font-bold text-gray-700 mb-1"
            >
              End Date
            </label>
            <InputForm
              id="end-date"
              type="date"
              value={endDate}
              min={startDate || ""}
              handleOnChange={handleEndDateChange}
              iconComponent={<Calendar className="h-5 w-5 text-gray-400" />}
              required
            />
          </div>
        </div>
        <SubmitButtonForm buttonText="Select" />
      </Form>
      {meals && (
        <div className="mt-5">
          <RecordedMenus
            mainTitle={`${dates.startDate.getUTCDate()} ${
              months[dates.startDate.getUTCMonth()]
            } ${dates.startDate.getUTCFullYear()} to ${dates.endDate.getUTCDate()} ${
              months[dates.endDate.getUTCMonth()]
            } ${dates.endDate.getUTCFullYear()}`}
            meals={meals}
          />
        </div>
      )}
    </section>
  );
};

export default DateRangeSelector;