import { usersData } from "../db/usersData";
import { IUser } from "../models/users.model";

export default async function getUserById(
  userId: string
): Promise<IUser | undefined> {
  return usersData.users?.find((user: IUser) => user.id === userId);
}
