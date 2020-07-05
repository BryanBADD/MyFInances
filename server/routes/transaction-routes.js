const express = require("express");
const TransactionCtrl = require("../controllers/transaction-ctrl");
const router = express.Router();

//Set routes
router.post("/transaction", TransactionCtrl.createTransaction);
router.put("/transaction/:id", TransactionCtrl.updateTransaction);
router.delete("/transaction/:id", TransactionCtrl.deleteTransaction);
router.get("/transaction/:id", TransactionCtrl.getTransactionById);
router.get("/transactions/:id", TransactionCtrl.getTransactionsByAccount);
router.get("/transactions", TransactionCtrl.getTransactions)

module.exports = router;