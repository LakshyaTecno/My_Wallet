const walletController = require("../controllers/wallet.controller");
const middleware = require("../middewares/walletValidation");
module.exports = (app) => {
  //Wallet Setup
  app.post(
    "/wallet",
    [middleware.validateWalletRequestBody],
    walletController.createWallet
  );
  //Wallet Details
  app.get(
    "/wallet/:id",
    [middleware.isvalidWalletId],
    walletController.getWallet
  );
  //Add credit to the wallet
  app.post(
    "/wallet/:id/transaction",
    [middleware.isvalidWalletId, middleware.validateTransactionRequestBody],
    walletController.addCredit
  );

  //Purchase a product
  app.post(
    "/wallet/:id/purchase",
    [middleware.isvalidWalletId, middleware.isvalidProductId],
    walletController.purchaseProduct
  );

  //List transactions
  app.get(
    "/wallet/:id/transaction",
    [middleware.isvalidWalletId],
    walletController.getAllTransactions
  );
};
