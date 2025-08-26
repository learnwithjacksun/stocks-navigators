import { Router } from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/payment-methods.js";
import authMiddleware from "../middleware/auth.middleware.js";

const paymentMethodRouter = Router();

paymentMethodRouter.post("/", authMiddleware, createPaymentMethod);
paymentMethodRouter.get("/", authMiddleware, getPaymentMethods);
paymentMethodRouter.put("/:id", authMiddleware, updatePaymentMethod);
paymentMethodRouter.delete("/:id", authMiddleware, deletePaymentMethod);

export default paymentMethodRouter;
