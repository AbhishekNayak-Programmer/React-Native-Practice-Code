import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "crimson" },
          headerTintColor: "white",
          tabBarActiveTintColor: "crimson",
        }}
      >
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="human-greeting"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
