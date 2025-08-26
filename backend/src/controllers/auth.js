import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/users.js";
import generateRandomNumber from "../utils/generateRandomNumbers.js";
import envFile from "../config/env.js";
import sendEmail from "../config/email.js";
import { otpEmail } from "../templates/otpEmail.js";
import { onError } from "../utils/onError.js";
import { resetPasswordTemplate } from "../templates/resetPassword.js";

export const register = async (req, res) => {
    const { firstName, lastName, email, password, phone, country } = req.body;
  if (!firstName || !lastName || !email || !password || !phone || !country) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const avatar = `https://ui-avatars.com/api/?background=13a870&color=fff&name=${firstName} ${lastName}`
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userRawPassword: password,
      phone,
      country,
      avatar,
    });

    const otp = generateRandomNumber(6);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    user.save();

    const token = jwt.sign({ id: user.id }, envFile.JWT_SECRET, {
      expiresIn: "7 days",
    });

    sendEmail(
      "Email Verification",
      otpEmail(otp, user.firstName),
      user.email,
      `${user.firstName} ${user.lastName}`
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
}


export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const { email } = req.user;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      if (user.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
      if (user.otpExpiresAt < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "OTP expired",
        });
      }
      user.isVerified = true;
      user.save();
  
      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        data: user,
      });
    } catch (error) {
      onError(res, error);
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.id }, envFile.JWT_SECRET, {
        expiresIn: "7 days",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
        token,
      });
    } catch (error) {
      onError(res, error);
    }
  };
  
  export const checkAuth = async (req, res) => {
    const user = req.user;
    const token = req.token;
    res.status(200).json({
      success: true,
      message: "User authenticated",
      data: user,
      token,
    });
  };
  
  export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      if (!user.isAdmin) {
        return res
          .status(401)
          .json({
            message: "Unauthorized, you are not an admin",
            success: false,
          });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      }
      const token = jwt.sign({ id: user.id }, envFile.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        success: true,
        message: "Admin login successful",
        data: user,
        token,
      });
    } catch (error) {
      onError(res, error);
    }
  };


  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      const frontendUrl = envFile.FRONTEND_URL;
    await sendEmail(
      "Reset Password - Stocks Navigator",
      resetPasswordTemplate(
        `${user.firstName}`,
        `${frontendUrl}/new-password?token=${user.id}`
      ),
      email,
      `${user.firstName} ${user.lastName}`
    );
  
    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
    } catch (error) {
      onError(res, error);
    }
  }


  export const resetPassword = async (req, res) => {
    const { password, userId } = req.body;
    if (!password || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password reset successfully",
        data: user,
      });
    } catch (error) {
      onError(res, error);
    }
  };