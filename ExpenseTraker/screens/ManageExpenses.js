import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../context/expensesContext";
import ExpensesForm from "../components/ManageExpense/ExpensesForm";
import { deleteExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = (props) => {
  const editedExpenseId = props.route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseContext = useContext(ExpenseContext);
  const selectedExpense = expenseContext.expenses.find(
    (el) => el.id === editedExpenseId
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [props.navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      expenseContext.deleteExpenses(editedExpenseId);
      await deleteExpense(editedExpenseId);
      props.navigation.goBack();
    } catch (err) {
      setError("Could not delete expenses - please try again later!");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => props.navigation.goBack();

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;

  return (
    <View style={styles.container}>
      <ExpensesForm
        editedExpenseId={editedExpenseId}
        isEditing={isEditing}
        cancel={cancelHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
