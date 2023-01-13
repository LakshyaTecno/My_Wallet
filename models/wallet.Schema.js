const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    transactionId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Transaction",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => {
        return Date.now();
      },
    },
    updatedAt: {
      type: Date,
      default: () => {
        return Date.now();
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Wallet", walletSchema);
