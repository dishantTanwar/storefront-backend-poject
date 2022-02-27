import supertest from "supertest";
import app from "../../server";
import { clearTestSuit, initTestSuite } from "../testUtils";

const request = supertest(app);

describe("Test productRotues endpoints", () => {
  beforeAll(async () => {
    await initTestSuite();
  });

  afterAll(async () => await clearTestSuit());

  it("Test Add: POST /products ", async (done) => {
    try {
      const response = await request.post("/products").send({
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
