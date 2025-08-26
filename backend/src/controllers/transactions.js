import { uploadImage } from "../config/cloudinary.js";
import TransactionModel from "../models/transactions.js";
import UserModel from "../models/users.js";
import { formatNumber } from "../utils/formatNumber.js";
import { onError } from "../utils/onError.js";

export const deposit = async (req, res) => {
  const { amount, method, receipt } = req.body;

  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Please login to continue",
      });
    }
    const { imageUrl, publicIdImage } = await uploadImage(receipt);
    const transaction = await TransactionModel.create({
      user: user.id,
      amount,
      method,
      type: "deposit",
      recipient: user.email,
      reference: `DP-${Date.now()}`,
      description: `You deposited $${formatNumber(amount)} via ${method}`,
      receipt: {
        url: imageUrl,
        id: publicIdImage,
      },
    });

    res.status(201).json({
      success: true,
      message: "Deposit successful",
      data: transaction,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const approveOrRejectDeposit = async (req, res) => {
  const { transactionId, status } = req.body;
  try {
    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    if (status === "completed") {
      await UserModel.findByIdAndUpdate(transaction.user, {
        $inc: { availableBalance: transaction.amount },
      });
    }
    await TransactionModel.findByIdAndUpdate(transactionId, {
      status,
      description: `Your deposit of ${formatNumber(transaction.amount)} via ${transaction.method} was ${status}`,
    });
    res.status(200).json({
      success: true,
      message: `Deposit ${status}`,
    });
  } catch (error) {
    onError(res, error);
  }
};


export const withdraw = async (req, res) => {
  const { amount, method, recipient } = req.body;
  const user = req.user;
  try {
   
    const transaction = await TransactionModel.create({
      user: user.id,
      amount,
      method,
      type: "withdrawal",
      recipient,
      reference: `WD-${Date.now()}`,
      description: `You withdrew $${formatNumber(amount)} via ${method}`,
    });
    await UserModel.findByIdAndUpdate(user.id, {
      $inc: { availableBalance: -amount },
      hasPendingWithdrawal: true,
    });
    res.status(201).json({
      success: true,
      message: "Withdrawal successful",
      data: transaction,
    });
  } catch (error) {
    onError(res, error);
  }
}


export const approveOrRejectWithdrawal = async (req, res) => {
  const { transactionId, status } = req.body;
  try {
    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    if (status === "completed") {
      await UserModel.findByIdAndUpdate(transaction.user, {
        $inc: { availableBalance: transaction.amount },
        hasPendingWithdrawal: false,
      });
    }
    transaction.status = status;
    transaction.description = `Your withdrawal of $${formatNumber(transaction.amount)} via ${transaction.method} was ${status}`;
    await transaction.save();

    res.status(200).json({
      success: true,
      message: `Withdrawal ${status}`,
    });
  } catch (error) {
    onError(res, error);
  }
}


export const getUserTransactions = async (req, res) => {
  const {id: userId} = req.user;
  try {
    const transactions = await TransactionModel.find({user: userId}).sort({createdAt: -1}).populate("user");
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    onError(res, error);
  }
}


export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find().sort({createdAt: -1}).populate("user");
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    onError(res, error);
  }
}

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  
  try {
    const transaction = await TransactionModel.findOne({ _id: id, user: userId }).populate("user");
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    onError(res, error);
  }
}


