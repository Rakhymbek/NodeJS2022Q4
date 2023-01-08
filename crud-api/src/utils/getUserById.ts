import { usersData } from "../db/usersData";
import { IUser } from "../models/users.model";

export default async function getUserById(
  userId: string | number
): Promise<IUser | undefined> {
  return new Promise<IUser>((res) => {
    const user = usersData.users?.find((user: IUser) => user.id === userId);
    res(user as IUser);
  });
}
