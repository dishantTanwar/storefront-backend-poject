import supertest from "supertest";
import app from "../../server";
import {
  clearTestSuit,
  fillTestSuit,
  getAuthToken,
  initTestSuite
} from "../testUtils";

const request = supertest(app);

describe("Test userRotues endpoints", () => {
  let authToken: string;
  beforeAll(async () => {
    try {
      await initTestSuite();
      await fillTestSuit();
    } catch (error) {
      console.log(error);
    }

    authToken = await getAuthToken();
  });

  afterAll(async () => await clearTestSuit());

  it("Test POST /users", async (done) => {
    try {
      const response = await request.post("/users").send({
        firstname: "test_fname",
        lastname: "test_lname",
        username: "test_username2",
        password: "test_password"
      });

      expect(response.status).toBe(200);
      done();
    } catch (err) {
      done.fail();
    }
  });

  it("Test GET /users", async (done) => {
    try {
      const response = await request
        .get("/users")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });

  it("Test GET /users/:userid", async (done) => {
    try {
      const response = await request
        .get("/users/1")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });
});
