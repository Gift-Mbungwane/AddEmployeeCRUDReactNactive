import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { globalStyle } from "../../assets/styles/globalStyles";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { auth, firestore } from "../database/firebase";

const image = require("../../assets/images/signup.jpg");

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userName, setName] = useState("");

  //signing up users as admin
  const signUp = async () => {
    setUploading(!uploading);
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return firestore
          .collection("admin")
          .doc(user.uid)
          .set({
            email: user.email,
            userName: userName,
            uid: user.uid,
          })
          .then(() => {
            setUploading(false);
            alert(`Your account has been registered ${"\n"}please sign-in`);
            navigation.replace("Signin");
          })
          .catch((error) => {
            setUploading(false);
            alert(error);
          });
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
                fontWeight: "bold",
                fontSize: 30,
                color: "#FFFFFF",
                alignSelf: "center",
                marginVertical: 15,
              }}
            >
              Sign Up {"\n"}Employees
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
                  placeholder="Name"
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={(userName) => setName(userName)}
                  style={{ color: "#FFFFFF" }}
                />
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

            {uploading && (
              <ActivityIndicator
                size="large"
                style={{ alignSelf: "center" }}
                color="white"
              />
            )}
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#FFFFFF",
                }}
              >
                Sign Up
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
                  <TouchableOpacity onPress={() => signUp()}>
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
              <TouchableOpacity onPress={() => navigation.replace("Signin")}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#FFFFFF",
                    textDecorationLine: "underline",
                    alignSelf: "flex-start",
                  }}
                >
                  SignIn
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
