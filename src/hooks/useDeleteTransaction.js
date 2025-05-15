import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {
    const deleteTransaction = async (transactionID) => {
        try {
            const transactionDocRef = doc(db, "transactions", transactionID);
            await deleteDoc(transactionDocRef);
          } catch (error) {
            console.error("Failed to delete transaction:", error);
        }
    }
    
    return {deleteTransaction}
}