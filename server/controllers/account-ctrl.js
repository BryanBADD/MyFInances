const Account = require("../models/account-model");

//Create new account
createAccount = (req, res) => {
    const body = req.body;

    //Check to see of there is a valid request
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide an account name!",
        });
    }

    //Create instance Account
    const account = new Account(body);

    //Check for validity of account and save to database
    if (!account) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    account
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: account._id,
                message: "Account created!",
            })
        })
        .catch(err => {
            return res.status(400).json({
                err,
                message: "Account not created!",
            })
        })
    };

//Update current account
updateAccount = async (req, res) => {
const body = req.body;

//Check to see if request is valid
if (!body) {
    return res.state(400).json({
        success: false,
        error: "You must provide an account to update!",
    });
}

    //Update account
    Account.findOne({_id: req.params.id}, (err, foundAccount) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "Account not found!",
            })
        }
        //Set account values to be updated
        foundAccount.name = body.name;
        foundAccount.startingBalance = body.startingBalance;
        foundAccount.currentBalance = body.currentBalance;
        foundAccount.type = body.type;
        
        //Save updated account
        foundAccount
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: foundAccount._id,
                    message: "Account updated!"
                })
            })
            .catch(err => {
                return res.status(404).json({
                    err,
                    message: "Account not updated!",
                })
            })
        });
};

//Delete an account
deleteAccount = async (req, res) => {
    const body = req.body;

    //Check to see if request is valid
    if (!body) {
        return res.state(400).json({
            success: false,
            error: "You must provide an account to delete!",
        });
    }

//Delete account
await Account
    .findOneAndDelete({_id: req.params.id}, (err, foundAccount) => {
        if (err) {
            return res.state(400).json({
                success: false,
                error: err,
            })
        }
        //Check to see if account was found
        if (!foundAccount) {
            return res.status(404).json({
                success: false,
                error: "Account not found!",
            })
        }
        return res.status(200).json({
            success: true,
            data: foundAccount,
        })
    })
    .catch((err) => {console.log(err)});
};

//Get individual account
getAccountById = async (req, res) => {
    const body = req.body;

    //Check to see if request is valid
    if (!body) {
        return res.state(400).json({
            success: false,
            error: "You must provide an account to select!",
        });
    }

    //Find individual account
    await Account
        .findOne({_id: req.params.id}, (err, foundAccount) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                });
            } 

            //Check to see if account was found
            if (!foundAccount) {
                return res.status(404).json({
                    success: false,
                    error: "Account not found!",
                })
            };
            return res.status(200).json({
                success: true,
                data: foundAccount,
            });
        })
        .catch((err) => {console.log(err);});
};

getAccounts = async (req, res) => {
    await Account
        .find({}, (err, foundAccounts) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                })
            }
            if (!foundAccounts.length) {
                return res.status(404).json({
                    success: false,
                    error: "No accounts found!",
                })
            }
            return res.status(200).json({
                success: true,
                data: foundAccounts
            })
        })
        .sort({type: 1, name: 1})
        .catch((err) => {
            console.log(err);
        });  
};

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountById,
    getAccounts
    // updateTransaction
};
