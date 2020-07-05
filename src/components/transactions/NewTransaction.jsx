/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function newTransaction(props) {
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    accountId: "",
    amount: "",
    category: "",
    subcategory: "",
    isCleared: false
  });
  
  function handleChange(event) {
    const {name, value} = event.target;

    setTransaction(prevTransaction => {
      return {...prevTransaction, [name]: value}
    });
  }

  function handleSpend() {
    const amount= 0 - transaction.amount;
    transaction.amount = amount;
    sendTransaction();
  }

  function sendTransaction() {
    if (!transaction.date) {alert("Your transaction must have a date!"); return null;}
    if (!transaction.description) {alert("Your transaction must have a description!"); return null;}
    if (!transaction.amount) {alert("Your transaction must have a amount!"); return null;}
    if (!transaction.category) {transaction.category = "Uncategorized"};
    transaction.amount = parseFloat(transaction.amount);
    transaction.accountId = props.accountId;
    transaction.account = props.account;
    props.onAdd(transaction);
    setTransaction({
      date: "",
      description: "",
      isCleared: false,
      accountId: "",
      account: "",
      amount: "",
      category: "",
      subcategory: "",
      memo: ""
    })
    props.onSubmit();
  }

  return (
  <div className="container transaction-container">
    <div className="row">
      <div className="col-lg-10 input-column">
        <div className="row new-transaction-row">
        <div className="col-lg-2 input-column"><input className="newTransactionInput" name="date" onChange={handleChange} value={transaction.date} type="text" placeholder="Date"/></div>
        <div className="col-lg-8 input-column"><input className="newTransactionInput" name="description" onChange={handleChange} value={transaction.description}type="text" placeholder="Description"/></div>
        <div className="col-lg-2 input-column right-align"><input className="newTransactionInput" name="amount" onChange={handleChange} value={transaction.amount}type="text" placeholder="Amount"/></div>
        </div>

        <div className="row new-transaction-row">
        <div className="col-lg-2 input-column"></div>
        <div className="col-lg-3 input-column">
          <select name="category" onChange={handleChange} className="select-css" placeholder="Select category">
            <option style={{color: "#d3d3d3"}}>Select a Category</option>
            <option value="Income">Income</option>
            <option value="Charity">Charity</option>
            <option value="Savings">Savings</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical/Health">Medical/Health</option>
            <option value="Personal">Personal</option>
            <option value="Recreation">Recreation</option>
            <option value="Debts">Debts</option>
          </select>
        </div>
        <div className="col-lg-4 input-column"><input name="subcategory" onChange={handleChange} className="newTransactionInput" value={transaction.subcategory} type="text" placeholder="SubCategory"/></div>
        <div className="col-lg-3 input-column"><input name="memo" onChange={handleChange} className="newTransactionInput" value={transaction.memo} type="text" placeholder="Memo"/></div>
        </div>
    </div>

    <div className="col-lg-2 input-column transaction-icons">
        <div className="row">
          <div className="col-lg-6 input-column right-align"></div>
          <div className="col-lg-6 input-column right-align">
            <button title="Deposit Money" className="btn btn-xs btn-mini btn-outline-success" onClick={sendTransaction} id="deposit"><AttachMoneyIcon /></button>
            <button title="Spend Money" className="btn btn-xs btn-mini btn-outline-danger" onClick={handleSpend} id="spend"><AttachMoneyIcon /></button></div>
        </div>
      </div>
    </div>
  </div> 
    )
}

export default newTransaction;

