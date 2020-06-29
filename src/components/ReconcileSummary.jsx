import React from "react";

function reconcileSummary(props) {

    return (
        <div className="col-lg-12 accounts-column">
                <div className="row accountName">
                    <div className="col-lg-12">{props.accountName} Account</div>
                </div>
                <div className="row heading-row">
                    <div className="col-lg-12 column-heading">Account Summary</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-6 accountsDetail">Current Balance:</div>
                    <div className="col-lg-6 accountsDetail">$$account balance$$</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-6 accountsDetail">UnReconciled Transactions:</div>
                    <div className="col-lg-6 accountsDetail">$$UnReconciled Total$$</div>
                </div>
                <div className="row accountRows">
                    <div className="col-lg-6 accountsDetail">Ending Balance:</div>
                    <div className="col-lg-6 accountsDetail">$$ending balance$$</div>
                </div>
            </div>
    );

}

export default reconcileSummary;