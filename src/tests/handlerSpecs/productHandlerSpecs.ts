import supertest from "supertest";
import app from "../../server";
import {
  clearTestSuit,
  fillTestSuit,
  getAuthToken,
  initTestSuite
} from "../testUtils";

const request = supertest(app);

describe("Test productRotues endpoints", () => {
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

  it("Test Add: POST /products ", async (done) => {
    try {
      const response = await request
        .post("/products")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "tea cup",
          price: "350"
        });
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      done.fail();
    }
  });

  it("Test Index: GET /products", async (done) => {
    try {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });

  it("Test Show: GET /products/:productId", async (done) => {
    try {
      const response = await request.get("/products/1");
      expect(response.status).toBe(200);
      done();
    } catch (error) {
      done.fail();
    }
  });
});
