import React from "react";

function Accounts(props) {
  let style = "col-lg-4 accountsDetail right-align";
  
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.currentBalance);

  if (props.currentBalance < 0) { style = "col-lg-4 accountsDetail right-align negative-transaction" };
  
  function handleClick() {
    props.onClick(props.name);
  }  

  return (
      <div className="row accountRows">
          <div onClick={handleClick} name={props.name} value={props.name} className={"col-lg-8 accountsDetail account-link"}>{props.name}</div>
          <div className={style}>{balance}</div>
        </div>
    )
};

export default Accounts;
