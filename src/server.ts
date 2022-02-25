import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
