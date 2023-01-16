import { RequestMethods } from './../constants';
import { IncomingMessage } from "http";
import { ErrorMessages } from "../constants";
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
      case RequestMethods.GET:
        return await get(req, userId);
      case RequestMethods.POST:
        userData = (await parseData(req)) as IUser;
        return await post(req, userData);
      case RequestMethods.PUT:
        userData = (await parseData(req)) as IUser;
        return await put(userId, userData);
      case RequestMethods.DELETE:
        return await deleteUser(userId);
      default:
        return await getFormattedResponse(ErrorMessages.NOT_ALLOWED, 405);
    }
  } catch (error) {
    return await getFormattedResponse(ErrorMessages.SERVER_ERROR, 500);
  }


}
