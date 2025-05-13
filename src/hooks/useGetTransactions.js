import {useEffect, useState} from "react"
import {query, collection, where, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase-config"
import {useGetUserInfo} from "./useGetUserInfo"

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState(
        {balance:0.0, income:0.0, expense:0.0}
    );

    const transactionCollectionRef = collection(db, "transactions");
    const {userID} = useGetUserInfo();

    const getTransactions = () => {
        let unsubscribe;

        try {
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({...data, id});

                    if(data.transactionType === "expense") {
                        totalExpenses += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);
                    }
                });

                setTransactions(docs);

                let balance =  totalIncome - totalExpenses;
                setTransactionTotals({
                    balance,
                    expenses:totalExpenses,
                    income:totalIncome
                })
            })
        } catch (error) {
            console.error(error);
        }

        return () => unsubscribe()
    }

    // when component unmounts, React run the function returned by useEffect
    useEffect(() => {
        getTransactions()
    }, [])

    return {transactions, transactionTotals}
};