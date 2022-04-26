import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { globalStyle } from "../../assets/styles/globalStyles";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { auth, firestore } from "../database/firebase";

const image = require("../../assets/images/hybrid-work.png");

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);

  //signing in users as admin
  const signIn = async () => {
    setUploading(!uploading);
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setUploading(false);
          navigation.replace("AddEmployee");
        }
      })
      .catch((error) => {
        setUploading(false);
        alert(error);
      });
  };

  return (
    <View style={globalStyle.container}>
      <View style={{ width: "100%", height: "100%" }}>
        <ImageBackground
          resizeMode="cover"
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 40,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "90%",
              borderRadius: 20,
              marginVertical: "20%",
              backgroundColor: "rgba(52, 52, 52, 0.3)",
            }}
            transparant={true}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 30,
                color: "#FFFFFF",
                padding: 24,
              }}
            >
              Welcome Back
            </Text>
            <KeyboardAvoidingView>
              <View
                style={{
                  width: "70%",
                  marginVertical: 40,
                  left: 15,
                }}
              >
                <Input
                  placeholder="email@admin.com"
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={(email) => setEmail(email)}
                  style={{ color: "#FFFFFF" }}
                />
                <Input
                  placeholder="password"
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                  style={{ color: "#FFFFFF" }}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#FFFFFF",
                }}
              >
                Sign in
              </Text>

              <TouchableOpacity
                style={{
                  borderRadius: 40,
                  backgroundColor: "#32AFB7",
                  marginHorizontal: "53.5%",
                  height: 50,
                  width: 50,
                }}
              >
                {uploading ? (
                  <ActivityIndicator
                    size="large"
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    color="white"
                  />
                ) : (
                  <TouchableOpacity onPress={() => signIn()}>
                    <Ionicons
                      name="ios-chevron-back"
                      size={34}
                      color="#FFFFFF"
                      style={{
                        alignSelf: "center",
                        marginVertical: 7,
                        transform: [{ rotateY: "180deg" }],
                      }}
                    />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginVertical: 40,
              }}
            >
              <TouchableOpacity onPress={() => navigation.replace("Signup")}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#FFFFFF",
                    textDecorationLine: "underline",
                    alignSelf: "flex-start",
                  }}
                >
                  SignUp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#FFFFFF",
                    textDecorationLine: "underline",
                    alignSelf: "flex-end",
                  }}
                >
                  Forgot password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
