import { FlatList, View, StyleSheet, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = (props) => {
  const navigation = useNavigation();
  if (!props.places || props.places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={props.places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() =>
            navigation.navigate("PlaceDetails", { placeId: item.id })
          }
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
