import { Router } from "express";
import { checkAuth, forgotPassword, login, register, resetPassword, verifyOtp } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", authMiddleware, verifyOtp);
authRouter.post("/login", login);
authRouter.get("/check", authMiddleware, checkAuth);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);


export default authRouter;