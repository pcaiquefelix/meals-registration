"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import CustomLoader from "@/components/common/CustomLoader";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { weekDays } from "@/components/config/calendarNames";
import Meal from "@/components/meals/Meal";

const CurrentWeekRecordedMenus = ({
  meals,
  mainTitle,
  updateMeals,
  isLoading,
}) => {
  const [currentWeekMenu, setCurrentWeekMenu] = useState({});

  useEffect(() => {
    const currentWeekMenuUpdate =
      meals.length &&
      meals.reduce((listAccumulator, currentMeal) => {
        const day = weekDays[new Date(currentMeal.day_of_week).getDay()];
        if (!listAccumulator[day]) {
          return {
            ...listAccumulator,
            [day]: [{ ...currentMeal }],
          };
        }

        listAccumulator[day].push({ ...currentMeal });
        return listAccumulator;
      }, {});
    setCurrentWeekMenu({ ...currentWeekMenuUpdate });
  }, [meals]);

  return (
    <>
      {/* Weekly Menu Preview */}
      <ContentWrapper>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Calendar className="mr-3 text-blue-600" />
          {mainTitle}
        </h2>

        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {Object.entries(currentWeekMenu).map(([dayName, list], index) => {
              const date = new Date(list[0]?.day_of_week);

              return (
                <Meal
                  key={dayName}
                  dayName={dayName}
                  list={list}
                  mealIndex={index}
                  mealDate={date}
                  updateList={updateMeals}
                />
              );
            })}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default CurrentWeekRecordedMenus;
