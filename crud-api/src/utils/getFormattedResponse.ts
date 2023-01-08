import { IUsers } from "../models/users.model";

export default async function getFormattedResponse(
  users: IUsers,
  statusCode: number
) {
  const data = {
    headers: { "Content-Type": "application/json" },
    statusCode,
    body: JSON.stringify(users),
  };
  return data;
}
