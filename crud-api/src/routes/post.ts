import { IncomingMessage } from 'http';
import { IUser } from "../models/users.model";
import { v4 as uuid } from "uuid";
import { usersData } from "../db/usersData";
import getFormattedResponse from "../utils/getFormattedResponse";

export default async function post(req: IncomingMessage, { username, age, hobbies }: IUser) {
  const endpoint = req.url;
  const userData = { username, age, hobbies };
  if (endpoint === '/api/users') {
    if (!checkDataTypes(userData)) {
      return await getFormattedResponse("Unprocessable Entity", 422);
    } else if (username && age && hobbies) {
      let user = await createUser(userData);
      return await getFormattedResponse(user, 201);
    } else {
      return await getFormattedResponse(
        "request body does not contain required fields",
        400
      );
    }
  } else {
    return await getFormattedResponse("Page is not found", 404);
  }
}

async function createUser(userData: IUser) {
  const user = { id: uuid(), ...userData };
  usersData.users.push(user);
  return user;
}

function checkDataTypes(userData: IUser) {
  const isAgeNumber = Number.isInteger(userData.age);
  const isHobbiesArray = Array.isArray(userData.hobbies);
  const isNameString = typeof userData.username === "string";
  return isAgeNumber && isHobbiesArray && isNameString;
}
