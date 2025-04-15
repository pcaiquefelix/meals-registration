import { MealsDTO } from "@/entities/MealsDTO";

const mealTypesHours = {
  supper: 2,
  lunch: 11,
  dinner: 19,
};

export default function sortByMealType(meals: MealsDTO[]): MealsDTO[] {
  const sortedMeals = [...meals];
  const mealTypes = Object.keys(mealTypesHours).sort(
    (a, b) => mealTypesHours[a] - mealTypesHours[b]
  );
  sortedMeals.sort((next, current) => {
    const dateNext = new Date(next.day_of_week).setHours(0, 0, 0, 0);
    const dateCurrent = new Date(current.day_of_week).setHours(0, 0, 0, 0);
    if (dateNext > dateCurrent) {
      return 1;
    } else if (dateNext < dateCurrent) {
      return -1;
    }
    return (
      mealTypes.indexOf(next.meal_type.toLowerCase()) -
      mealTypes.indexOf(current.meal_type.toLowerCase())
    );
  });
  return sortedMeals;
}
