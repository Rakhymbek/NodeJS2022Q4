import request from "supertest"
import { server } from ".."

describe("Simple-crud-api tests", () => {
  it("GET-request should return an empty array", async () => {
    await request(server).get("/api/users").expect([])
  })
})