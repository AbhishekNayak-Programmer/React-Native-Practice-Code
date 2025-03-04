import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const data = await fetchPlaces();
      setLoadedPlaces(data);
    };

    if (isFocused) loadPlaces();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
