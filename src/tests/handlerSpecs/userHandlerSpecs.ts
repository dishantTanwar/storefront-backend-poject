import supertest from "supertest";
import app from "../../server";
import { clearTestSuit, initTestSuite } from "../testUtils";

const request = supertest(app);

describe("Test userRotues endpoints", () => {
  beforeAll(async () => {
    await initTestSuite();
  });

  afterAll(async () => await clearTestSuit());

  it("Test POST /users ", async (done) => {
    try {
      const response = await request.post("/users").send({
        firstname: "test_fname",
        lastname: "test_lname",
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
      const response = await request.get("/users");
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });

  it("Test GET /users/:useid", async (done) => {
    try {
      const response = await request.get("/users/1");
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });
});
