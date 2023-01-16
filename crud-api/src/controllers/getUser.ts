import { ErrorMessages } from './../constants';
import { validate } from "uuid";
import getFormattedResponse from "../utils/getFormattedResponse";
import getUserById from "../utils/getUserById";

export default async function getUser(userId: string) {
  const user = await getUserById(userId);
  if (!validate(userId)) {
    return await getFormattedResponse(ErrorMessages.INVALID_ID, 400);
  } else if (!user) {
    return await getFormattedResponse(ErrorMessages.NO_USER, 404);
  } else {
    return await getFormattedResponse(user, 200);
  }
}
