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
userRouter.put("/make-admin/:userId", authMiddleware, makeUserAdmin);
userRouter.put("/remove-admin/:userId", authMiddleware, removeUserAdmin);
userRouter.put("/deactivate/:userId", authMiddleware, deactivateUser);
userRouter.put("/activate/:userId", authMiddleware, activateUser);
userRouter.put("/update-balance/:userId", authMiddleware, updateUserBalance);
userRouter.put("/update-bonus/:userId", authMiddleware, updateUserBonus);


// end-user routes
userRouter.put("/update-profile", authMiddleware, updateUserProfile);
userRouter.put("/change-password", authMiddleware, changeUserPassword);

export default userRouter;
