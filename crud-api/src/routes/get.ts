import getUsers from '../controllers/getUsers';

export default async function get() {
  return await getUsers();
}
