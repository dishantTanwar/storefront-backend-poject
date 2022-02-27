import { Application, Request, Response } from "express";
import { User, UserType } from "../models/user";

const user = new User();

const create = async (_req: Request, res: Response) => {
  try {
    const userData: UserType = {
      firstname: _req.body.firstname,
      lastname: _req.body.lastname,
      password: _req.body.password,
    };

    const result = await user.create(userData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const result = await user.index();
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const id = _req.params.id;
    const result = await user.show(id);
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const userRoutes = (app: Application): void => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
};

export default userRoutes;
