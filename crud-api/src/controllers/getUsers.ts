import cluster from "cluster";
import { IUsers } from "../models/users.model";
import getAllUsers from "../utils/getAllUsers";
import getFormattedResponse from "../utils/getFormattedResponse";

export default async function getUsers() {
  const users = (await getAllUsers()) as IUsers;
  if (cluster.isWorker) {
    process.send!({ method: "getUsers", pid: process.pid });
    process.on("message", ({ users: allUsers }) => {
      return getFormattedResponse(allUsers.users, 200);
    });
  }
  return getFormattedResponse(users, 200);
}
