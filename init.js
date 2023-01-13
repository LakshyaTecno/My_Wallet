const Product = require("./models/product.schema");
const Wallet = require("./models/wallet.Schema");
const Transaction = require("./models/transaction.Schema");
module.exports = async () => {
  try {
    //     await Product.collection.drop();

    //     await Wallet.collection.drop();

    //     await Transaction.collection.drop();

    const products = await Product.insertMany([
      {
        amount: "5000",
        description: "TV",
      },
      {
        amount: "8000",
        description: "Glasses",
      },
      {
        amount: "10000",
        description: "MobilePhone",
      },
      {
        amount: "15000",
        description: "HeadPhone",
      },
      {
        amount: "25000",
        description: "Laptop",
      },
    ]);
  } catch (err) {
    console.log("err in db initialization", err.message);
  }
};
