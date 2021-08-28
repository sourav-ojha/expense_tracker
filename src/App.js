import React, { useContext } from "react";
import Detail from "./components/Details/Detail";
import Main from "./components/Main/Main";
import { ExpenseTrackerContext } from "./context/context";

const App = () => {
  const { transaction } = useContext(
    ExpenseTrackerContext
  );
  return (
    <div className="App">
      <Detail title="Income" amount="800" />
      <Main />
      <Detail title="Expense" amount="500" />
    </div>
  );
};

export default App;
