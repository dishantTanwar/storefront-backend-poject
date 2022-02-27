import { Application, Request, Response } from "express";
import { Order, OrderType } from "../models/order";

const order = new Order();
const create = async (_req: Request, res: Response) => {
  try {
    const orderData: OrderType = {
      product_id: _req.body.product_id,
      user_id: _req.body.user_id,
      quantity: parseInt(_req.body.quantity),
      status: _req.body.status
    };

    const result = await order.create(orderData);
    res.status(200);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
};

const getActiveOrders = async (_req: Request, res: Response) => {
  try {
    const result = await order.getActiveOrders(_req.params.userId);
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const result = await order.index();
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const orderRoutes = (app: Application) => {
  app.get("/orders", index);
  app.get("/orders/:userId", getActiveOrders);
  app.post("/orders/", create);
};

export default orderRoutes;
