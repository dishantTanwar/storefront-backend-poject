import client from "../database";

export type ProductType = {
  id?: string;
  name: string;
  price: number;
};
export class Product {
  async create(product: ProductType) {
    try {
      const SQL = `INSERT INTO products(name, price) VALUES($1, $2) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [product.name, product.price]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could NOT CREATE product: %{error}`);
    }
  }

  async index(): Promise<ProductType[]> {
    try {
      const SQL = `SELECT * FROM products`;
      const conn = await client.connect();
      const result = await conn.query(SQL);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could NOT GET products: ${error}`);
    }
  }

  async show(productId: string): Promise<ProductType> {
    try {
      const SQL = `SELECT * FROM products WHERE id = $1`;
      const conn = await client.connect();
      const result = await conn.query(SQL, [productId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could NOT GET products: ${error}`);
    }
  }
}
