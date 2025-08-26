import { Router } from "express";
import {
  approveOrRejectDeposit,
  approveOrRejectWithdrawal,
  deposit,
  getAllTransactions,
  getUserTransactions,
  getTransactionById,
  withdraw,
} from "../controllers/transactions.js";
import authMiddleware from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.post("/deposit", authMiddleware, deposit);
transactionRouter.post(
  "/approve-or-reject",
  authMiddleware,
  approveOrRejectDeposit
);
transactionRouter.post("/withdraw", authMiddleware, withdraw);
transactionRouter.post(
  "/approve-or-reject-withdrawal",
  authMiddleware,
  approveOrRejectWithdrawal
);
transactionRouter.get("/all", authMiddleware, getAllTransactions);
transactionRouter.get("/user", authMiddleware, getUserTransactions);
transactionRouter.get("/:id", authMiddleware, getTransactionById);

export default transactionRouter;
