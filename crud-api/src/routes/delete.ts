import { IUser } from "./../models/users.model";
import { validate } from "uuid";
import { usersData } from "../db/usersData";
import getFormattedResponse from "../utils/getFormattedResponse";
import getUserById from "../utils/getUserById";

export default async function deleteUser(userId: string) {
  const user = await getUserById(userId);

  if (!validate(userId)) {
    return await getFormattedResponse("Invalid user's id", 400);
  } else if (!user) {
    return await getFormattedResponse("User was not found", 404);
  } else {
    await deleteUserById(userId);
    return await getFormattedResponse(`${user.username} was successfully deleted`, 204); // A 204 ( No Content ) no further information is to be supplied. You won't receive any messages!
  }
}

async function deleteUserById(userId: string) {
  usersData.users = usersData.users.filter((user) => user.id !== userId);
}
