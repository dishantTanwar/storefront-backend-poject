import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRESS_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

console.log("INFO: Client Details");
console.log(
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRESS_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
);

let client: Pool;

function getClient(): Pool {
  console.log(ENV);

  if (ENV?.toLowerCase() === "test") {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRESS_PASSWORD,
    });
    return client;
  }

  if (ENV?.toLowerCase() === "dev") {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRESS_PASSWORD,
    });
    return client;
  }

  return new Pool();
}
client = getClient();
export default client;
