const Product = require("../models/product.schema");
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);

    res.status(200).send(products);
  } catch (err) {
    console.log("#### Error while getting all products #### ", err);
    res.status(500).send({
      message: "Internal server error while getting all products",
    });
  }
};
