import { useState } from "react"

export const EditTransactionForm = ({
    initialDescription,
    initialAmount,
    initialType,
    onSave,
    onCancel
}) => {
    const [description, setDescriptionEdit] = useState(initialDescription);
    const [transactionAmount, setTransactionAmount] = useState(initialAmount);
    const [transactionType, settransactionType] = useState(initialType);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onSave({
            description, transactionAmount, transactionType
        });
    };

    return (
        <form onSubmit={handleEditSubmit} className="">
            <div className="add-transaction mg-btm-0p5rem">
                <input type="text" placeholder="Description" required 
                    value={description} 
                    onChange={(e) => {setDescriptionEdit(e.target.value)}}
                />
                <input type="number" placeholder="Amount" required 
                    value={transactionAmount}
                    onChange={(e) => {setTransactionAmount(e.target.value)}}
                />
                <input type="radio" id="expense-edit" value="expense"
                    checked = {transactionType === "expense"}
                    onChange={(e) => {settransactionType(e.target.value)}}
                />
                <label htmlFor="expense-edit" style={{color:"red"}}>Expense</label>
                <input type="radio" id="income-edit" value="income" 
                    checked = {transactionType === "income"}
                    onChange={(e) => {settransactionType(e.target.value)}}
                />
                <label htmlFor="income-edit" style={{color:"green"}}>Income</label>
            </div>
            <div className="mg-btm-0p5rem">
                <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}