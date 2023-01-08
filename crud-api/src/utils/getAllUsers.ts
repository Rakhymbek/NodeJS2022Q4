import { usersData } from "../db/usersData";

export default async function getAllUsers() {
  return new Promise((res) => {
    res(usersData.users);
  });
}
