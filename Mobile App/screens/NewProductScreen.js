import * as React from "react";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../URL";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");

    if (value !== null) {
      // value previously stored
      // console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const NewProductScreen = ({ navigation }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [pin, setPin] = useState(null);

  const addProduct = async () => {
    const token = await getData();
    const url = `${URL}/addProducts?token=${token}`;
    console.log(url);

    const data = JSON.stringify({
      title,
      description,
      price,
      pin,
    });

    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        // let status = response.status;
        // alert("Sign up SUCCESSFUL !!");
        console.log("Successfully Added !!!");
        navigation.navigate("Product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const width = Dimensions.get("window").width;
  return (
    <View style={styles.outer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          width: width,
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.regularText1}>DETAILS</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Title"
            placeholderTextColor="black"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            placeholderTextColor="black"
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Price"
            placeholderTextColor="black"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.textInput}
            placeholder="PinCode"
            placeholderTextColor="black"
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              title && description && price && pin
                ? addProduct()
                : alert("EMPTY FIELDS !!!");
            }}
          >
            <Text style={styles.regularText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewProductScreen;

const styles = StyleSheet.create({
  outer: {
    // flex: 1,
    backgroundColor: "#35B5F460",
    alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    flex: 0.6,
    width: "80%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 25,
    padding: 20,
    // borderWidth: 1,
  },
  textInput: {
    margin: 10,
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  regularText: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 8,
    color: "white",
    textAlign: "center",
  },
  regularText1: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
  },
  submit: {
    margin: 10,
    marginTop: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35B5F4",
    borderRadius: 20,
    borderWidth: 1,
  },
});
