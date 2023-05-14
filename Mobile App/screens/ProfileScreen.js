import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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

const ProfileScreen = ({ navigation }) => {
  const [sellerAccount, setSellerAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fun = async () => {
      const token = await getData();
      setToken(token);
      // console.log(token);

      const url = `${URL}/profile?token=${token}`;
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          setSellerAccount(response.data.Type);
          setName(response.data.Name);
          setEmail(response.data.Email);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fun();
  }, []);

  return (
    <View style={styles.outer}>
        {/* <Text style={styles.regularText}>PROFILE SCREEN</Text> */}
        <View style={styles.headerContainer}>
          <Text style={styles.headertext}>{name}</Text>
          <Text style={[styles.regularText,{fontSize:18}]}>{email}</Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Order")}
          >
            <Text style={styles.regularText}>Orders </Text>
            <Image source={require("../img/arrow.webp")} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.regularText}>Cart </Text>
            <Image source={require("../img/arrow.webp")} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.regularText}>History </Text>
            <Image source={require("../img/arrow.webp")} style={styles.logo} />
          </TouchableOpacity>

          {!sellerAccount ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SellerSignUp")}
            >
              <Text style={styles.regularText}>Upgrade to Seller </Text>
              <Image
                source={require("../img/arrow.webp")}
                style={styles.logo}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Product")}
              >
                <Text style={styles.regularText}>Products </Text>
                <Image
                  source={require("../img/arrow.webp")}
                  style={styles.logo}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("CustomerOrder")}
              >
                <Text style={styles.regularText}>Customer Orders </Text>
                <Image
                  source={require("../img/arrow.webp")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </>
          )}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {setToken(null);navigation.navigate("GetStarted"); }}
              >
                <Text style={styles.regularText}>Logout </Text>
                <Image
                  source={require("../img/arrow.webp")}
                  style={styles.logo}
                />
              </TouchableOpacity>
        </View>
    </View>
  );
  
};
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,

  },
  container: {
    flex: 1,
    marginVertical: 10,
    // padding: 10,
    flexDirection: "column",
  },
  headerContainer: {
    // flex: 1,
    // borderWidth: 1,
    flexDirection: "column",
    marginTop: 0,
    marginVertical: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(20, 123, 105, 0.2)",
  },
  headertext: {
    fontWeight: "500",
    fontSize: 26,
  },
  
  regularText: {
    fontSize: 24,
    // padding: 20,
    // marginVertical: 8,
    // textAlign: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  button: {
    // margin: 10,
    marginVertical: 10,
    padding: 10,
    height: 65,
    paddingHorizontal: 20,
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(20, 123, 105, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    elevation: 3,
    // borderRadius: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default ProfileScreen;
