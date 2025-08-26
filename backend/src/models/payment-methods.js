import { Schema, model } from "mongoose";

const paymentMethodSchema = new Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const PaymentMethodModel = model("PaymentMethod", paymentMethodSchema);

export default PaymentMethodModel;
