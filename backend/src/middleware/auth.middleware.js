import jwt from "jsonwebtoken";
import { onError } from "../utils/onError.js";
import UserModel from "../models/users.js";
import envFile from "../config/env.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, Please login to continue",
    });
  }
  try {
    const decoded = jwt.verify(token, envFile.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Session expired, Please login to continue",
      });
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    onError(res, error);
  }
};

export default authMiddleware;
