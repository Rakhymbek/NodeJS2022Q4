import { validate } from "uuid";
import { usersData } from "../db/usersData";
import { IUser } from "../models/users.model";
import getFormattedResponse from "../utils/getFormattedResponse";
import getUserById from "../utils/getUserById";

export default async function put(
  userId: string,
  { username, age, hobbies }: IUser
) {
  const existedUser = await getUserById(userId);
  const userData = {
    id: userId,
    username,
    age,
    hobbies,
  };
  if (!validate(userId)) {
    return await getFormattedResponse("Invalid user's id", 400);
  } else if (!existedUser) {
    return await getFormattedResponse("User was not found", 404);
  } else {
    const updatedUser = await updateUser(userData);
    return await getFormattedResponse(updatedUser, 200);
  }
}

async function updateUser(userData: IUser) {
  usersData.users = usersData.users.map((user) =>
    user.id === userData.id ? { ...userData } : user
  );
  return { ...userData };
}
