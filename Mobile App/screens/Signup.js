import React from "react";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { URL } from "../URL";
// import {Canvas, Circle} from "@shopify/react-native-skia";
let w = 0,
  h = 0;

export default function Signup({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const url = `${URL}/register`;
  console.log(url);

  const UserSignup = () => {
    // const data = new FormData();

    const data = JSON.stringify({
      name,
      email,
      password,
    });

    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        let status = response.status;
        if (status === 201){
          navigation.navigate("Signin");
        }
        else{
          alert("Error !!!");
        }
        // navigation.navigate("OCRResult", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { height, width } = Dimensions.get("window");
  // console.log(height, width);
  w = width;
  h = height;
  // console.log(h, w);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 60,
            marginTop: 30,
          }}
        >
          <Image source={require("../img/im.png")} style={styles.headimg} />
          <Text style={styles.head}>AUSHADHI AIKYAM</Text>
        </View>
      </View>
      <View style={[styles.lowerpart, { width: w, height: h - 200 }]}>
        <Text style={styles.text}>Register Yourself</Text>
        <Text style={styles.account}>Your information is safe with us!</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor="black"
          style={styles.textinput}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="black"
          style={styles.textinput}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="black"
          secureTextEntry={true}
          style={styles.textinput}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          placeholderTextColor="black"
          secureTextEntry={true}
          style={styles.textinput}
        />
        <TouchableOpacity
          style={styles.button}
          // Password === Confirm Password left
          onPress={() => {
            name && email && password && confirmPassword
              ? UserSignup()
              : alert("Empty Fields");
          }}
        >
          <Text style={styles.textbutton}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.account}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.password}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "#FFFFFF",
    height: 51,
    width: 329,
    borderRadius: 20,
    marginBottom: 20,
    padding: 10,
  },
  textbutton: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#06A881",
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
    color: "#06A881",
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
    fontWeight: "medium",
    fontSize: 15,
    marginBottom: 5,
  },
  head: {
    color: "#06A881",
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
    backgroundColor: "rgb(236,255,253)",
    borderRadius: 33,
    // width: w,
    // height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
});
