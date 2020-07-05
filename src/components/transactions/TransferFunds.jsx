import React, {useState} from "react";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function TransferFunds(props) { 
    
    const [transfer, setTransfer] = useState([{
        date: "",
        fromAcct: "",
        toAcct: "",
        amount: "",
        memo: ""
    }]);
    
    function handleChange(event) {
        const {name, value} = event.target;
        
        setTransfer(prevTransfer => {
        return {...prevTransfer, [name]: value}
        });
    }

    function sendTransfer() {
        props.onProcessTransfer(transfer);

        setTransfer([{
            date: "",
            fromAcct: "",
            toAcct: "",
            amount: "",
            memo: ""
        }]);
    }

    return (
        <div className="container transaction-container">
            <div className="col-lg-12 input-column">
                <div className="row">
                    <div className="col-lg-10 input-column">
                        <div className="row new-transaction-row">
                            <div className="col-lg-2 input-column"><input className="newTransactionInput" name="date" onChange={handleChange} value={transfer.date} type="text" placeholder="Date"/></div>
                            <div className="col-lg-1 input-column">
                                <p className="radio-button-label">From:</p>
                            </div>
                            <div className="col-lg-6 input-column">
                                <select name="fromAccount" onChange={handleChange} className="select-css">
                                    <option style={{color: "#d3d3d3"}}>Select account</option>
                                    {props.accountsArray.map((account, index) => {
                                        const key = "f" + index;
                                        return (
                                            <option key={key} value={account.name}>{account.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-2 input-column right-align"><input className="newTransactionInput" name="amount" onChange={handleChange} value={transfer.amount} type="text" placeholder="Amount"/></div>
                        </div>
                        <div className="row new-transaction-row">
                            <div className="col-lg-2 input-column"></div>
                            <div className="col-lg-1 input-column">
                                <p className="radio-button-label">To:</p>
                            </div>
                            <div className="col-lg-6 input-column">
                                <select name="toAccount" onChange={handleChange} className="select-css">
                                <option style={{color: "#d3d3d3"}}>Select account</option>
                                    {props.accountsArray.map((account, index) => {
                                        const key = "t" + index;
                                        return (
                                            <option key={key} value={account.name}>{account.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 input-column right-align vertical-center">
                        <button title="Deposit Money" className="btn btn-xs btn-mini btn-outline-success" onClick={sendTransfer} id="transfer"><AttachMoneyIcon /></button>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default TransferFunds;
