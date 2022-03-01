import { Application, Request, Response } from "express";
import { Auth } from "../auth";
import { User, UserType } from "../models/user";

const user = new User();
const auth = new Auth();
const create = async (_req: Request, res: Response) => {
  try {
    const userData: UserType = {
      firstname: _req.body.firstname,
      lastname: _req.body.lastname,
      username: _req.body.username,
      password: _req.body.password
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

const authenticate = async (_req: Request, res: Response) => {
  try {
    const isAuth = await auth.authenticate(
      _req.body.username,
      _req.body.password
    );

    if (isAuth) {
      const userId = await user.getUserIdForUsername(_req.body.username);
      res.status(200);
      res.json({
        jwt: await auth.generateToken({
          user_id: userId,
          username: _req.body.username
        }),
        message: "Success: user is authenticated"
      });
    } else {
      res.status(401);
      res.json({
        message: "incorrect credentials"
      });
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const userRoutes = (app: Application): void => {
  app.get("/users", auth.verifyAuthToken, index);
  app.post("/users/authenticate", authenticate);
  app.get("/users/:id", auth.verifyAuthToken, show);
  app.post("/users", create);
};

export default userRoutes;
