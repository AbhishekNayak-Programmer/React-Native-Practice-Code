import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

const AddPlaces = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
