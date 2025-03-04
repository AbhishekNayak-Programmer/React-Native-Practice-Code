import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addGoalHandler = (text) => {
    setCourseGoals((prevGoals) => [
      ...prevGoals,
      { text: text, id: Math.random().toString() },
    ]);
    setShowModal(false);
  };

  const removeGoalHandler = (id) => {
    setCourseGoals((prevGoals) => prevGoals.filter((el) => el.id !== id));
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={() => setShowModal(true)}
        />
        {showModal && (
          <GoalInput
            visible={showModal}
            addGoalHandler={addGoalHandler}
            closeModal={() => setShowModal(false)}
          />
        )}

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(el) => (
              <GoalItem
                id={el.item.id}
                removeGoalHandler={removeGoalHandler}
                text={el.item.text}
              />
            )}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },

  goalsContainer: {
    flex: 7,
  },
});
