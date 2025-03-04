import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "crimson" },
          headerTintColor: "white",
          drawerActiveBackgroundColor: "#f0e1ff",
          drawerActiveTintColor: "#3c0a6b",
          drawerStyle: { backgroundColor: "#eee" },
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: "Welcome Screen",
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="human-greeting"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
