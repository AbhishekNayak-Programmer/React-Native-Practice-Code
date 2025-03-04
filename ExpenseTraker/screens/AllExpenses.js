import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../context/expensesContext";

const AllExpenses = () => {
  const expensesContext = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      fallbackText="There is no expenses! You can add some to see"
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
    />
  );
};

export default AllExpenses;
