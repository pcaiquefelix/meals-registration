"use client";

import { useState, useEffect } from "react";
import { weekDays } from "@/components/config/calendarNames";
import PageContent from "./PageContent";
import CurrentWeekRecordedMenus from "@/components/meals/CurrentWeekRecordedMenus";
import { NextApiHandler } from "@/services/NextApiHandler";

const MealsManager = () => {
  const [meals, setMeals] = useState([]);
  const [nextMeal, setNextMeal] = useState(null);
  const [currentMealType, setCurrentMealType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const timeNow = new Date();
      try {
        const mealsData = await NextApiHandler.get(
          `api/meals/get-week-meals/${timeNow}`
        );

        if (mealsData instanceof Error) {
          console.error("Captured error:");
          console.error(`Name: ${mealsData.name}`);
          console.error(`Message: ${mealsData.message}`);
          console.error(`Stack trace: ${mealsData.stack}`);
          return;
        }

        setMeals(mealsData);

        const mealTypesHours = {
          supper: 2,
          lunch: 11,
          dinner: 19,
        };
        const isTimeAfterLastMealTypeHour =
          timeNow.getHours() >
          Object.values(mealTypesHours).sort((a, b) => b - a)[0];

        const currentMealType = isTimeAfterLastMealTypeHour
          ? Object.entries(mealTypesHours).sort((a, b) => a[1] - b[1])[0][0]
          : Object.entries(mealTypesHours).reduce((result, [type, hour]) => {
              const hourCalc = timeNow.getHours() - hour;
              if (hourCalc <= 0) {
                const response = [];
                if (result.length) {
                  result[1] < hourCalc
                    ? response.push(type, hourCalc)
                    : result.forEach((value) => response.push(value));
                } else {
                  response.push(type, hourCalc);
                }
                return response;
              } else if (result) {
                return result;
              }
            }, [])[0];

        setCurrentMealType(currentMealType);

        if (mealsData.length) {
          mealsData.sort((next, current) => {
            const dateNext = new Date(next.day_of_week).setHours(0, 0, 0, 0);
            const dateCurrent = new Date(current.day_of_week).setHours(
              0,
              0,
              0,
              0
            );
            if (dateNext > dateCurrent) {
              return 1;
            } else if (dateNext < dateCurrent) {
              return -1;
            }
            const mealTypes = Object.keys(mealTypesHours).sort(
              (a, b) => mealTypesHours[a] - mealTypesHours[b]
            );
            return (
              mealTypes.indexOf(next.meal_type) -
              mealTypes.indexOf(current.meal_type)
            );
          });

          const nextMeal = mealsData.reduce((mealAccumulator, currentMeal) => {
            const dayCurrentMeal = new Date(currentMeal.day_of_week);
            if (
              weekDays[dayCurrentMeal.getDay()] ===
                weekDays[
                  isTimeAfterLastMealTypeHour
                    ? timeNow.getDay() + 1
                    : timeNow.getDay()
                ] &&
              currentMealType === currentMeal.meal_type.toLowerCase()
            ) {
              return currentMeal;
            }
            return mealAccumulator;
          }, {});

          setNextMeal(nextMeal);
          console.log(currentMealType);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Captured error:");
          console.error(`Name: ${error.name}`);
          console.error(`Message: ${error.message}`);
          console.error(`Stack trace: ${error.stack}`);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };

    fetchMeals().then(() => setLoading(false));
  }, []);

  const updateMeals = (currentMeal) => {
    const mealsUpdate = meals.filter((meal) => meal.id !== currentMeal.id);
    setMeals(mealsUpdate);

    if (nextMeal && currentMeal.id === nextMeal.id) setNextMeal(null);
  };

  return (
    <section className="w-full flex flex-col">
      <PageContent
        nextMeal={nextMeal}
        currentMealType={currentMealType}
        updateMeals={updateMeals}
        isLoading={loading}
      />
      <CurrentWeekRecordedMenus
        meals={meals}
        mainTitle="Weekly Menu"
        updateMeals={updateMeals}
        isLoading={loading}
      />
    </section>
  );
};

export default MealsManager;
