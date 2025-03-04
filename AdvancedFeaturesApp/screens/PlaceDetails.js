import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const selectedPlaceId = route.params.placeId;
  const [placeData, setPlaceData] = useState();

  useEffect(() => {
    const loadPlaceDetails = async () => {
      const data = await fetchPlaceDetails(selectedPlaceId);
      setPlaceData(data);
      navigation.setOptions({ title: data.title });
    };
    loadPlaceDetails();
  }, [selectedPlaceId]);

  return (
    <View style={styles.screen}>
      {placeData ? (
        <>
          <Text style={styles.title}>{placeData.title}</Text>
          <Image style={styles.image} source={{ uri: placeData.imageUri }} />
        </>
      ) : (
        <Text style={styles.title}>Loading Text Data</Text>
      )}
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: {
    alignItems: " center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});
