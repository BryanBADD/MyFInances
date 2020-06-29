import React, {useState} from "react";
import EditTransaction from "./EditTransaction";
import CurrentTransaction from "./CurrentTransaction";


function Transaction(props) {

  const [isEditing, setIsEditing] = useState(false);
 
  function editTransaction() {
    setIsEditing(!isEditing);
  }

  function resetIsEditing() {
    setIsEditing(false);
  }

  function updateTransaction(transaction) {
    props.onUpdate(transaction);
    resetIsEditing();
  }

  function deleteTransaction(transaction) {
    props.onDelete(transaction);
  }

return ( 
  <div>
    {isEditing ? <EditTransaction 
      key={props.index}
      id={props.id}
      accountId={props.accountId}
      date={props.date}
      isCleared={props.isCleared}
      description={props.description}
      account={props.account}
      amount={props.amount}
      category={props.category}
      subcategory={props.subcategory}
      memo={props.memo}
      balance={props.balance}
      onResetEdit={resetIsEditing}
      onEdit={updateTransaction}
      onAdd={props.addTransaction}
      onDelete={deleteTransaction}/> :
    
    <CurrentTransaction 
      key={props.index}
      id={props.id}
      accountId={props.accountId}
      date={props.date}
      isCleared={props.isCleared}
      description={props.description}
      account={props.account}
      amount={props.amount}
      category={props.category}
      subcategory={props.subcategory}
      memo={props.memo}
      balance={props.balance}
      onResetEdit={resetIsEditing}
      onEdit={editTransaction}
      onAdd={props.addTransaction}
      onDelete={deleteTransaction}/>
    }
  </div>
  );
          
}
      
    
export default Transaction;
