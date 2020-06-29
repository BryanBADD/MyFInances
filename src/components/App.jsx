/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import NewTransaction from "./NewTransaction";
import Accounts from "./Accounts";
import Transaction from "./Transaction";
import TransactionHeading from "./TransactionHeadings";
import NewAccount from "./NewAccount";
import api from "../api";
import ReconcileAcct from "./ReconcileAccount";
import ReconcileHeading from "./ReconcileHeading";
import ReconcileSummary from "./ReconcileSummary";

  

let existingAccounts = "";
let existingTransactions = "";
const a = "Checking";

function App(props) {

  let currentAccount = [];
  let overallBalance = 0;
  let runningTotal = 0;
  let showBalance = 0;
  let oBalance = 0;
  let focusedAccount = [];
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState(a);
  const [transactions, setTransactions] = useState([]);
  const [isReconciling, setIsReconciling] = useState(false);
  
  
  function getAccounts() {
    return api.getAllAccounts();
  }

  function getTransactions(acctId) {
    return api.getAllTransactions(acctId);
  }

  async function getExistingAccounts() {
      await getAccounts().then((value) => {
      existingAccounts = value.data.data;
      if (accounts.length !== existingAccounts.length) {
        setAccounts(existingAccounts);
        };
      
      })
      .catch(err => {
        console.error("Connection error", err.message)
    });

  }

  function getFocusedAcct() {
    focusedAccount = accounts.filter(account => account.name === accountName);
    if (focusedAccount.length !== 0) {
      getExistingTransactions(focusedAccount[0]._id);
    }
  }
  
  async function getExistingTransactions(acctId) {
    
    await getTransactions(acctId)
      .then((value) => {
        
        existingTransactions = value.data.data;
        if (transactions.length !== existingTransactions.length) { 
          setTransactions(existingTransactions);
          }})
      .catch(err => {
        console.error("Connection error", err.message)
    });

  }

  function addingAccount() {
    setIsAddingAccount(!isAddingAccount);
  }

  function resetIsAddingAccount() {
    setIsAddingAccount(false);
  }

  function addAccount(newAccount) {
    api.insertAccount(newAccount);
    accounts.push(newAccount);
    setAccounts(prevAccounts => {
      return [...prevAccounts];});
    setAccountName(newAccount.name);
    setTransactions([]);
    window.location.reload(); 
  }

  function addingTransaction() {
    setIsAddingTransaction(!isAddingTransaction);
  }

  function resetIsAddingTransaction() {
    setIsAddingTransaction(false);
  }

  function addTransaction(newTransaction) {
    currentAccount = accounts.filter(account => account.name=== newTransaction.account);
    currentAccount[0].currentBalance = parseFloat(currentAccount[0].currentBalance) + parseFloat(newTransaction.amount);
    newTransaction.accountId = currentAccount[0]._id;
    newTransaction.account = "";
    api.updateAccountById(currentAccount[0]._id, currentAccount[0]);
    api.insertTransaction(newTransaction);
    getExistingTransactions(newTransaction.accountId);
  }
  
  function deleteTransaction(transaction) {
    const cAccount = accounts.filter(account => account._id === transaction.accountId);
    console.log(transaction.id, transaction);
    cAccount[0].currentBalance = parseFloat(cAccount[0].currentBalance) - parseFloat(transaction.amount);
    api.deleteTransactionById(transaction.id, transaction);
    api.updateAccountById(cAccount[0]._id, cAccount[0]);
    changeAccount(cAccount[0].name);
  }

  function deleteAccount(id) {
    setAccounts(prevAccounts => {
      return prevAccounts.filter((indAccount, index) => {
        return index !== id;
      })
    })
  }

  function updateTransaction(transaction) {
    const cTrans = transactions.filter(t => t._id === transaction.id);
    const cAccount = accounts.filter(account => account._id === transaction.accountId);
    cAccount[0].currentBalance = parseFloat(cAccount[0].currentBalance) - parseFloat(cTrans[0].amount) + parseFloat(transaction.amount);
    api.updateTransactionById(transaction.id, transaction);
    api.updateAccountById(cAccount[0]._id, cAccount[0]);
    getExistingTransactions(cAccount[0]._id);
    changeAccount(cAccount[0].name);
  }
  
  function changeAccount(clickedAccountName) {
      setTransactions([]);
      setAccountName(clickedAccountName);
  }

  function reconcileAcct() {
    setIsReconciling(!isReconciling);
  }

  function finishReconcile() {
    console.log("Finish reconcile");
    setIsReconciling(false);
  }

  getExistingAccounts();
  getFocusedAcct();
  
  let style = "col-lg-4 column-heading right-align";
  

  return (
    <div>
      <Header onAdd={addingTransaction}/>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {accounts.length > 0 && 
              <div >
                {isReconciling ? 
                  <div className="row">
                    <div className="col-lg-8 transaction-column">
                      <ReconcileHeading 
                        accountName={accountName}
                        onFinish={finishReconcile}/>
                      {transactions.map((transaction, index) => {
                        return (<ReconcileAcct 
                          key={index}
                          id={transaction._id}
                          accountName={accountName}
                          date={transaction.date}
                          description={transaction.description}
                          amount={transaction.amount}
                        />)})}
                      </div>
                      <div className="col-lg-4 accounts-column">
                        <ReconcileSummary 
                          accountName={accountName}
                        />
                      </div>
                  </div>:
                  <div>
                    <div className="row">
                      <div className="col-lg-8 transaction-column">
                        <div>
                            <div className="row accountName">
                              <div className="col-lg-6 ">{accountName} Account</div>
                              <div className="col-lg-2 vertical-center"><p className="navigation vertical-center" onClick={addingTransaction}>Add Transaction</p></div>
                              <div className="col-lg-4 vertical-center"><p className="navigation vertical-center" onClick={reconcileAcct}>Reconcile</p></div>
                            </div>
                            <div>
                              <TransactionHeading />
                                {isAddingTransaction && <NewTransaction
                                  account={accountName} 
                                  onAdd={addTransaction}
                                  onSubmit={resetIsAddingTransaction}
                                />}
                                
                                {transactions.map((transaction, index) => {
                                  showBalance = parseFloat(runningTotal);
                                  index === 0 && (runningTotal = parseFloat(focusedAccount[0].currentBalance));
                                  index === 0 && (showBalance = parseFloat(focusedAccount[0].currentBalance));
                                  runningTotal = parseFloat(runningTotal) - parseFloat(transaction.amount);
                                  return <Transaction 
                                    key={index}
                                    id={transaction._id}
                                    accountId={transaction.accountId}
                                    account={accountName}
                                    date={transaction.date}
                                    description={transaction.description}
                                    amount={transaction.amount}
                                    category={transaction.category}
                                    subcategory={transaction.subcategory}
                                    memo={transaction.memo}
                                    balance={showBalance}
                                    isCleared={transaction.isCleared}
                                    onDelete={deleteTransaction}
                                    onUpdate={updateTransaction} />
                                  })
                                }
                            </div> 
                          </div>      
                      </div>
                      <div className="col-lg-4 accounts-column">
                          <div className="row accountName">
                            <div className="col-lg-6 ">Accounts</div>
                            <div className="col-lg-6 vertical-center"><p onClick={addingAccount} className="navigation vertical-center" >Add Account</p></div>
                          </div> 
                          <div className="row heading-row">
                            <div className="col-lg-8 column-heading">Account</div>
                            <div className="col-lg-4 column-heading right-align">Balance</div>
                          </div>
                          {isAddingAccount && <NewAccount 
                            onAdd={addAccount}
                            onSubmit={resetIsAddingAccount}
                            />
                          }
                          {accounts.map((account, index) => {
                            overallBalance = parseFloat(overallBalance) + parseFloat(account.currentBalance);
                            overallBalance < 0 && (style="col-lg-4 column-heading right-align negative-transaction");
                            oBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(overallBalance);
                            return (
                            <Accounts 
                              key={index}
                              id={index}
                              name={account.name}
                              startingBalance={account.startingBalance}
                              currentBalance={account.currentBalance}
                              onAdd={addTransaction}
                              onClick={changeAccount}
                              onDelete={deleteAccount}
                            />)})
                          }
                          {accounts.length > 0 && 
                            <div className="row bottom-row">
                              <div className="col-lg-8 column-heading">Total</div>
                              <div className={style}>{oBalance}</div>
                            </div>
                          }
                        </div>
                    </div>
                  </div>
                }
              </div>
            }
            </div>
        </div>
      </div>  
      <Footer />
    </div>
  );
}

export default App;
