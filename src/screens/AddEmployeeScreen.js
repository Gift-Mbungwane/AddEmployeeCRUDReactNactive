import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { globalStyle } from "../../assets/styles/globalStyles";
import { FAB } from "react-native-elements";
import { auth, firestore } from "../database/firebase";
import { Input } from "react-native-elements";

export default function AddEmployeeScreen({ navigation }) {
  const [employee, setEmployee] = useState(null);
  const [email, setEmail] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  //adding Employee to firestore
  const addEmployee = async () => {
    return await firestore
      .collection("employee")
      .add({
        employeeName: employeeName,
        email: email,
        admin: auth.currentUser.uid,
      })
      .then((snapShot) => {
        snapShot.update({
          uid: snapShot.id,
        });
        setModalVisible(!modalVisible);
        alert("Added new Employee");
      })
      .catch((error) => alert(error));
  };

  //updating empployee in firestore
  const updateEmoployee = async (uid) => {
    return await firestore
      .collection("employee")
      .doc(uid)
      .update({
        email: email,
        employeeName: employeeName,
        admin: auth.currentUser.uid,
      })
      .then(() => {
        setIsModal(false);
        alert("Employee details has been updated");
      })
      .catch((error) => {
        setIsModal(false);
        alert(error);
      });
  };

  // removing employee from firestore
  const removeEmployee = async (uid) => {
    return await firestore
      .collection("employee")
      .doc(uid)
      .delete({})
      .then(() => {
        alert("Employee has been removed");
      })
      .catch((error) => alert(error));
  };

  //getting all the users that were added on our app
  const getEmployee = async () => {
    const uid = auth.currentUser.uid;
    return await firestore
      .collection("employee")
      .where("uid", "!=", uid)
      .onSnapshot((snapShot) => {
        const employees = snapShot.docs.map((doc) => doc.data());
        const userNames = snapShot.docs.map((doc) => doc.data().employeeName);
        const emails = snapShot.docs.map((doc) => doc.data().email);
        setEmployee(employees);
      });
  };

  //Signing out
  const signOut = async () => {
    return await auth
      .signOut()
      .then(() => navigation.replace("Signin"))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getEmployee();

    return () => getEmployee();
  }, []);
  return (
    <View style={globalStyle.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{ alignSelf: "center" }}
      >
        <View style={{ width: "90%", height: "60%" }}>
          <View style={globalStyle.modalView}>
            <Input
              placeholder="email@admin.com"
              placeholderTextColor={"black"}
              onChangeText={(email) => setEmail(email)}
              style={{ color: "black" }}
            />
            <Input
              placeholder="Employee Name"
              placeholderTextColor={"black"}
              onChangeText={(userName) => setEmployeeName(userName)}
              style={{ color: "black" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={[globalStyle.button, globalStyle.buttonClose]}
                onPress={() => addEmployee()}
              >
                <Text style={globalStyle.textStyle}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  width: 70,
                  borderColor: "red",
                  borderWidth: 1,
                  marginHorizontal: 10,
                  backgroundColor: "#FFFFFF",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyle.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 5 }}>
        <View style={{ marginVertical: "30%" }}>
          <FlatList
            data={employee}
            keyExtractor={(item) => item.uid}
            style={{
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    borderRadius: 20,
                    flexDirection: "row",
                    borderColor: "lightred",
                    width: "90%",
                    height: 230,
                    backgroundColor: "grey",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    margin: 5,
                  }}
                >
                  {isModal && (
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isModal}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setIsModal(!isModal);
                      }}
                      style={{ alignSelf: "center" }}
                    >
                      <View style={{ width: "80%", height: "60%" }}>
                        <View style={globalStyle.modalView}>
                          <Input
                            placeholder="email@admin.com"
                            placeholderTextColor={"black"}
                            onChangeText={(email) => setEmail(email)}
                            style={{ color: "black" }}
                          />
                          <Input
                            placeholder="Employee Name"
                            placeholderTextColor={"black"}
                            onChangeText={(userName) =>
                              setEmployeeName(userName)
                            }
                            style={{ color: "black" }}
                          />

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={[
                                globalStyle.button,
                                globalStyle.buttonClose,
                              ]}
                              onPress={() => updateEmoployee(item.uid)}
                            >
                              <Text style={globalStyle.textStyle}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={{
                                borderRadius: 20,
                                padding: 10,
                                elevation: 2,
                                width: 70,
                                borderColor: "red",
                                borderWidth: 1,
                                marginHorizontal: 10,
                                backgroundColor: "#FFFFFF",
                              }}
                              onPress={() => setIsModal(false)}
                            >
                              <Text style={globalStyle.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                  <View
                    style={{
                      alignSelf: "flex-end",
                      width: "50%",
                      marginHorizontal: 20,
                      marginVertical: 30,
                    }}
                  >
                    <Text>
                      Employee Name (EN.): {item.employeeName}
                      {"\n"}
                    </Text>
                    <Text>
                      Employee email: {item.email}
                      {"\n"}
                    </Text>
                    <Text>
                      Employee ID: {item.uid}
                      {"\n"}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginVertical: 15,
                      alignSelf: "baseline",
                      right: 35,
                      marginVertical: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setIsModal(true)}
                      activeOpacity={0.9}
                      style={{
                        borderRadius: 15,
                        width: 80,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "skyblue",
                        marginVertical: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="update"
                        size={24}
                        color="black"
                        style={{ alignSelf: "center", marginVertical: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeEmployee(item.uid)}
                      activeOpacity={0.9}
                      style={{
                        borderRadius: 15,
                        width: 80,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "red",
                        marginVertical: 10,
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={24}
                        color="black"
                        style={{ alignSelf: "center", marginVertical: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <FAB
          title="Add Employee"
          onPress={() => setModalVisible(true)}
          style={{ marginVertical: 50 }}
        />
        <FAB
          TouchableComponent={() => {
            return (
              <TouchableOpacity onPress={() => signOut()}>
                <AntDesign name="logout" size={24} />
              </TouchableOpacity>
            );
          }}
          style={{
            alignSelf: "flex-end",
            marginVertical: 50,
            left: 60,
          }}
        ></FAB>
      </View>
    </View>
  );
}
