import TradeModel from "../models/trades.js";
import TransactionModel from "../models/transactions.js";
import UserModel from "../models/users.js";
import { formatNumber } from "../utils/formatNumber.js";
import { onError } from "../utils/onError.js";

export const createTrade = async (req, res) => {
  const { symbol, name, investmentAmount } = req.body;
  const user = req.user;
  try {
    const trade = await TradeModel.create({
      user: user.id,
      symbol,
      name,
      investmentAmount,
      currentValue: investmentAmount,
    });

    await TransactionModel.create({
      user: user.id,
      amount: investmentAmount,
      method: "trade",
      type: "trade",
      description: `You invested $${formatNumber(investmentAmount)} in ${name}`,
      reference: `TR-${Date.now()}`,
      status: "completed",
    });
    await UserModel.findByIdAndUpdate(user.id, {
      availableBalance: user.availableBalance - investmentAmount,
    });

    res.status(201).json({
      success: true,
      message: "Trade created successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const claimProfit = async (req, res) => {
  const { currentValue, tradeId } = req.body;
  const user = req.user;
  try {
    const trade = await TradeModel.findById(tradeId);
    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    await UserModel.findByIdAndUpdate(user.id, {
      $inc: { availableBalance: currentValue },
    });
    await TransactionModel.create({
      user: user.id,
      amount: currentValue,
      method: "trade",
      type: "profit_claim",
      status: "completed",
      reference: `TR-${Date.now()}`,
      description: `You claimed $${formatNumber(currentValue)} from ${
        trade.name
      }`,
    });

    await TradeModel.findByIdAndDelete(tradeId);

    res.status(200).json({
      success: true,
      message: "Profit claimed successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const pauseTrade = async (req, res) => {
  const { tradeId } = req.params;
  try {
    const trade = await TradeModel.findById(tradeId);
    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    await TradeModel.findByIdAndUpdate(tradeId, {
      status: "paused",
    });
    res.status(200).json({
      success: true,
      message: "Trade paused successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};
export const resumeTrade = async (req, res) => {
  const { tradeId } = req.params;
  try {
    const trade = await TradeModel.findById(tradeId);
    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    await TradeModel.findByIdAndUpdate(tradeId, {
      status: "running",
    });
    res.status(200).json({
      success: true,
      message: "Trade resumed successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deleteTrade = async (req, res) => {
  const { tradeId } = req.params;
  try {
    const trade = await TradeModel.findByIdAndDelete(tradeId);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trade deleted successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};


export const updateCurrentValue = async (req, res) => {
  const { tradeId } = req.params;
  const { currentValue } = req.body;
  try {
    const trade = await TradeModel.findById(tradeId);
    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }
    trade.currentValue = currentValue;
    await trade.save();
    res.status(200).json({
      success: true,
      message: "Trade updated successfully",
      data: trade,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getUserTrades = async (req, res) => {
  const user = req.user;
  try {
    const trades = await TradeModel.find({ user: user.id })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json({
      success: true,
      message: "Trades fetched successfully",
      data: trades,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getAllTrades = async (req, res) => {
  try {
    const trades = await TradeModel.find()
      .sort({ createdAt: -1 })
      .populate("user");
      
    res.status(200).json({
      success: true,
      message: "Trades fetched successfully",
      data: trades,
    });
  } catch (error) {
    onError(res, error);
  }
};
