import { IUsers } from "../models/users.model";
import getAllUsers from "../utils/getAllUsers";
import getFormattedResponse from "../utils/getFormattedResponse";

export default async function getUsers() {
  const users = (await getAllUsers()) as IUsers;
  return getFormattedResponse(users, 200);
}
