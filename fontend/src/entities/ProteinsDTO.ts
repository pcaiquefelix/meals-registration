class ProteinsDTO {
  id: number;
  name: string;
  monthly_incidence: number;

  constructor(id: number, name: string, monthly_incidence: number) {
    this.id = id;
    this.name = name;
    this.monthly_incidence = monthly_incidence;
  }

  static initializeArray(list: ProteinsDTO[] = []) {
    return list;
  }
}

export { ProteinsDTO };
