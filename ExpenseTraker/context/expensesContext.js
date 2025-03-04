import { createContext, useState } from "react";

export const ExpenseContext = createContext();

const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  const addExpenses = (desc, amount, date, id) => {
    setExpenses((prevData) => [
      ...prevData,
      { id: id, description: desc, amount: amount, date: date },
    ]);
  };

  const deleteExpenses = (id) => {
    setExpenses((prevData) => prevData.filter((el) => el.id !== id));
  };

  const updateExpenses = (id, desc, amount, date) => {
    let itemInd = expenses.findIndex((el) => el.id === id);
    setExpenses((prevData) => {
      let arr = [...prevData];
      arr[itemInd] = { id: id, description: desc, amount: amount, date: date };
      return arr;
    });
  };

  const updateExpensesHandler = (exp) => setExpenses(exp.reverse());

  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenses,
        addExpenses,
        deleteExpenses,
        updateExpenses,
        updateExpensesHandler,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
