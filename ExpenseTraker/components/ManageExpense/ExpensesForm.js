import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useContext, useState } from "react";
import Button from "../UI/Button";
import { ExpenseContext } from "../../context/expensesContext";
import { storeExpense, updateExpense } from "../../utils/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

const ExpensesForm = (props) => {
  const [amount, setAmount] = useState(
    props.defaultValue ? props.defaultValue.amount.toString() : ""
  );
  const [date, setDate] = useState(
    props.defaultValue ? props.defaultValue.date.toISOString().slice(0, 10) : ""
  );
  const [desc, setDesc] = useState(
    props.defaultValue ? props.defaultValue.description : ""
  );
  const expenseContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const amountChangeHandler = (amt) => setAmount(amt);
  const dateChangeHandler = (dt) => setDate(dt);
  const descChangeHandler = (dsc) => setDesc(dsc);

  const confirmHandler = async () => {
    setIsLoading(true);
    const amountIsValid = !isNaN(amount) && amount > 0;
    const dateIsValid =
      date.toString() !== "Invalid Date" && date.trim().length === 10;
    const descIsValid = desc.trim().length > 0;

    if (amountIsValid && dateIsValid && descIsValid) {
      try {
        if (props.isEditing) {
          expenseContext.updateExpenses(
            props.editedExpenseId,
            desc,
            +amount,
            new Date(date)
          );

          await updateExpense(props.editedExpenseId, {
            description: desc,
            amount: +amount,
            date: new Date(date),
          });
        } else {
          const id = await storeExpense({
            description: desc,
            amount: +amount,
            date: new Date(date),
          });
          expenseContext.addExpenses(desc, +amount, new Date(date), id);
        }

        props.cancel(); // To go back once added
      } catch (err) {
        setIsLoading(false);
        setError("Could not save data - please try again later!");
      }
    } else {
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }
  };

  if (isLoading) return <LoadingOverlay />;

  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
            value: amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            onChangeText: dateChangeHandler,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: date,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          //   autoCorrect: false,
          //   autoCapitalize : "none",
          multiline: true,
          onChangeText: descChangeHandler,
          value: desc,
        }}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode="flat" onPress={props.cancel}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>
          {props.isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpensesForm;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
