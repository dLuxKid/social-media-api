import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import router from "./router";
import globalErrorController from "./utils/error-handlers/error-controller";
import AppError from "./utils/error-handlers/app-error";

const app: Application = express();

app.use(compression());
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(mongoSanitize());
app.use(
  cors({
    credentials: true,
  })
);
app.use(hpp());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from the server side");
});
app.use("/api/v1", router());
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});
app.use(globalErrorController);

export default app;
