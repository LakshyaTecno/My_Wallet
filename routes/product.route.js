const productController = require("../controllers/product.controller");

//Product Listing
module.exports = (app) => {
  app.get("/products", productController.getAllProduct);
};
