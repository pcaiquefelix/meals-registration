import { MealsDTO } from "@/entities/MealsDTO";

interface WeekMenu {
  Sunday?: MealsDTO[];
  Monday?: MealsDTO[];
  Tuesday?: MealsDTO[];
  Wednesday?: MealsDTO[];
  Thursday?: MealsDTO[];
  Friday?: MealsDTO[];
  Saturday?: MealsDTO[];
}

export default function updateMealsListOnDelete(
  deletedMeal: MealsDTO,
  weekMenu: WeekMenu,
  mealDay: keyof WeekMenu
): WeekMenu {
  const dayMenuUpdate = weekMenu[mealDay]?.filter(
    (meal: MealsDTO) => meal.id !== deletedMeal.id
  );
  const currentWeekMenuUpdate = {
    ...weekMenu,
    [mealDay]: dayMenuUpdate,
  };
  if (!dayMenuUpdate?.length) delete currentWeekMenuUpdate[mealDay];

  return currentWeekMenuUpdate;
}
