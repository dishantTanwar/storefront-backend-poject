import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import orderRoutes from "./handlers/orderRoutes";
import productRoutes from "./handlers/productRoutes";
import userRoutes from "./handlers/userRoutes";

const app: express.Application = express();
const port = 3000;
const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
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
  // console.log("INFO: entering playground");
  // playground();
  // console.log("INFO: exitingg playground");
});

export default app;
