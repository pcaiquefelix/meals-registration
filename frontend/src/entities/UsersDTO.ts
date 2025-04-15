class UsersDTO {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;

  constructor(
    id: number,
    name: string,
    email: string,
    role: string,
    password?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  static initializeArray(list: UsersDTO[] = []) {
    return list;
  }
}

export { UsersDTO };
