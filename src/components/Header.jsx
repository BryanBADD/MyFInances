import React from "react";

function cashFlowReport() {
    console.log("Cash flow report");
}

function Header(props) {

    

    return (
        <div className="row header" id="heading">
            <div className="col-lg-4"><h1>My Finances</h1></div>
            <div className="col-lg-2 header"><p className="navigation vertical-center" onClick={cashFlowReport}>Cash Flow</p></div>
        </div>);
}

export default Header;
