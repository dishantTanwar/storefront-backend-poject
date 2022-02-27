import client from "../database";

// - Index [token required]: `'/users' [GET]`
// - Show [token required]: `'/users/:userid' [GET]`
// - Create [token required]: `'/users' [POST]`

export type UserType = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

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

  async create(user: UserType): Promise<UserType> {
    try {
      const sql = `INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      console.log(`Could not CREATE user. ${err}`);
      throw new Error(`Could not CREATE user. ${err}`);
    }
  }
}
