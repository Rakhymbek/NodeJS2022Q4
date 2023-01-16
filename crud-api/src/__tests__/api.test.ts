import request from "supertest";
import { server } from "..";
import { ErrorMessages } from "../constants";

const mockUsersData = {
  username: "Potter",
  age: 50,
  hobbies: ["Magic"],
};

const mockUpdatedUsersData = {
  username: "Piter Parker",
  age: 33,
  hobbies: ["Big responsibilities"],
};

describe("Simple-crud-api tests", () => {
  it("GET-request should return an empty array", async () => {
    const response = await request(server).get("/api/users");
    await request(server).get("/api/users").expect([]);
    expect(response.statusCode).toBe(200);
  });

  it("POST-request should create a new user", async () => {
    await request(server)
      .post("/api/users")
      .send(mockUsersData)
      .then((res) => {
        expect(res.body.username).toBe(mockUsersData.username);
        expect(res.body.age).toBe(mockUsersData.age);
        expect(res.body.hobbies.toString()).toBe(
          mockUsersData.hobbies.toString()
        );
        expect(res.statusCode).toBe(201);
      });
  });

  it("GET-request should return created user by id", async () => {
    const user = await request(server).post("/api/users").send(mockUsersData);

    await request(server)
      .get(`/api/users/${user.body.id}`)
      .then((res) => {
        expect(res.body.username).toBe(mockUsersData.username);
        expect(res.body.age).toBe(mockUsersData.age);
        expect(res.body.hobbies.toString()).toBe(
          mockUsersData.hobbies.toString()
        );
        expect(res.statusCode).toBe(200);
      });
  });

  it("PUT-request should update user with the same id", async () => {
    const user = await request(server).post("/api/users").send(mockUsersData);
    const updatedUser = await request(server)
      .put(`/api/users/${user.body.id}`)
      .send(mockUpdatedUsersData);
    await request(server)
      .put(`/api/users/${user.body.id}`)
      .send(mockUpdatedUsersData)
      .then((res) => {
        expect(user.body.id).toBe(updatedUser.body.id);
        expect(res.body.username).toBe(updatedUser.body.username);
        expect(res.body.age).toBe(updatedUser.body.age);
        expect(res.body.hobbies.toString()).toBe(
          updatedUser.body.hobbies.toString()
        );
        expect(res.statusCode).toBe(200);
      });
  });

  it("DELETE-request should remove created user by id and return 204 status code", async () => {
    const user = await request(server).post("/api/users").send(mockUsersData);
    await request(server).delete(`/api/users/${user.body.id}`).expect(204);
  });

  it("GET-request should return 404 and error message if the route is incorrect", async () => {
    await request(server).get(`/api/user`).expect(404);
    await request(server)
      .get(`/api/user`)
      .then((res) => {
        expect(res.text.includes(ErrorMessages.INVALID_ROUTE));
      });
  });

  it("GET-request should return 404 and error message if the user was removed", async () => {
    const user = await request(server).post("/api/users").send(mockUsersData);
    await request(server).delete(`/api/users/${user.body.id}`).expect(204);
    await request(server)
      .get(`/api/users/${user.body.id}`)
      .then((res) => {
        expect(res.text.includes(ErrorMessages.NO_USER));
        expect(res.statusCode).toBe(404);
      });
  });
});
