import { IncomingMessage } from "http";
import { IResponse } from "../models/response.model";
import { IUser } from "../models/users.model";
import deleteUser from "../routes/delete";
import get from "../routes/get";
import post from "../routes/post";
import put from "../routes/put";
import getFormattedResponse from "../utils/getFormattedResponse";
import parseData from "../utils/parseData";

export default async function routesHandler(
  req: IncomingMessage
): Promise<IResponse | undefined> {
  const userId = req.url?.split("/")[3]!;
  let userData;

  try {
    switch (req.method) {
      case "GET":
        return await get(req, userId);
      case "POST":
        userData = (await parseData(req)) as IUser;
        return await post(req, userData);
      case "PUT":
        userData = (await parseData(req)) as IUser;
        return await put(userId, userData);
      case "DELETE":
        return await deleteUser(userId);
      default:
        return await getFormattedResponse("Method Not Allowed", 405);
    }
  } catch (error) {
    return await getFormattedResponse("Internal Server Error", 500);
  }


}
