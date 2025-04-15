import { ProteinsDTO } from "./ProteinsDTO";

class MealsDTO {
  id: number;
  day_of_week: Date;
  meal_type: "Supper" | "Lunch" | "Dinner";
  protein1?: ProteinsDTO;
  protein2?: ProteinsDTO;
  description?: string;
  sides?: string;
  salads?: string;
  desserts?: string;

  constructor(
    id: number,
    day_of_week: Date,
    meal_type: "Supper" | "Lunch" | "Dinner",
    protein1?: ProteinsDTO,
    protein2?: ProteinsDTO,
    description?: string,
    sides?: string,
    salads?: string,
    desserts?: string
  ) {
    this.id = id;
    this.day_of_week = day_of_week;
    this.meal_type = meal_type;
    this.protein1 = protein1;
    this.protein2 = protein2;
    this.description = description;
    this.sides = sides;
    this.salads = salads;
    this.desserts = desserts;
  }

  static initializeArray(list: MealsDTO[] = []) {
    return list;
  }
}

export { MealsDTO };
