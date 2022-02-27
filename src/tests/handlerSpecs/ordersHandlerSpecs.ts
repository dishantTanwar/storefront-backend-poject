import supertest from "supertest";
import app from "../../server";
import { clearTestSuit, fillTestSuit, initTestSuite } from "../testUtils";

const request = supertest(app);

describe("Test ordersRotues endpoints", () => {
  beforeAll(async () => {
    await initTestSuite();
    await fillTestSuit();
  });
  afterAll(async () => await clearTestSuit());
  const req = {
    quantity: 10,
    status: "active",
    user_id: "1",
    product_id: "1"
  };
  it("Test Add: POST /orders ", async (done) => {
    try {
      const response = await request.post("/orders").send(req);
      expect(response.status).toBe(200);
      //   expect(response.body).toEqual({ id: "1", ...req });
      done();
    } catch (err) {
      done.fail();
    }
  });

  it("Test Index: GET /orders", async (done) => {
    try {
      const response = await request.get("/orders");
      expect(response.status).toBe(200);
      //   expect(response.body).toEqual([{ id: "1", ...req }]);

      done();
    } catch (error) {
      done.fail();
    }
  });

  it("Test Show: GET /orders/:orderId", async (done) => {
    try {
      const response = await request.get("/orders/1");
      expect(response.status).toBe(200);
      //   expect(response.body).toEqual({ id: "1", ...req });

      done();
    } catch (error) {
      done.fail();
    }
  });
});
