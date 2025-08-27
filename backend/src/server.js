import express from "express";
import cors from "cors";
import envFile from "./config/env.js";
import connectDB from "./config/connect-db.js";
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import tradeRouter from "./routes/trade.routes.js";
import userRouter from "./routes/user.routes.js";
import paymentMethodRouter from "./routes/payment-method.routes.js";

const Port = envFile.PORT || 5000;

await connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stocks-navigators.vercel.app",
      "https://admin-stocks-navigators.com",
      "https://admin-stocks-navigators.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Server is running ✅",
    status: "success",
  });
});

app.use("/v1/auth", authRouter);
app.use("/v1/transaction", transactionRouter);
app.use("/v1/trade", tradeRouter);
app.use("/v1/user", userRouter);
app.use("/v1/payment-method", paymentMethodRouter);

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});
