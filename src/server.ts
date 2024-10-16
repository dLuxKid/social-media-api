import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";
import app from "./app";

dotenv.config({ path: "./config.env" });
const port = process.env.port;

const DB = process.env.DB as string;

mongoose.Promise = Promise;
mongoose
  .connect(DB)
  .then(() => console.log("connection successful"))
  .catch((error: Error) => console.log(error));

app.listen(port, () => console.log(`listening on port - ${port}`));
