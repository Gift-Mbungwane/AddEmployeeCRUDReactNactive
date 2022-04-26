import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { globalStyle } from "../../assets/styles/globalStyles";
import { auth } from "../database/firebase";

export default function Splash({ navigation }) {
  // here
  setTimeout(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("AddEmployee");
      } else {
        navigation.replace("Signin");
      }
    });
  }, 3000);

  return (
    <View style={globalStyle.container}>
      <Image
        source={require("../../assets/images/signin.jpg")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
