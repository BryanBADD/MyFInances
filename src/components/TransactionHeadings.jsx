import React from "react";

function transactionHeading(props) {
  
  return (
    <div>
      <div className="row accountName">
        <div className="col-lg-6 ">{props.transactionHeadingaccountName} Account</div>
        <div className="col-lg-2 vertical-center"><p className="navigation vertical-center" onClick={props.onAdd}>Add Transaction</p></div>
        <div className="col-lg-4 vertical-center"><p className="navigation vertical-center" onClick={props.onReconcile}>Reconcile</p></div>
      </div>
      <div className="row heading-row">
        <div className="column-heading col-lg-1">Date</div>
        <div className="column-heading col-lg-7">Description</div>
        <div className="column-heading col-lg-2 right-align">Amount</div>
        <div className="column-heading col-lg-2 right-align">Balance</div>
      </div>
    </div>
)
}

export default transactionHeading;
