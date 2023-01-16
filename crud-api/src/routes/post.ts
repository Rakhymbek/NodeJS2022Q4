import { ErrorMessages } from "./../constants";
import { IncomingMessage } from "http";
import { IUser } from "../models/users.model";
import { v4 as uuid } from "uuid";
import { usersData } from "../db/usersData";
import getFormattedResponse from "../utils/getFormattedResponse";
import cluster from "cluster";

export default async function post(
  req: IncomingMessage,
  { username, age, hobbies }: IUser
) {
  const endpoint = req.url;
  const userData = { username, age, hobbies };
  if (endpoint === "/api/users") {
    if (!checkDataTypes(userData)) {
      return await getFormattedResponse(ErrorMessages.INVALID_DATA_TYPE, 422);
    } else if (username && age && hobbies) {
      let user = await createUser(userData);
      if (cluster.isWorker) {
        process.send!({ method: "addUser", pid: process.pid, user });
      }
      return await getFormattedResponse(user, 201);
    } else {
      return await getFormattedResponse(ErrorMessages.INVALID_BODY, 400);
    }
  } else {
    return await getFormattedResponse(ErrorMessages.INVALID_ROUTE, 404);
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
