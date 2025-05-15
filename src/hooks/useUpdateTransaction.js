import { updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useUpdateTransaction = () => {
    const updateTransaction = async(transactionID, updatedTransaction) => {
        const transactionCollectionRef = doc(db, "transactions", transactionID);
        try {
            await updateDoc(transactionCollectionRef, updatedTransaction)
        } catch (error) {
            console.error(error);
        }
    }

    return {updateTransaction}
}