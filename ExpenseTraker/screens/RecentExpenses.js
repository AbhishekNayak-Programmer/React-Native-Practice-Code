import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/expensesContext";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        var expenses = await fetchExpenses();
        expensesContext.updateExpensesHandler(expenses);
      } catch (err) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) return <LoadingOverlay />;

  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;

  const recentExpenses = expensesContext.expenses.filter((exp) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);
    return exp.date > sevenDaysAgo;
  });

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for last 7 days"
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
    />
  );
};

export default RecentExpenses;
