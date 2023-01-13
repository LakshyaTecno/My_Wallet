const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
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

module.exports = mongoose.model("Product", productSchema);
