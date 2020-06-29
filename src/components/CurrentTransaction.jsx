import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



function CurrrentTransaction(props) {

  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.amount);
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.balance);
  const transDate = new Date(props.date);
  const month = transDate.getMonth() + 1;
  const day = transDate.getDate();
  const showDate = month + "/" + day;
  

  let subCategoryLabel = "";
  let amountCellStyle = "col-lg-2 transaction-detail right-align";
  let balanceCellStyle = amountCellStyle;
  
  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this " + amount + " transaction? This can not be undone!")) {
            props.onDelete(props);
        }
    }

  function handleEdit() {
    props.onEdit(props.account);
  }
  
  //Add subcategory to the transaction display if there is one
  if (props.subcategory !== "") {subCategoryLabel = ":" + props.subcategory};

  //Set style of the transaction amount and balance display based on value of those variables
  if (props.amount < 0) {amountCellStyle = "col-lg-2 transaction-detail right-align negative-transaction";};
  if (props.balance < 0) {balanceCellStyle = "col-lg-2 transaction-detail right-align negative-transaction";};
      return (<div>
        <div className="container transaction-container">
          <div className="row">
            <div className="col-lg-1 transaction-detail ">{showDate}</div>
            <div className="col-lg-7 transaction-detail "> {props.description} </div>
            <div className={amountCellStyle}>{amount}</div>
            <div className={balanceCellStyle}>{balance} </div>
          </div>
    
          <div className="row">
            <div className="col-lg-1 transaction-detail"></div>
            <div className="col-lg-4 transaction-detail">{props.category}{subCategoryLabel}</div>
            <div className="col-lg-6 input-column">{props.memo}</div>
            <div className="col-lg-1 input-column right-align"><button title="Edit Transaction" onClick={handleEdit} className="btn btn-xs btn-mini btn-outline-secondary btn-transaction"><EditIcon className="svg_icons"/></button>
            <button title="Delete Transaction" className="btn btn-xs btn-mini btn-outline-secondary btn-transaction" onClick={handleDelete}><DeleteIcon className="svg_icons"/></button></div>
          </div>
        </div>
        
        </div>)
    
  }
  

  export default CurrrentTransaction;