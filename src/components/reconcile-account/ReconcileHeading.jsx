import React from "react";

function reconcileHeading(props) {
    
    function finishReconcile() {
        props.onFinish();
    }
    
    return (
        <div>
            <div className="row accountName">
                <div className="col-lg-6 ">{props.accountName} Account</div>
                <div className="col-lg-6 vertical-center"><p className="navigation vertical-center" onClick={finishReconcile}>Finish</p></div>
            </div>
            <div className="row heading-row">
                <div className="column-heading col-lg-1">R</div>
                <div className="column-heading col-lg-2">Date</div>
                <div className="column-heading col-lg-7">Description</div>
                <div className="column-heading col-lg-2 right-align">Amount</div>
            </div>
        </div>
    )
}

export default reconcileHeading;