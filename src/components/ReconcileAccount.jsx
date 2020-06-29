import React from "react";

function reconcileAccount(props) {
    // const [isChecked, setIsChecked] = useState(false);

    const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.amount);
    const transDate = new Date(props.date);
    const month = transDate.getMonth() + 1;
    const day = transDate.getDate();
    const showDate = month + "/" + day;

    function handleClick() {
        console.log("Checkbox clicked");
    }

    return (
        <div className="row">
            <div className="col-lg-12 transaction-container">
                <div className="row transaction-column">
                    <div className="col-lg-1 transaction-detail"><input type="checkbox" onClick={handleClick} id="reconciled" name="reconciled"></input></div>
                    <div className="col-lg-2 transaction-detail">{showDate}</div>
                    <div className="col-lg-7 transaction-detail">{props.description}</div>
                    <div className="col-lg-2 transaction-detail right-align">{amount}</div>
                </div>
            </div>
        </div>
    )
}

export default reconcileAccount;