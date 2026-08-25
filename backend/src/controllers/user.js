import { uploadImage } from "../config/cloudinary.js";
import TransactionModel from "../models/transactions.js";
import UserModel from "../models/users.js";
import { formatNumber } from "../utils/formatNumber.js";
import { onError } from "../utils/onError.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    country,
    city,
    address,
    availableBalance,
    bonus,
    isActive,
    isAdmin,
    isVerified,
  } = req.body;

  try {
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (normalizedEmail) {
      const existingUser = await UserModel.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
    }

    const rawPassword =
      password && String(password).trim()
        ? String(password)
        : crypto.randomBytes(8).toString("hex");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(rawPassword, salt);

    const resolvedFirstName =
      firstName && String(firstName).trim() ? String(firstName).trim() : "";
    const resolvedLastName =
      lastName && String(lastName).trim() ? String(lastName).trim() : "";
    const resolvedEmail =
      normalizedEmail || `user-${Date.now()}-${crypto.randomBytes(3).toString("hex")}@placeholder.local`;
    const displayName =
      [resolvedFirstName, resolvedLastName].filter(Boolean).join(" ") || "User";
    const avatar = `https://ui-avatars.com/api/?background=13a870&color=fff&name=${encodeURIComponent(displayName)}`;

    const user = await UserModel.create({
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      email: resolvedEmail,
      password: hashedPassword,
      userRawPassword: rawPassword,
      phone: phone && String(phone).trim() ? String(phone).trim() : "",
      country: country && String(country).trim() ? String(country).trim() : "",
      city: city && String(city).trim() ? String(city).trim() : "",
      address: address && String(address).trim() ? String(address).trim() : "",
      avatar,
      availableBalance:
        availableBalance !== undefined && availableBalance !== ""
          ? Number(availableBalance)
          : 0,
      bonus: bonus !== undefined && bonus !== "" ? Number(bonus) : 0,
      isActive: typeof isActive === "boolean" ? isActive : true,
      isAdmin: typeof isAdmin === "boolean" ? isAdmin : false,
      isVerified: typeof isVerified === "boolean" ? isVerified : true,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

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
          ? `You received $${formatNumber(bonus)} as bonus`
          : `You claimed $${formatNumber(bonus)} as bonus`,
      status: "completed",
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
