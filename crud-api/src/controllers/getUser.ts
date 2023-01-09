import { validate } from "uuid";
import getFormattedResponse from "../utils/getFormattedResponse";
import getUserById from "../utils/getUserById";

export default async function getUser(userId: string) {
  const user = await getUserById(userId);
  if (!validate(userId)) {
    return await getFormattedResponse("Invalid user's id", 400);
  } else if (!user) {
    return await getFormattedResponse("User was not found", 404);
  } else {
    return await getFormattedResponse(user, 200);
  }
}
