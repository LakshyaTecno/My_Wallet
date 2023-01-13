const Wallet = require("../models/wallet.Schema");
const Product = require("../models/product.schema");
function amountverifyier(value) {
  return value.match(/^\d+(\.\d{1,4})?$/);
}
exports.validateWalletRequestBody = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed!  name is not provided",
    });
  }

  if (!req.body.balance) {
    return res.status(400).send({
      message: "Failed! balance is not provided",
    });
  } else if (!amountverifyier(req.body.balance)) {
    return res.status(400).send({
      message:
        "Failed! Not a valid balance. Balance can be decimal upto 4 precision points. E.g. 10.4512",
    });
  }
  next();
};

exports.isvalidWalletId = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Failed!  wallet _id is not provided",
    });
  }

  try {
    const walletid = req.params.id;
    const wallet = await Wallet.findOne({ _id: walletid });
    if (!wallet) {
      return res.status(400).send({
        message: "wallet _id  passed doesn't exist",
      });
    }
    next();
  } catch (err) {
    console.log("Error while reading the wallet info", err.message);
    return res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

exports.validateTransactionRequestBody = async (req, res, next) => {
  if (!req.body.amount) {
    return res.status(400).send({
      message: "Failed! balance is not provided",
    });
  } else if (!amountverifyier(req.body.amount)) {
    return res.status(400).send({
      message:
        "Failed! Not a valid amount. Balance can be decimal upto 4 precision points. E.g. 10.4512",
    });
  }
  next();
};

exports.isvalidProductId = async (req, res, next) => {
  if (!req.body.productId) {
    return res.status(400).send({
      message: "Failed!  wallet _id is not provided",
    });
  }

  try {
    const prodid = req.body.productId;
    const product = await Product.findOne({ _id: prodid });
    if (!product) {
      return res.status(400).send({
        message: "ProductId  passed doesn't exist",
      });
    }
    next();
  } catch (err) {
    console.log("Error while reading the product info", err.message);
    return res.status(500).send({
      message: "Some Internal server error",
    });
  }
};
