import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Auth } from "../auth";
import client from "../database";

export type UserType = {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
};

dotenv.config();
const PEPPER = process.env.PEPPER;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string);

export class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect();
      const result = await conn.query(`SELECT * FROM users`);

      return result.rows;
    } catch (err) {
      console.log(`Could not GET users: ${err}`);
      throw new Error(`Could not GET users: ${err}`);
    }
  }

  async show(id: string): Promise<UserType> {
    try {
      const SQL = `SELECT * FROM users WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(`Could not GET user with id: ${id}. ${err}`);
      throw new Error(`Could not GET user with id: ${id}. ${err}`);
    }
  }

  async getUserIdForUsername(username: string): Promise<number> {
    try {
      const SQL = `SELECT id FROM users WHERE username=($1)`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [username]);
      conn.release();
      return result.rows[0].id;
    } catch (err) {
      console.log(`Could not GET user with usename: ${username}. ${err}`);
      throw new Error(`Could not GET user with id: ${username}. ${err}`);
    }
  }

  async create(user: UserType): Promise<string> {
    try {
      const sql = `INSERT INTO users(firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *`;
      const conn = await client.connect();
      const passwordHash = await bcrypt.hash(
        (user.password as string) + PEPPER,
        SALT_ROUNDS
      );
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        passwordHash
      ]);
      conn.release();

      user = result.rows[0];
      const auth = new Auth();
      const jwtToken: string = await auth.generateToken({
        user_id: parseInt(user.id as string),
        username: user.username
      });

      return jwtToken;
    } catch (err) {
      console.log(`Could not CREATE user. ${err}`);
      throw new Error(`Could not CREATE user. ${err}`);
    }
  }
}
