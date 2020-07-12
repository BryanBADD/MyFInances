import React, { useState } from 'react';
import Header from "./header-footer/Header";
import Footer from "./header-footer/Footer";
import NewTransaction from "./transactions/NewTransaction";
import Accounts from "./accounts/Accounts";
import Transaction from "./transactions/Transaction";
import TransactionHeading from "./transactions/TransactionHeadings";
import NewAccount from "./accounts/NewAccount";
import api from "../api";
import ReconcileAcct from "./reconcile-account/ReconcileAccount";
import ReconcileHeading from "./reconcile-account/ReconcileHeading";
import ReconcileSummary from "./reconcile-account/ReconcileSummary";
import TransferMoney from "./transactions/TransferFunds";
import CashFlow from "./cash-flow/cash-flow";

  
let existingAccounts = "";
let existingTransactions = "";
const a = "Checking";
let statementBalance = "";
let navLabel = "Cash Flow Report";

function App(props) {

  let currentAccount = [];
  let overallBalance = 0;
  let runningTotal = 0;
  let showBalance = 0;
  let oBalance = 0;
  let focusedAccount = [];
  let unReconciledTotal = 0;
  const [sBalance, setSBalance] = useState("");
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState(a);
  const [transactions, setTransactions] = useState([]);
  const [isReconciling, setIsReconciling] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showCashFlow, setShowCashFlow] = useState(false);
  
  
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
        const cTrans = existingTransactions.filter(t => t.isCleared === false);
        if (transactions.length !== existingTransactions.length) {
          setTransactions(cTrans);
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
      currentAccount = accounts.filter(account => account.name=== clickedAccountName);
      setTransactions([]);
      setAccountName(clickedAccountName);
  }

  function reconcileAcct() {
    statementBalance = prompt("What is the balance on your statement?");
    if (statementBalance !== null) {setIsReconciling(!isReconciling);}
    
  }

  function finishReconcile() {
    statementBalance = "";
    setIsReconciling(false);
  }

  function handleCheckboxClick(isChecked, transaction) {
        
        if (isChecked) {
          transactions.forEach(t => { 
            if (t._id === transaction.id) {
              t.isCleared = true;
              api.updateTransactionById(t._id, t);
            }
          });
          setSBalance("Y");
        }
        if (!isChecked) {
          transactions.forEach(t => { 
            if (t._id === transaction.id) {
              t.isCleared = false;
              api.updateTransactionById(t._id, t);
            }
          });
          setSBalance("N");
        }
  }

  function transferMoney() {
    setIsTransferring(!isTransferring);
  }

  function cashFlowReport() {
    setShowCashFlow(!showCashFlow);
    if (showCashFlow) {navLabel = "Return"} else {navLabel = "Cash Flow Report"}
    }

  function processTransfer(transfer) {
    
    //Get IDs and current balances for From and To accounts
    const fAccount = accounts.filter(account => account.name === transfer.fromAccount);
    const tAccount = accounts.filter(account => account.name === transfer.toAccount);
    
    //Create transaction for From account
    const fAccountTrans = {
      date: transfer.date,
      account: fAccount[0].name,
      description: "Transfer to " + tAccount[0].name,
      amount: 0 - transfer.amount,
      accountId: fAccount[0]._id,
      isCleared: false,
      category: "Transfer",
      subcategory: "[" + tAccount[0].name + "]"
    };

    //Create transaction for To account
    const tAccountTrans = {
      date: transfer.date,
      account: tAccount[0].name,
      description: "Transfer from " + fAccount[0].name,
      amount: transfer.amount,
      accountId: tAccount[0]._id,
      isCleared: false,
      category: "Transfer",
      subcategory: "[" + fAccount[0].name + "]"
    };

    //Add transaction to From account
    addTransaction(fAccountTrans);

    //Add transaction to To account
    addTransaction(tAccountTrans);

    //Reset isTransferring
    setIsTransferring(false);
  }

  getExistingAccounts();
  getFocusedAcct();
  
  let style = "col-lg-4 column-heading right-align";
  
  return (
    <div>
      <Header 
        navLabel={navLabel}
        onCashFlow={cashFlowReport}
        onAdd={addingTransaction} />
      {showCashFlow ? 
        <div className="container">
          <CashFlow />
        </div>:
        <div className="container">
      <div className="row">
        {accounts.length > 0 && 
          <div className="col-lg-8 transaction-column">
            {isReconciling ?
              <div>
                <ReconcileHeading 
                  accountName={accountName}
                  onFinish={finishReconcile} />
                {transactions.map((transaction, index) => {
                  if (!transaction.isCleared) {unReconciledTotal = parseFloat(unReconciledTotal) + parseFloat(transaction.amount);}
                  return (<ReconcileAcct 
                    key={index}
                    id={transaction._id}
                    whichOne={index}
                    length={transactions.length}
                    accountName={accountName}
                    date={transaction.date}
                    description={transaction.description}
                    sBalance={sBalance}
                    isCleared={transaction.isCleared}
                    amount={transaction.amount}
                    currentBalance={focusedAccount[0].currentBalance}
                    onCheckboxClick={handleCheckboxClick}
                  />)})}
              </div>:
              <div>
               <TransactionHeading 
                account={accountName}
                onReconcile={reconcileAcct} 
                onTransfer={transferMoney}
                onAdd={addingTransaction} />
                {isTransferring && <TransferMoney 
                  accountsArray={accounts}
                  onProcessTransfer={processTransfer}
                />}
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
            }
          </div>
        }
        <div className="col-lg-4 accounts-column">
            {isReconciling ?
              <div>
                <ReconcileSummary 
                accountName={accountName}
                statementBalance={statementBalance}
                currentBalance={focusedAccount[0].currentBalance}
                unReconciledTotal={unReconciledTotal} />
              </div>:
              <div>
                <div>
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
            }
        </div>
      </div>
    </div> 
      }
      <Footer />
    </div>
  );
}


export default App;
