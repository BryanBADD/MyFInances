import React from "react";

function transactionHeading() {
  return (
  <div className="row heading-row">
    <div className="column-heading col-lg-1">Date</div>
    <div className="column-heading col-lg-7">Description</div>
    <div className="column-heading col-lg-2 right-align">Amount</div>
    <div className="column-heading col-lg-2 right-align">Balance</div>
  </div>
)
}

export default transactionHeading;
