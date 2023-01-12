import { IncomingMessage } from 'http';
import { ErrorMessages } from '../constants';
import getUser from "../controllers/getUser";
import getUsers from "../controllers/getUsers";
import getFormattedResponse from '../utils/getFormattedResponse';

export default async function get(req: IncomingMessage, userId: string) {
  const endpoint = req.url;

  if (endpoint === '/api/users') {
    return await getUsers();
  } else if (userId) {
    return await getUser(userId);
  } else {
    return await getFormattedResponse(ErrorMessages.INVALID_ROUTE, 404);
  }
}
