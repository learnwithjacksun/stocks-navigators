import { uploadImage } from "../config/cloudinary.js";
import TransactionModel from "../models/transactions.js";
import UserModel from "../models/users.js";
import { formatNumber } from "../utils/formatNumber.js";
import { onError } from "../utils/onError.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const makeUserAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isAdmin = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User made admin successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const removeUserAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isAdmin = false;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User removed admin successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deactivateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isActive = false;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const activateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isActive = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User activated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const updateUserBalance = async (req, res) => {
  const { userId } = req.params;
  const { balance } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.availableBalance = balance;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User balance updated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const updateUserBonus = async (req, res) => {
  const { userId } = req.params;
  const { bonus, type } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (type === "add") {
      user.bonus += Number(bonus);
      user.availableBalance += Number(bonus);
    } else {
      user.bonus -= Number(bonus);
      user.availableBalance -= Number(bonus);
    }
    await user.save();

    await TransactionModel.create({
      user: user.id,
      amount: Number(bonus),
      method: "bonus",
      type: "bonus",
      reference: `BONUS-${Date.now()}`,
      description:
        type === "add"
          ? `You received ${formatNumber(bonus)} as bonus`
          : `You claimed ${formatNumber(bonus)} as bonus`,
      status: "success",
    });
    res.status(200).json({
      success: true,
      message: "User bonus updated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    newAvatar,
  } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (newAvatar) {
      const { imageUrl } = await uploadImage(newAvatar);
      user.avatar = imageUrl;
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.country = country;
    user.city = city;
    user.address = address;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const changeUserPassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword, oldPassword } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    user.userRawPassword = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User password updated successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};
