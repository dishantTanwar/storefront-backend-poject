import client from "../database";
import { Product, ProductType } from "./product";
import { User, UserType } from "./user";

export enum Status {
  active = "active",
  complete = "complete"
}
export type OrderType = {
  id?: string;
  order_id: number;
  quantity: number;
  status: Status;
  user_id: string;
  product_id: string;
};
export type OrderDetails = {
  id?: string;
  quantity: number;
  status: Status;
  user: UserType;
  product: ProductType;
};

export class Order {
  async create(order: OrderType): Promise<OrderType> {
    try {
      const SQL = `INSERT INTO orders(quantity, order_id, status, user_id, product_id) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [
        order.order_id,
        order.quantity,
        order.status,
        order.user_id,
        order.product_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could NOT CREATE order ${err}`);
    }
  }
  async index(): Promise<OrderType[]> {
    try {
      const SQL = `SELECT * FROM orders`;
      const conn = await client.connect();
      const result = await conn.query(SQL);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get all orders: ${error}`);
    }
  }
  async getActiveOrders(user_id: string) {
    try {
      const SQL = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [user_id, Status.active]);
      const active_orders: OrderType[] = result.rows;
      const orders: OrderDetails[] = [];

      // get complete order details by replacing
      // user_id with user details and
      // product_id with product details
      const user = new User();
      const product = new Product();

      for (const order of active_orders) {
        const userAllData: UserType = await user.show(order.user_id);
        const userSecureData = {
          id: userAllData.id,
          username: userAllData.username,
          firstname: userAllData.firstname,
          lastname: userAllData.firstname
        };
        orders.push({
          id: order.id,
          quantity: order.quantity,
          status: order.status,
          user: userSecureData,
          product: await product.show(order.product_id)
        });
      }

      conn.release();
      return orders;
    } catch (error) {
      console.log(`ERROR: inside catch: ${error}`);
      throw new Error(`Could NOT get active orders: ${error}`);
    }
  }
}
