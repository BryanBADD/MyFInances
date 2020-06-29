import React, {useState} from "react";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";



function EditTransaction(props) {
  
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.balance);
  const transDate = new Date(props.date);
  const month = transDate.getMonth() + 1;
  const day = transDate.getDate();
  const showDate = month + "/" + day;
  const [editedTransaction, setEditedTransaction] = useState({
    isCleared: props.isCleared,
    id: props._id,
    accountId: props.accountId,
    date: showDate,
    description: props.description,
    account: props.account,
    amount: props.amount,
    category: props.category,
    subcategory: props.subcategory,
    memo: props.memo,
  })
  
  let amountCellStyle = "col-lg-2 transaction-detail right-align";
  let balanceCellStyle = amountCellStyle;
  let amountInputStyle = "newTransactionInput right-align";
  let balanceInputStyle = amountInputStyle;
  
  function handleChange(event) {
    const {name, value} = event.target;

    setEditedTransaction(prevTransaction => {
        return {...prevTransaction, [name]: value}
      });
  }
  
  function handleSave() {
    if (!editedTransaction.date) {alert("Your transaction must have a date!"); return null;}
    if (!editedTransaction.description) {alert("Your transaction must have a description!"); return null;}
    if (!editedTransaction.amount) {alert("Your transaction must have a amount!"); return null;}
    if (!editedTransaction.category) {editedTransaction.category = "Uncategorized"};
    editedTransaction.amount = parseFloat(editedTransaction.amount);
    editedTransaction.id = props.id;
    editedTransaction.memo = props.memo;
    props.onEdit(editedTransaction);
    setEditedTransaction({
      accountId: "",
      date: "",
      description: "",
      isCleared: false,
      account: "",
      amount: "",
      category: "",
      subcategory: "",
      memo: ""
    })
  }

  function handleCancel() {
    props.onResetEdit();
  }
  
  if (props.amount < 0) {amountCellStyle = "col-lg-2 transaction-detail right-align negative-transaction";
        amountInputStyle = "newTransactionInput right-align negative-transaction";};
  if (props.balance < 0) {balanceCellStyle = "col-lg-2 transaction-detail right-align negative-transaction";
        balanceInputStyle = "newTransactionInput right-align negative-transaction";};
      return (<div>
        <div className="container transaction-container">
          <div className="row">
            <div className="col-lg-1 transaction-detail"><input className="newTransactionInput" autoFocus="true" name="date" onChange={handleChange} value={editedTransaction.date} type="text"/></div>
            <div className="col-lg-7 transaction-detail"><input className="newTransactionInput" name="description" onChange={handleChange} value={editedTransaction.description} type="text"/></div>
            <div className={amountCellStyle}><input className={amountInputStyle} name="amount" onChange={handleChange} value={editedTransaction.amount} type="text"/></div>
            <div className={balanceCellStyle}><input className={balanceInputStyle} name="balance" onChange={handleChange} value={balance} type="text"/></div>
          </div>
    
          <div className="row">
            <div className="col-lg-1 transaction-detail"></div>
            <div className="col-lg-3 transaction-detail"><select name="category" onChange={handleChange} className="select-css" value={editedTransaction.category}>
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
                </select></div>
            <div className="col-lg-3 input-column right-align"><input name="subcategory" onChange={handleChange} className="newTransactionInput" value={editedTransaction.subcategory} type="text" /></div>
            <div className="col-lg-4 input-column right-align"><input name="memo" onChange={handleChange} className="newTransactionInput" value={editedTransaction.memo} type="text" /></div>
            <div className="col-lg-1 input-column right-align"><button title="Cancel Update" onClick={handleCancel} className="btn btn-xs btn-mini btn-outline-secondary btn-transaction" id="cancel"><CancelIcon className="svg_icons"/></button>
            <button title="Update Transaction" className="btn btn-xs btn-mini btn-outline-secondary btn-transaction" onClick={handleSave} id="save"><SaveIcon className="svg_icons"/></button></div>
          </div>
        </div>
        </div>)
    
  }
  

  export default EditTransaction;