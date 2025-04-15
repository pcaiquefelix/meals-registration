"use client";

import React, { useState, useEffect } from "react";
import CustomLoader from "@/components/common/CustomLoader";
import CustomPageLoader from "@/components/common/CustomPageLoader";
import ContentWrapper from "@/components/layout/ContentWrapper";
import MealOptions from "@/components/meals/MealOptions";
import { NextApiHandler } from "@/services/NextApiHandler";
import { Clock, Utensils } from "lucide-react";

const PageContent = ({ nextMeal, currentMealType, updateMeals, isLoading }) => {
  const [isChangingPath, setIsChangingPath] = useState(false);

  const description =
    nextMeal && Object.keys(nextMeal).length
      ? nextMeal.description?.trim().split("\n")
      : [];
  const mealTypesTime = {
    supper: "02:00",
    lunch: "11:00",
    dinner: "19:00",
  };

  const onDelete = async (meal) => {
    const confirmation = confirm("Delete the selected meal?");

    if (!confirmation) return;

    try {
      const response = await NextApiHandler.delete(
        `/api/meals/delete-meals/${meal.id}`
      );
      if (response instanceof Error) {
        setResponseMessage(
          "The deletion encountered the following error: " + response.message
        );
        setResponseVisible(true);
        return;
      }

      updateMeals(meal);
      alert("Meal successfully deleted!");
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
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <Utensils className="mr-3 text-blue-600" />
        Cafeteria Menu
      </h1>
      <CustomPageLoader loading={isChangingPath} />
      {/* Next Meal Highlight */}
      <ContentWrapper addClassName="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-700">Next Meal</h2>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                <Clock className="inline mr-2 text-blue-500" />
                {nextMeal?.meal_type ||
                  (currentMealType &&
                    currentMealType[0]?.toUpperCase() +
                      currentMealType?.substring(1).toLowerCase())}{" "}
                -{" "}
                {
                  mealTypesTime[
                    nextMeal?.meal_type
                      ? nextMeal?.meal_type.toLowerCase()
                      : currentMealType
                  ]
                }
              </p>
              <p
                className={`mt-2 font-medium ${
                  !description.length && "text-red-500"
                }`}
              >
                {description.length
                  ? description.map((line, index) => {
                      line = line.trim();

                      return (
                        <React.Fragment key={index}>
                          {line
                            ? index === 0
                              ? description.length === 1
                                ? line[0]?.toUpperCase() +
                                  line.substring(1).toLowerCase()
                                : `${
                                    line[0]?.toUpperCase() +
                                    line?.substring(1).toLowerCase()
                                  }, `
                              : index === description.length - 1
                              ? line?.toLowerCase()
                              : `${line?.toLowerCase()}, `
                            : ""}
                        </React.Fragment>
                      );
                    })
                  : "Meal not provided"}
              </p>
            </div>
            {nextMeal && Object.keys(nextMeal).length > 0 && (
              <MealOptions
                meal={nextMeal}
                onDelete={onDelete}
                setIsChangingPath={setIsChangingPath}
              />
            )}
          </div>
        )}
      </ContentWrapper>
    </>
  );
};

export default PageContent;
