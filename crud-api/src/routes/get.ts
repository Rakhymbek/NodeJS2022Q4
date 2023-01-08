import getUser from "../controllers/getUser";
import getUsers from "../controllers/getUsers";

export default async function get(userId: string | number) {
  // if (userId) {
  //   return await getUser(userId);
  // }
  return await getUsers();
}
