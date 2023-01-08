import getFormattedResponse from "../utils/getFormattedResponse";
import getUserById from "../utils/getUserById";

export default async function getUser(userId: string | number) {
  const user = await getUserById(userId);
  if (!userId) {
    return getFormattedResponse("User was not found", 400);
  }
}
