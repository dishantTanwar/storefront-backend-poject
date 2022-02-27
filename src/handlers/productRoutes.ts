import { Application, Request, Response } from "express";
import { Product, ProductType } from "../models/product";

const product = new Product();
const create = async (_req: Request, res: Response) => {
  try {
    const productData: ProductType = {
      name: _req.body.name,
      price: _req.body.price,
    };
    const result = await product.create(productData);
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const result = await product.index();
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const result = await product.show(_req.params.productId);
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const productRoutes = (app: Application): void => {
  app.get("/products", index);
  app.get("/products/:productId", show);
  app.post("/products", create);
};

export default productRoutes;
