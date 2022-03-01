import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "./database";

export type AuthTokenType = {
  user_id: number;
  username: string;
};
export class Auth {
  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const SQL = `SELECT password FROM users WHERE username = $1`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [username]);
      const saved_password = result.rows[0].password;
      conn.release();

      if (saved_password) {
        if (
          await bcrypt.compare(password + process.env.PEPPER, saved_password)
        ) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.log(error);
      throw new Error(`Could not authenticate. ${error}`);
    }
  }

  async generateToken(user: AuthTokenType): Promise<string> {
    try {
      return jwt.sign({ user }, process.env.JWT_SECRET as string);
    } catch (error) {
      console.log(error);
      throw new Error(`Could not generate Token ${error}`);
    }
  }

  async verifyAuthToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization as string;
      if (!authHeader) {
        throw new Error("authentication header required");
      }
      const authToken = authHeader.split(" ")[1];
      const decoded: JwtPayload = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      res.locals.username = decoded.user.username;
      res.locals.userId = decoded.user.user_id;

      next();
    } catch (error) {
      res.status(401);
      res.json(error);
    }
  }

  async isAuthorized(_req: Request, res: Response, next: NextFunction) {
    try {
      const authTokenUserId = res.locals.userId;
      if (_req.params.userId != authTokenUserId) {
        throw new Error("Not Authorized: use your own token");
      }

      next();
    } catch (error) {
      res.status(403);
      res.json(error);
    }
  }
}
