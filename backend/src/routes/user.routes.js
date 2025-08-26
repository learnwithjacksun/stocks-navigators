import { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  makeUserAdmin,
  removeUserAdmin,
  deactivateUser,
  activateUser,
  updateUserBalance,
  updateUserProfile,
  changeUserPassword,
  updateUserBonus,
} from "../controllers/user.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

// admin routes
userRouter.get("/all", authMiddleware, getAllUsers);
userRouter.delete("/delete/:userId", authMiddleware, deleteUser);
userRouter.post("/make-admin/:userId", authMiddleware, makeUserAdmin);
userRouter.post("/remove-admin/:userId", authMiddleware, removeUserAdmin);
userRouter.post("/deactivate/:userId", authMiddleware, deactivateUser);
userRouter.post("/activate/:userId", authMiddleware, activateUser);
userRouter.post("/update-balance/:userId", authMiddleware, updateUserBalance);
userRouter.post("/update-bonus/:userId", authMiddleware, updateUserBonus);

// end-user routes
userRouter.put("/update-profile", authMiddleware, updateUserProfile);
userRouter.put("/change-password", authMiddleware, changeUserPassword);

export default userRouter;
