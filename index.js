import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import db from "./src/database/db.js";
import constants from "./src/utilities/constant.js";
import { isAuth } from "./src/middleware/auth.js";

const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const uniqueRouteMapper = process.env.uniqueRoute;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
morgan.token('ip', (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress);
app.use(morgan(':ip :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));


const corsConfig = {
  origin: [
    "http://localhost:3001",
  ],
  credentials: true,
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get(uniqueRouteMapper, (req, res) => {
  res.sendStatus(constants.HTTP_200_CODE);
});

app.use(uniqueRouteMapper, routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

export default app;
