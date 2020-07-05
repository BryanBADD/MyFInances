import React from "react";

function Header(props) {

    return (
        <div className="row header" id="heading">
            <div className="col-lg-4"><h1>My Finances</h1></div>
            <div className="col-lg-2 header"><p className="navigation vertical-center" onClick={props.onCashFlow}>{props.navigation}</p></div>
        </div>);
}

export default Header;
