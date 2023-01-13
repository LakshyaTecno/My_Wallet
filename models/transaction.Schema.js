const mongoose = require("mongoose");
const constants = require("../utils/constants");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      default: constants.transactionType.credit,
      enum: [constants.transactionType.credit, constants.transactionType.debit],
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Wallet",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => {
        return Date.now();
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
