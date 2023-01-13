const Wallet = require("../models/wallet.Schema");
const Transaction = require("../models/transaction.Schema");
const Product = require("../models/product.schema");
const constants = require("../utils/constants");

exports.createWallet = async (req, res) => {
  try {
    const walletObj = {
      name: req.body.name,
      balance: req.body.balance,
    };

    const walletCreated = await Wallet.create(walletObj);
    console.log(walletCreated);

    res.status(201).send(walletCreated);
  } catch (err) {
    console.log("#### Error while creating new wallet #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new wallet",
    });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const walletid = req.params.id;

    const wallet = await Wallet.findOne({ _id: walletid });

    console.log(wallet);

    res.status(200).send(wallet);
  } catch (err) {
    console.log("#### Error while getting new wallet #### ", err);
    res.status(500).send({
      message: "Internal server error while getting new wallet",
    });
  }
};

exports.addCredit = async (req, res) => {
  try {
    const walletid = req.params.id;
    const transactionObj = {
      amount: req.body.amount,
      description: req.body.description,
      walletId: walletid,
    };

    const transactionCreated = await Transaction.create(transactionObj);

    const wallet = await Wallet.findOne({ _id: walletid });
    wallet.transactionId.push(transactionCreated._id);

    if (transactionCreated.type === constants.transactionType.credit) {
      wallet.balance += transactionCreated.amount;
    } else if (transactionCreated.type === constants.transactionType.debit) {
      wallet.balance -= transactionCreated.amount;
    }

    await wallet.save();
    await transactionCreated.save();
    console.log(wallet);
    console.log(transactionCreated);

    const response = {
      balance: wallet.balance,
      transactionId: transactionCreated._id,
      description: transactionCreated.description,
      type: transactionCreated.type,
      createdAt: transactionCreated.createdAt,
    };

    res.status(200).send(response);
  } catch (err) {
    console.log("#### Error while addingCredit to wallet #### ", err);
    res.status(500).send({
      message: "Internal server error while addingCredit to wallet",
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const walletid = req.params.id;
    const wallet = await Wallet.findOne({ _id: walletid });

    const transactions = await Transaction.find({
      _id: { $in: wallet.transactionId },
    })
      .skip(skip)
      .limit(limit);

    res.status(200).send(transactions);
  } catch (err) {
    console.log("#### Error while addingCredit to wallet #### ", err);
    res.status(500).send({
      message: "Internal server error while addingCredit to wallet",
    });
  }
};

exports.purchaseProduct = async (req, res) => {
  try {
    const walletid = req.params.id;
    const productid = req.body.productId;

    const wallet = await Wallet.findOne({ _id: walletid });

    const product = await Product.findOne({ _id: productid });

    const transactionObj = {
      amount: product.amount,
      walletId: walletid,
      type: constants.transactionType.debit,
    };

    const transactionCreated = await Transaction.create(transactionObj);

    if (wallet.balance >= product.amount) {
      wallet.balance -= product.amount;
      wallet.transactionId.push(transactionCreated._id);

      product.transactionId = transactionCreated._id;

      transactionCreated.walletId = walletid;
      transactionCreated.productId = productid;
    } else {
      return res.status(400).send({
        message: "Failed!  insuffcient wallet balance ",
      });
    }

    await wallet.save();
    await product.save();
    await transactionCreated.save();
    console.log(wallet);

    console.log(product);
    console.log(transactionCreated);

    const response = {
      balance: wallet.balance,
      transactionId: transactionCreated._id,
      description: product.description,
      type: transactionCreated.type,
      productId: product._id,
    };

    res.status(200).send(response);
  } catch (err) {
    console.log("#### Error while purchasing a product #### ", err);
    res.status(500).send({
      message: "Internal server error while purchasing a product",
    });
  }
};
