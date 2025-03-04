import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
  return (
    <ExpenseItem
      //   description={itemData.item.description}
      //   amount={itemData.item.amount}
      //   date={itemData.item.date}
      {...itemData.item}
    />
  );
};

const ExpensesList = (props) => {
  return (
    <FlatList
      data={props.expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
