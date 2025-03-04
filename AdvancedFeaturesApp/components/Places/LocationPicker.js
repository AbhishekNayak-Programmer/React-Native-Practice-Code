import { StyleSheet, View, Alert, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";

const LocationPicker = () => {
  const [locPermissionInfo, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState(null);

  const verifyPermissions = async () => {
    if (locPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant permission to access location"
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {};

  let locationPreview = <Text>No Location Picked Yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: `https://www.google.com/maps/place/Medchal+Court/@${pickedLocation.lat},${pickedLocation.lng}`,
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
