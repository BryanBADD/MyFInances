import React from "react";

function ReconcileSummary(props) {
    
    let unReconciledTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.unReconciledTotal);
    const currentBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.currentBalance);
    let endingBalance = parseFloat(props.statementBalance) + parseFloat(props.unReconciledTotal);
    let difference = parseFloat(props.statementBalance) - parseFloat(endingBalance);
    difference = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(difference);
    let stmntBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.statementBalance);
    endingBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(endingBalance);

     return (
        <div className="col-lg-12 accounts-column">
                <div className="row accountName">
                    <div className="col-lg-12">{props.accountName} Account</div>
                </div>
                <div className="row heading-row">
                    <div className="col-lg-12 column-heading">Account Summary</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-9 accountsDetail">Ledger Balance:</div>
                    <div className="col-lg-3 accountsDetail">{currentBalance}</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-9 accountsDetail">Statement Balance:</div>
                    <div className="col-lg-3 accountsDetail">{stmntBalance}</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-9 accountsDetail">Outstanding Transactions:</div>
                    <div className="col-lg-3 accountsDetail">{unReconciledTotal}</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-9 accountsDetail">Adjusted Balance:</div>
                    <div className="col-lg-3 accountsDetail">{endingBalance}</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-9 accountsDetail">Difference:</div>
                    <div className="col-lg-3 accountsDetail">{difference}</div>
                </div>
            </div>
    );

}

export default ReconcileSummary;