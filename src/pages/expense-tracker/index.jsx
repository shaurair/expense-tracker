import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {signOut} from "firebase/auth"
import {useAddTransaction} from "../../hooks/useAddTransaction"
import {useGetTransactions} from "../../hooks/useGetTransactions"
import {useUpdateTransaction} from "../../hooks/useUpdateTransaction"
import {useDeleteTransaction} from "../../hooks/useDeleteTransaction"
import {useGetUserInfo} from "../../hooks/useGetUserInfo"
import {EditTransactionForm} from "../../components/EditTransactionForm"
import 'bootstrap/dist/css/bootstrap.css'
import "./styles.css"
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const {addTransaction} = useAddTransaction();
    const {transactions, transactionTotals} = useGetTransactions();
    const {updateTransaction} = useUpdateTransaction();
    const {deleteTransaction} = useDeleteTransaction();
    const {balance, expenses, income} = transactionTotals;
    const {userID, name, profilePhoto} = useGetUserInfo();

    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTranctionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");

    const [editingId, setEditingId] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType
        });

        setDescription("");
        setTranctionAmount("");
    }

    const signUserOut = async() => {
        try {
            if(userID !== "userID") {
                await signOut(auth);
            }
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
          navigate("/");
        }
      }, [navigate]); 

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {
                            balance >= 0 
                            ? (<h2>${balance}</h2>)
                            : (<h2>-${balance * -1}</h2>)
                        }
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expenses}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required 
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                        <input type="number" placeholder="Amount" required 
                            value={transactionAmount}
                            onChange={(e) => {setTranctionAmount(e.target.value)}}
                        />
                        <input type="radio" id="expense" value="expense"
                            checked = {transactionType === "expense"}
                            onChange={(e) => {setTransactionType(e.target.value)}}
                        />
                        <label htmlFor="expense" style={{color:"red"}}>Expense</label>
                        <input type="radio" id="income" value="income" 
                            checked = {transactionType === "income"}
                            onChange={(e) => {setTransactionType(e.target.value)}}
                        />
                        <label htmlFor="income" style={{color:"green"}}>Income</label>

                        <button type="submit" className="btn btn-outline-primary">Add</button>
                    </form>
                </div>
                {
                    profilePhoto && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto}/>
                        <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
                    </div>
                    )
                }
            </div>
            <div className="transactions-container">
                <div className="transactions">
                    <h3>Transactions</h3>
                    <ul>
                        {transactions.map((transaction) => {
                            const {description, transactionAmount, transactionType, id} =  transaction;

                            return (
                                <li key={id}>
                                    {
                                    (editingId === id)
                                    ? (<>
                                        <EditTransactionForm 
                                            initialDescription={description}
                                            initialAmount={transactionAmount}
                                            initialType={transactionType}
                                            onCancel={
                                                ()=>{setEditingId(null)
                                            }}
                                            onSave={(updatedTransaction) => {
                                                updateTransaction(id, updatedTransaction);
                                                setEditingId(null);
                                            }}
                                        />
                                        </>)
                                    : (<>
                                        <div className="transaction-item-title">
                                            <h4>{description}</h4>
                                            <button type="button" className="btn btn-outline-secondary btn-edit-fit" 
                                                onClick={()=>setEditingId(id)}
                                            >Edit</button>
                                            <button type="button" className="btn btn-outline-secondary btn-edit-fit" 
                                                onClick={()=>{
                                                    if(window.confirm("Are you sure to delete?")) {
                                                        deleteTransaction(id);
                                                    }
                                                }}
                                            >Delete</button>
                                        </div>
                                        <p>${transactionAmount}  <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
                                        </>)
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}