export interface IUsers {
  users: IUser[];
}

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}
