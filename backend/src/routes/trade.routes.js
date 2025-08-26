import { Router } from "express";
import {
  claimProfit,
  createTrade,
  deleteTrade,
  getAllTrades,
  getUserTrades,
  pauseTrade,
  resumeTrade,
  updateCurrentValue,
} from "../controllers/trades.js";
import authMiddleware from "../middleware/auth.middleware.js";

const tradeRouter = Router();

tradeRouter.post("/create", authMiddleware, createTrade);
tradeRouter.post("/claim-profit", authMiddleware, claimProfit);
tradeRouter.put("/pause/:tradeId", authMiddleware, pauseTrade);
tradeRouter.put("/resume/:tradeId", authMiddleware, resumeTrade);
tradeRouter.delete("/delete/:tradeId", authMiddleware, deleteTrade);
tradeRouter.put("/update-current-value/:tradeId", authMiddleware, updateCurrentValue);
tradeRouter.get("/all", authMiddleware, getAllTrades);
tradeRouter.get("/user", authMiddleware, getUserTrades);

export default tradeRouter;
