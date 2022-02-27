import client from "../database";

export async function initTestSuite(): Promise<void> {
  try {
    const conn = await client.connect();
    const QUERIES = [
      `DROP TABLE if exists orders CASCADE`,
      `DROP TABLE if exists users CASCADE`,
      `DROP TABLE if exists products CASCADE`,

      `CREATE TABLE if not exists users (
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(150),
          lastname VARCHAR(150),
          password VARCHAR(150));`,
      `CREATE TABLE if not exists products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(150),
          price NUMERIC(12, 2));`,
      `CREATE TABLE if not exists orders (
        id SERIAL PRIMARY KEY,
        quantity BIGINT,
        status VARCHAR(15),
        user_id BIGINT REFERENCES users(id),
        product_id BIGINT REFERENCES products(id));`
    ];
    for (const query of QUERIES) {
      await conn.query(query);
    }
    conn.release();
  } catch (error) {
    console.log(`Error: initialize test dataase. ${error}`);
    throw new Error(`Error: initialize test dataase. ${error}`);
  }
}

export async function clearTestSuit() {
  try {
    const conn = await client.connect();
    const QUERIES = [
      `DROP TABLE if exists orders CASCADE`,
      `DROP TABLE if exists users CASCADE`,
      `DROP TABLE if exists products CASCADE`
    ];
    for (const query of QUERIES) {
      await conn.query(query);
    }
    conn.release();
  } catch (error) {
    console.log(`Error: setting-downn test dataase. ${error}`);
    throw new Error(`Error: setting-downn dataase. ${error}`);
  }
}

export async function fillTestSuit(): Promise<void> {
  try {
    const conn = await client.connect();
    const QUERIES = [
      `INSERT INTO users(firstname, lastname, password) 
            VALUES('test_fname','test_lnamne','test_password')`,
      `INSERT INTO products(name, price) VALUES('p_name', 100)`
    ];
    for (const query of QUERIES) {
      await conn.query(query);
    }
    conn.release();
  } catch (error) {
    console.log(`Error: fillling test dataase. ${error}`);
    throw new Error(`Error: filling test dataase. ${error}`);
  }
}
