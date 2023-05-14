import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";

import axios from "axios";
import { URL } from "../URL";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fun = async () => {
      const token = await getData();
      // console.log(token);

      const url = `${URL}/profile?token=${token}`;
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data.History);
          setHistory(response.data.History);
          // setSellerAccount(response.data.Type);
          // console.log(history);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fun();
  }, []);

  const Item = ({ name }) => (
    <View style={styles.textcontainer}>
      <Text style={styles.regularText}>{name}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item name={item} />;

  // Add section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <Text style={styles.regularText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.innercontainer}>
      <SectionList
        sections={[{'title': 'HISTORY', 'data' : history}]}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      ></SectionList>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  innercontainer: {
    flex: 1,
    borderWidth: 1,
    margin: 0,
    padding: 10,
    backgroundColor: "#35b5f433",
    // height: 600,
    borderRadius: 20,
    // position : "absolute",
    // float: right
  },
  sectionheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // gap: 100,
    marginTop: 0,
    padding: 10,
    // borderWidth: 1,
  },
  textcontainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    margin: 10,
    padding: 10,
    // height: 600,
    borderRadius: 20,
  },
  regularText: {
    fontSize: 20,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    textAlign: "center",
  },
});
