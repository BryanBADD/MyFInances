import React from "react";

function reconcileAccount(props) {
    const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.amount);
    const transDate = new Date(props.date);
    const month = transDate.getMonth() + 1;
    const day = transDate.getDate();
    const showDate = month + "/" + day;

    function handleClick() {
        let isChecked = document.getElementById(props.id).checked;
        props.onCheckboxClick(isChecked, props.amount);
    }

    return (
        <div className="transaction-container">
            <div className="row new-transaction-column">
                <div className="col-lg-1 transaction-detail"><input type="checkbox" onChange={handleClick} id={props.id} value={props.id} name="reconciled"></input></div>
                <div className="col-lg-2 transaction-detail">{showDate}</div>
                <div className="col-lg-7 transaction-detail">{props.description}</div>
                <div className="col-lg-2 transaction-detail right-align">{amount}</div>
            </div>
        </div>
    )
}

export default reconcileAccount;