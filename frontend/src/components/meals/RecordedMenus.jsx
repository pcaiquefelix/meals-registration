"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import CustomLoader from "@/components/common/CustomLoader";
import ContentWrapper from "@/components/layout/ContentWrapper";
import CustomPageLoader from "@/components/common/CustomPageLoader";
import { weekDays } from "@/components/config/calendarNames";
import sortByMealType from "@/components/config/functions/sortByMealType";
import Meal from "@/components/meals/Meal";

const RecordedMenus = ({ meals, mainTitle }) => {
  const [currentWeekMenu, setCurrentWeekMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChangingPath, setIsChangingPath] = useState(false);
  const [isPreviousWeekButtonDisabled, setIsPreviousWeekButtonDisabled] =
    useState(false);
  const [isNextWeekButtonDisabled, setIsNextWeekButtonDisabled] =
    useState(false);
  const [selectedWeekDate, setSelectedWeekDate] = useState(null);
  const [sortedMeals, setSortedMeals] = useState([]);
  const weekDaysLimits = selectedWeekDate
    ? {
        firstWeekDay: (() => {
          const firstWeekDayUpdate = new Date(selectedWeekDate);
          while (firstWeekDayUpdate.getDay() > 0) {
            firstWeekDayUpdate.setDate(firstWeekDayUpdate.getDate() - 1);
          }
          firstWeekDayUpdate.setHours(0, 0, 0, 0);
          return firstWeekDayUpdate;
        })(),
        lastWeekDay: (() => {
          const lastWeekDayUpdate = new Date(selectedWeekDate);
          while (lastWeekDayUpdate.getDay() < 6) {
            lastWeekDayUpdate.setDate(lastWeekDayUpdate.getDate() + 1);
          }
          lastWeekDayUpdate.setHours(23, 59, 59, 999);
          return lastWeekDayUpdate;
        })(),
      }
    : {};

  useEffect(() => {
    const firstMealDate = new Date(
      meals[0]?.day_of_week.substring(0, meals[0].day_of_week.length - 2)
    );
    const sortedMealsUpdate = meals.length ? sortByMealType(meals) : [];

    setSortedMeals(sortedMealsUpdate);
    setSelectedWeekDate(new Date(firstMealDate));
  }, [meals]);

  useEffect(() => {
    mealsUpdate(sortedMeals);
    setLoading(false);
  }, [selectedWeekDate]);

  const mealsUpdate = (mealsList) => {
    const currentWeekMenuUpdate =
      mealsList.length &&
      mealsList.reduce((listAccumulator, currentMeal) => {
        const currentMealDate = new Date(currentMeal.day_of_week);
        const day = weekDays[currentMealDate.getDay()];
        if (
          Object.keys(weekDaysLimits) &&
          currentMealDate > weekDaysLimits.firstWeekDay &&
          currentMealDate < weekDaysLimits.lastWeekDay
        ) {
          if (!listAccumulator[day]) {
            return {
              ...listAccumulator,
              [day]: [currentMeal],
            };
          }

          listAccumulator[day].push(currentMeal);
        }
        return listAccumulator;
      }, {});

    const currentMealDays = Object.keys(currentWeekMenuUpdate);
    const currentFirstWeekDay = currentWeekMenuUpdate[currentMealDays[0]];
    const currentLastWeekDay =
      currentWeekMenuUpdate[currentMealDays[currentMealDays.length - 1]];

    setCurrentWeekMenu({ ...currentWeekMenuUpdate });
    setIsPreviousWeekButtonDisabled(
      currentFirstWeekDay ? currentFirstWeekDay[0] === mealsList[0] : true
    );
    setIsNextWeekButtonDisabled(
      currentLastWeekDay
        ? currentLastWeekDay[currentLastWeekDay.length - 1] ===
            mealsList[mealsList.length - 1]
        : true
    );
  };

  const handlePrevWeek = () => {
    const currentMealDays = Object.keys(currentWeekMenu);
    const currentFirstWeekDay = currentWeekMenu[currentMealDays[0]];
    const currentFirstMeal =
      sortedMeals[sortedMeals.indexOf(currentFirstWeekDay[0]) - 1];
    const mealDate = new Date(
      currentFirstMeal.day_of_week.substring(0, meals[0].day_of_week.length - 2)
    );

    setSelectedWeekDate(mealDate);
  };

  const handleNextWeek = () => {
    const currentMealDays = Object.keys(currentWeekMenu);
    const currentLastWeekDay =
      currentWeekMenu[currentMealDays[currentMealDays.length - 1]];
    const currentLastMeal =
      sortedMeals[
        sortedMeals.indexOf(currentLastWeekDay[currentLastWeekDay.length - 1]) +
          1
      ];
    const mealDate = new Date(
      currentLastMeal.day_of_week.substring(0, meals[0].day_of_week.length - 2)
    );

    setSelectedWeekDate(mealDate);
  };

  const updateList = (updatedMeal) => {
    const sortedMealsUpdate = sortedMeals.filter(
      (meal) => meal.id !== updatedMeal.id
    );
    const currentWeekDays = Object.keys(currentWeekMenu);
    setSortedMeals(sortedMealsUpdate);
    if (
      currentWeekDays.length === 1 &&
      currentWeekMenu[currentWeekDays[0]].length === 1
    ) {
      const sortedMealsUpdatedMealIndex = sortedMeals.findIndex(
        (meal) => meal.id === updatedMeal.id
      );
      if (sortedMealsUpdatedMealIndex) {
        return handlePrevWeek();
      } else if (
        sortedMealsUpdatedMealIndex === 0 &&
        sortedMeals[sortedMealsUpdatedMealIndex + 1]
      ) {
        return handleNextWeek();
      }
    }

    mealsUpdate(sortedMealsUpdate);
  };

  return (
    <>
      {/* Weekly Menu Preview */}
      <ContentWrapper
        title={mainTitle}
        titleIcon={<Calendar className="mr-3 text-blue-600" />}
        contentClassName="h-[30rem] overflow-x-auto"
        buttonHtmlContent={
          <div className="flex justify-between mt-4 pt-4 border-t">
            <div className="flex items-center">
              <button
                onClick={handlePrevWeek}
                disabled={isPreviousWeekButtonDisabled}
                className="p-2 mr-2 rounded-lg border enabled:hover:bg-blue-100 enabled:hover:text-blue-600 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              Previous Week
            </div>
            <div className="flex items-center">
              Next Week
              <button
                onClick={handleNextWeek}
                disabled={isNextWeekButtonDisabled}
                className="p-2 ml-2 rounded-lg border enabled:hover:bg-blue-100 enabled:hover:text-blue-600 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        }
      >
        <CustomPageLoader loading={isChangingPath} />

        {loading ? (
          <CustomLoader />
        ) : (
          <>
            {sortedMeals.length === 0 ? (
              <div className="h-full flex justify-center items-center">
                <p className="text-red-400/70 text-2xl">
                  No meals registered for the selected period.
                </p>
              </div>
            ) : (
              Object.entries(currentWeekMenu).map(([dayName, list], index) => {
                const date = new Date(list[0].day_of_week);

                return (
                  <Meal
                    setIsChangingPath={setIsChangingPath}
                    dayName={dayName}
                    list={list}
                    mealIndex={index}
                    mealDate={date}
                    updateList={updateList}
                    key={dayName}
                  />
                );
              })
            )}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default RecordedMenus;
