import supertest from "supertest";
import app from "../../server";
import {
  clearTestSuit,
  fillTestSuit,
  getAuthToken,
  initTestSuite
} from "../testUtils";

const request = supertest(app);

describe("Test ordersRotues endpoints", () => {
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

  const req = {
    quantity: 10,
    status: "active",
    user_id: "1",
    product_id: "1"
  };

  it("Test Add: POST /orders/:userId ", async (done) => {
    try {
      const response = await request
        .post("/orders/1")
        .set("Authorization", `Bearer ${authToken}`)
        .send(req);
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
      const response = await request
        .get("/orders/1")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      //   expect(response.body).toEqual({ id: "1", ...req });

      done();
    } catch (error) {
      done.fail();
    }
  });
});
