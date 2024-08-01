import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "..";

interface Transition {
  id?: number;
  value: number;
  type: "INCOME" | "OUTCOME";
  description: string;
  createdAt?: Date;
}

export interface Carteira {
  balance: number;
  transactions: Transition[];
}

const initialState: Carteira = {
  balance: 0,
  transactions: [],
};

const carteiraSlice = createSlice({
  name: "carteira",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Transition>) => {
      const { value, type } = action.payload;

      if (type === "OUTCOME") {
        state.balance -= value;
      } else if (type === "INCOME") {
        state.balance += value;
      }

      state.transactions.push(action.payload);
    },

    updateBalance: (state, action: PayloadAction<Transition>) => {
      const { id, value, type } = action.payload;

      const existingTransaction = state.transactions.find((tx) => tx.id === id);
      if (existingTransaction) {
        // Ajusta o saldo
        if (existingTransaction.type === "OUTCOME") {
          state.balance += existingTransaction.value;
        } else if (existingTransaction.type === "INCOME") {
          state.balance -= existingTransaction.value;
        }

        // Atualiza a transação
        if (type === "OUTCOME") {
          state.balance -= value;
        } else if (type === "INCOME") {
          state.balance += value;
        }

        Object.assign(existingTransaction, action.payload);
      }
    },

    deleteTransaction: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const transactionToDelete = state.transactions.find((tx) => tx.id === id);

      if (transactionToDelete) {
        // Ajusta o saldo
        if (transactionToDelete.type === "OUTCOME") {
          state.balance += transactionToDelete.value;
        } else if (transactionToDelete.type === "INCOME") {
          state.balance -= transactionToDelete.value;
        }

        // Remove a transação
        state.transactions = state.transactions.filter((tx) => tx.id !== id);
      }
    },
  },
});

export const { register, updateBalance, deleteTransaction } =
  carteiraSlice.actions;
export const selectCarteira = (store: Store) => store.carteira;
export default carteiraSlice.reducer;
