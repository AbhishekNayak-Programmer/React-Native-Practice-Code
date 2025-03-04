import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

const PlaceForm = (props) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const onTakeImageHandler = (imgUri) => setSelectedImage(imgUri);

  const savePlaceHandler = () => {
    const place = new Place(title, selectedImage);
    props.onCreatePlace(place);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={(txt) => setTitle(txt)}
          value={title}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={onTakeImageHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
