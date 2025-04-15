import { months } from "@/components/config/calendarNames";
import React, { useEffect, useState } from "react";
import MealOptions from "@/components/meals/MealOptions";
import CustomPageLoader from "@/components/common/CustomPageLoader";
import { NextApiHandler } from "@/services/NextApiHandler";

export default function Meal({
  list,
  dayName,
  mealIndex,
  mealDate,
  updateList,
}) {
  const [isChangingPath, setIsChangingPath] = useState(false);

  const onDelete = async (meal) => {
    const confirmation = confirm("Do you want to delete the selected meal?");

    if (!confirmation) return;

    try {
      const response = await NextApiHandler.delete(
        `/api/meals/delete-meals/${meal.id}`
      );
      if (response instanceof Error) {
        return alert(
          "The deletion encountered the following error: " + response.message
        );
      }

      updateList(meal);
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
    <div key={dayName} className="w-full border-b last:border-b-0 py-3">
      <h3 className="font-medium text-gray-600">
        <span className="font-bold">{dayName}</span>, {mealDate.getUTCDate()}{" "}
        {months[mealDate.getUTCMonth()]}
      </h3>
      <div key={mealIndex} className="flex justify-between mt-2 px-7">
        <CustomPageLoader loading={isChangingPath} />

        {list.length > 0 &&
          list.map((meal) => {
            const description = meal.description?.trim().split("\n") || [];
            const sides = meal.sides?.trim().split("\n") || [];

            return (
              <div
                key={meal.id}
                className="flex-1 flex items-center justify-between hover:bg-blue-100/40 duration-150 px-6 py-4"
              >
                <div className="flex-1">
                  <span className="text-sm text-gray-500">
                    {meal.meal_type}
                  </span>
                  <p>
                    {description.map((line, index) => (
                      <React.Fragment key={index}>
                        {line && (
                          <>
                            {line[0]?.toUpperCase() +
                              line.substring(1).toLowerCase()}
                            <br />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  <p className="text-xs text-gray-400">
                    {sides.map((line, index) => {
                      if (line && index <= 1) {
                        return (
                          <React.Fragment key={index}>
                            {index === 0
                              ? sides.length === 1
                                ? line
                                : `${line}, `
                              : line?.toLowerCase()}
                          </React.Fragment>
                        );
                      }
                    })}
                  </p>
                </div>

                <MealOptions
                  meal={meal}
                  setIsChangingPath={setIsChangingPath}
                  onDelete={onDelete}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
