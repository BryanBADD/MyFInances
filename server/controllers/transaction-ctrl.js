const Transaction = require("../models/transaction-model");

//Create new transaction
createTransaction = (req, res) => {
    const body = req.body;

    //Check to see of there is a valid request
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a transaction name!",
        });
    }

    //Create instance Transaction
    const transaction = new Transaction(body);

    //Check for validity of transaction and save to database
    if (!transaction) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    transaction
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: transaction._id,
                message: "Transaction created!",
            })
        })
        .catch(err => {
            return res.status(400).json({
                err,
                message: "Transaction not created!",
            })
        })
    };

//Update current transaction
updateTransaction = async (req, res) => {
const body = req.body;

//Check to see if request is valid
if (!body) {
    return res.state(400).json({
        success: false,
        error: "You must provide a transaction to update!",
    });
}

    //Update transaction
    Transaction.findOne({_id: req.params.id}, (err, foundTransaction) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "Transaction not found!",
            })
        }
        //Set transaction values to be updated
        foundTransaction.account = body.account;
        foundTransaction.date = body.date;
        foundTransaction.description = body.description;
        foundTransaction.amount = body.amount;
        foundTransaction.category = body.category;
        foundTransaction.subcategory = body.subcategory;
        foundTransaction.memo = body.memo;
        foundTransaction.isCleared = body.isCleared;

        //Save updated transaction
        foundTransaction
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: foundTransaction._id,
                    message: "Transaction updated!"
                })
            })
            .catch(err => {
                return res.status(404).json({
                    err,
                    message: "Transaction not updated!",
                })
            })
        });
};

//Delete an transaction
deleteTransaction = async (req, res) => {
    const body = req.body;

    //Check to see if request is valid
    if (!body) {
        return res.state(400).json({
            success: false,
            error: "You must provide a transaction to delete!",
        });
    }

//Delete transaction
await Transaction
    .findOneAndDelete({_id: req.params.id}, (err, foundTransaction) => {
        if (err) {
            return res.state(400).json({
                success: false,
                error: err,
            })
        }
        //Check to see if transaction was found
        if (!foundTransaction) {
            return res.status(404).json({
                success: false,
                error: "Transaction not found!",
            })
        }
        return res.status(200).json({
            success: true,
            data: foundTransaction,
        })
    })
    .catch((err) => {console.log(err)});
};

//Get individual transaction
getTransactionById = async (req, res) => {
    const body = req.body;

    //Check to see if request is valid
    if (!body) {
        return res.state(400).json({
            success: false,
            error: "You must provide a transaction to select!",
        });
    }

    //Find individual transaction
    await Transaction
        .findOne({_id: req.params.id}, (err, foundTransaction) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                });
            } 

            //Check to see if transaction was found
            if (!foundTransaction) {
                return res.status(404).json({
                    success: false,
                    error: "Transaction not found!",
                })
            };
            return res.status(200).json({
                success: true,
                data: foundTransaction,
            });
        })
        .catch((err) => {console.log(err);});
};

getTransactions = async (req, res) => {
    const body = req.body;
    
    //Check to see if request is valid
    if (!body) {
        return res.state(400).json({
            success: false,
            error: "You must provide an account!",
        });
    }
    
    await Transaction
        .find({accountId: req.params.id}, (err, foundTransactions) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                })
            }
            if (!foundTransactions.length) {
                return res.status(404).json({
                    success: false,
                    error: "No transactions found!",
                })
            }
            return res.status(200).json({
                success: true,
                data: foundTransactions
            })
        })
        .sort({date: -1, amount: -1})
        .limit()
        .catch((err) => {
            console.log(err);
        });  
};

module.exports = {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactions
    // updateTransaction
};