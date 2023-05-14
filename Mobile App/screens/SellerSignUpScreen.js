import React from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { URL } from "../URL";
import SyncStorage from "sync-storage";
import axios from "axios";
import SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { ScrollView } from "react-native-gesture-handler";
// import {Canvas, Circle} from "@shopify/react-native-skia";
let w = 0,
  h = 0;
export default function SellerSignUpScreen({ navigation }) {
  const { height, width } = Dimensions.get("window");
  console.log(height, width);
  w = width;
  h = height;
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [gst, setGST] = useState(null);
  const [pin, setPin] = useState(null);
  const [address, setAddress] = useState(null);
  const [isSelected, setSelection] = useState(false);

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

  const SellerSignup = async () => {
    // const data = new FormData();
    //   const result = SyncStorage.get("test")
    //  console.log(result);
    const token = await getData();
    // console.log(token);

    const url = `${URL}/upgradeToSeller?token=${token}`;
    // console.log(url);

    const data = JSON.stringify({
      name,
      number,
      gst,
      pin,
      address,
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
        alert("Sign up SUCCESSFUL !!");
        navigation.navigate("Footer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <View style={{flex:1}}>
    //   <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 60,
          marginTop: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* <Image source={require('./im.png')} style={styles.headimg} /> */}
          <Text style={styles.head}>MEDICINE</Text>
        </View>
      </View>
      <View style={[styles.lowerpart, { width: w, height: h - 100 }]}>
        <Text style={styles.text}>Register Yourself</Text>
        <Text style={styles.account}>Your information is safe with us!</Text>
        <TextInput
          placeholder="Seller - Name"
          placeholderTextColor="black"
          style={styles.textinput}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="black"
          style={styles.textinput}
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          placeholder="GST"
          placeholderTextColor="black"
          style={styles.textinput}
          value={gst}
          onChangeText={setGST}
        />
        <TextInput
          placeholder="Pin Code"
          placeholderTextColor="black"
          style={styles.textinput}
          value={pin}
          onChangeText={setPin}
        />
        <TextInput
          placeholder="Address"
          placeholderTextColor="black"
          style={styles.textinput}
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.checkpart}>
          <TouchableOpacity
            onPress={() => {
              setSelection(!isSelected);
            }}
          >
            {isSelected ? (
              <Image
                source={require("../img/checkbox.png")}
                style={styles.logo}
              />
            ) : (
              <Image
                source={require("../img/empty_checkbox.png")}
                style={styles.logo}
              />
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>Agree to terms and conditions</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            isSelected ? SellerSignup() : alert("Empty Fields !!!");
          }}
          style={styles.button}
        >
          <Text style={styles.textbutton}>SUBMIT</Text>
        </TouchableOpacity>

        {/* <Text style={styles.account}>Already have an account?</Text> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.password}> Sign In</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </View>
    //   </ScrollView>
    // </View>
  );
}
const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "#FFFFFF",
    height: 51,
    width: 329,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  bottom: {
    margin: 10,
    flex: 0.15,
    justifyContent: "center",
  },
  checkpart: {
    flexDirection: "row",
    marginVertical: 5,
    marginBottom: 15,
    padding: 5,
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textbutton: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  text: {
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#35B5F4",
    height: 51,
    width: 255,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 24,
  },
  password: {
    color: "#35B5F4",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    opacity: 0.85,
  },
  sign: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    opacity: 0.85,
  },
  account: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10,
  },
  head: {
    color: "#35B5F4",
    fontSize: 24,
    fontWeight: "bold",
    opacity: 0.85,
  },
  headimg: {
    height: 47,
    width: 55,
    resizeMode: "contain",
  },
  lowerpart: {
    // borderWidth: 1,
    marginBottom: 0,
    marginTop: -20,
    paddingBottom: 0,
    // paddingVertical: 10,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(216,255,253)",
    borderRadius: 30,
    // width: w,
    // height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
});
