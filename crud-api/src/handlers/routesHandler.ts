import { IncomingMessage } from "http";
import { IResponse } from "../models/response.model";
import { IUser } from "../models/users.model";
import get from "../routes/get";
import post from "../routes/post";
import put from "../routes/put";
import getFormattedResponse from "../utils/getFormattedResponse";
import parseData from "../utils/parseData";

export default async function routesHandler(
  req: IncomingMessage
): Promise<IResponse | undefined> {
  const endpoint = req.url?.split("/").slice(1, 3).join("/");
  const userId = req.url?.split("/")[3]!;
  let userData;

  if (endpoint === "api/users") {
    switch (req.method) {
      case "GET":
        return await get(userId);
      case "POST":
        userData = (await parseData(req)) as IUser;
        return await post(userData);
      case "PUT":
        userData = (await parseData(req)) as IUser;
        return await put(userId, userData);
    }
  } else {
    return await getFormattedResponse("The page is not found", 404);
  }
}
