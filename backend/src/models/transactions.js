import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "trade", "profit_claim", "bonus"],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["completed", "pending", "failed", "processing"],
    },
    description: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      default: "",
    },
    reference: {
      type: String,
      required: true,
    },
    receipt: {
      url: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
    },
    fee: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;
