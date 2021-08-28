import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    type: "Income",
    category: "Lottery",
    amount: 800,
    date: "2021-08-28",
    id: "b84cc313-e982-4284-b58c-cee22a7bfc67",
  },
  {
    type: "Expense",
    category: "Clothes",
    amount: 300,
    date: "2021-08-28",
    id: "3f106c0c-7c6e-4669-9797-ac21a17d9690",
  },
  {
    type: "Income",
    category: "Savings",
    amount: 40,
    date: "2021-08-28",
    id: "7cecd414-5af7-4968-9e8a-f57d6c757168",
  },
  {
    type: "Expense",
    category: "Car",
    amount: 200,
    date: "2021-08-28",
    id: "7871dfc0-b690-4f13-b6c0-6351002a7771",
  },
  {
    type: "Expense",
    category: "Phone",
    amount: 50,
    date: "2021-08-28",
    id: "f42f63e7-6921-4455-8b9a-489035a57bac",
  },
 
  {
    type: "Income",
    category: "Investments",
    amount: 500,
    date: "2021-08-28",
    id: "d906faa6-801d-4278-875d-0e3ac2008a91",
  },
 
  {
    type: "Expense",
    category: "Bills",
    amount: 300,
    date: "2021-08-28",
    id: "1145c256-700c-4c9a-8eea-ee02a6313ba2",
  },
  {
    type: "Income",
    category: "Business",
    amount: 100,
    date: "2021-08-28",
    id: "3c61f86e-f534-4a1d-98cb-5577d998ea20",
  },
];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    console.log(transaction);
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
