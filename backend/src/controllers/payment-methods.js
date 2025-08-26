import PaymentMethodModel from "../models/payment-methods.js";
import { onError } from "../utils/onError.js";

export const createPaymentMethod = async (req, res) => {
  const { currency, network, address } = req.body;
  if (!currency || !network || !address) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const existingPaymentMethod = await PaymentMethodModel.findOne({ address });
    if (existingPaymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method already exists",
      });
    }
    const paymentMethod = await PaymentMethodModel.create({
      currency,
      network,
      address,
    });
    res.status(201).json({
      success: true,
      message: "Payment method created successfully",
      data: paymentMethod,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethodModel.find();
    res.status(200).json({
      success: true,
      message: "Payment methods fetched successfully",
      data: paymentMethods,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { currency, network, address } = req.body;
    const paymentMethod = await PaymentMethodModel.findByIdAndUpdate(
      id,
      { currency, network, address },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Payment method updated successfully",
      data: paymentMethod,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    await PaymentMethodModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};
