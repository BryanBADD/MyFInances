import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';

function NewAccount(props) {
    const [newAccount, setNewAccount] = useState({
        name: "",
        type: "",
        startingBalance: 0,
        currentBalance: 0
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setNewAccount(prevAccount => {
            return {...prevAccount, [name]: value};
        })
    }

    function handleRadioButtonClick(event) {
        const selection = (event.target);
        if (selection.id === "credit-card") {
            newAccount.type = "Credit Card";
        };
        if (selection.id === "banking") {
           newAccount.type = "Banking";
        };
    }

    function addNewAccount() {
    if (!newAccount.name) {alert("Your account must have a name!"); return null;}
    newAccount.startingBalance = parseFloat(newAccount.startingBalance);
    newAccount.currentBalance = parseFloat(newAccount.startingBalance);
    props.onAdd(newAccount);
    setNewAccount({
        name: "",
        startingBalance: 0,
        currentBalance: 0
    })
    props.onSubmit();
}

    return (
        <div >
            <div className="row accountRows">
                <div className="col-lg-5 accounts-column"><input onChange={handleChange} className="new-account-input" name="name" type="text" placeholder="Account Name"></input></div>
                <div className="col-lg-5 accounts-column right-align"><input onChange={handleChange} className="new-account-input" name="startingBalance" type="text" placeholder="Starting Balance"></input></div>
                <div className="col-lg-2 accounts-column"><button className="btn btn-xs btn-mini add-account-btn" title="Add Account" onClick={addNewAccount}><AddIcon /></button></div>
            </div>
        
            <div className="row accountRows new-account-row">
                <div className="col-lg-12 accounts-column btn-group btn-group-toggle" datatoggle="buttons">
                    <input className="radio-button" onChange={handleRadioButtonClick} type="radio" id="banking" name="acctType" value="Banking" checked={true}></input>
                    <label className="radio-button-label" htmlFor="banking"> Banking </label>
                    <input className="radio-button" onChange={handleRadioButtonClick} type="radio" id="credit-card" name="acctType" value="Credit Card"></input>
                    <label className="radio-button-label" htmlFor="credit-card"> Credit Card </label>
                    
                    
                    {/* <label className="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" onChange={handleRadioButtonChange} autoComplete="off" checked> Banking </input>
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" onChange={handleRadioButtonChange} autoComplete="off" > Credit Card </input>
                    </label> */}
                </div>
            </div>
        </div>
    )
}

export default NewAccount;