import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { globalStyle } from "./assets/styles/globalStyles";
import AddEmployeeScreen from "./src/screens/AddEmployeeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Splash from "./src/screens/Splash";
import { AntDesign } from "@expo/vector-icons";
import { auth, firestore } from "./src/database/firebase";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        {user ? (
          <>
            <Stack.Screen
              name="AddEmployee"
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTitle: "Employees",
              })}
              component={AddEmployeeScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={SignInScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
