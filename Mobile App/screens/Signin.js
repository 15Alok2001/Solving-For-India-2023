import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import { URL } from "../URL";
// import {Canvas, Circle} from "@shopify/react-native-skia";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value)
      console.log(value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem('token', jsonValue)
  //   } catch (e) {
  //     // saving error
  //     console.log(e);
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('token');
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch(e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // }

  const UserSignin = () => {
    // const data = new FormData();

    // storeData("PUSSY");

    const url = `${URL}/login?email=${email}&password=${password}`;
    console.log(url);

    // getData();
    // const data = JSON.stringify({
    //   email,
    //   password,
    // });

    axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      url,
    })
      .then((response) => {
        // console.log(response.data);
        // SyncStorage.set("token",JSON.stringify(response.data));
        // const result = JSON.parse(SyncStorage.get("token"))
        // console.log(result);
        storeData(response.data);

        
        navigation.navigate("Footer");

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, marginTop: 28, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 20,
            marginTop: 30,
          }}
        >
          <Image source={require("../img/im.png")} style={styles.headimg} />
          <Text style={styles.head}>AUSHADHI AIKYAM</Text>
        </View>
        {/* <Text style={styles.text}>Welcome Back</Text> */}
        <Image
          source={require("../img/4015641_71.ios.jpg")}
          style={{ height: 270, width: 270, marginBottom: 15 }}
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
        <Pressable>
          <Text style={styles.password}>Forgot Your Password ?</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            email && password ? UserSignin() : alert("Empty fields !!!");
          }}
        >
          <Text style={styles.sign}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.account}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.password}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textinput: {
    height: 51,
    width: 330,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 20,
    padding: 10,
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
    fontSize: 24,
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
});
