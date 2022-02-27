import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import client from "./database";
import orderRoutes from "./handlers/orderRoutes";
import productRoutes from "./handlers/productRoutes";
import userRoutes from "./handlers/userRoutes";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

// routes
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
  console.log("get client:: ");
  console.log(client);
});

export default app;
