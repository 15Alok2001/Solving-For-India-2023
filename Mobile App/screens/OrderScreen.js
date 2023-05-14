import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  SectionList,
  StyleSheet,
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

const OrderScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [tempdata, setTempdata] = useState({});
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (tempdata && tempdata.ProductId) {
      console.log("effect");
      let x = orderList;
      // console.log(tempdata);
      x.push({ data: [tempdata] });
      setOrderList(x);
      console.log(tempdata);
      setTempdata(null);
      console.log(orderList);
    }
  }, [tempdata]);

  useEffect(() => {
    setOrderList([]);
    const getOrderList = async () => {
      const token = await getData();
      setToken(token);
      const url = `${URL}/order?token=${token}`;

      try {
        const response1 = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });
        const orderIDList = response1.data;
        console.log(orderIDList);
        orderIDList.forEach(async (e) => {
          const order_url = `${URL}/myIndividualOrder?token=${token}&order=${e}`;
          // console.log(order_url);
          const response2 = await axios.get(order_url, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(response2.data);
          setTempdata(response2.data);
        });
      } catch (err) {}
    };
    getOrderList();
  }, []);

  const Item = ({ address, productID }) => (
    <View style={styles.sitecontainer}>
      <TouchableOpacity
        style={{ borderWidth: 0 }}
        onPress={() =>
          navigation.navigate("IndividualOrder", { pID: productID })
        }
      >
        <Text style={styles.regularText}>Product ID: {productID}</Text>
        <Text style={styles.regularText}>{address}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      // name={item.Name}
      // price={item.Price}
      // desc={item.Description}
      productID={item.ProductId}
      address={item.Address}
    />
  );

  // Add section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.outer}>
      <SectionList
        sections={orderList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        // renderSectionHeader={renderSectionHeader}
      ></SectionList>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#35B5F460",
    borderWidth: 1,
  },
  addProduct: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: "#35b5f433",
    borderRadius: 20,
    borderWidth: 1,
  },
  sectionheader: {
    alignItems: "center",
    // marginVertical: 10,
    marginTop: 30,
    padding: 10,
  },
  sitecontainer: {
    paddingHorizontal: 25,
    // paddingVertical: 20,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "white",
    opacity: 1,
  },
  regularText: {
    fontSize: 15,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    // textAlign: "center",
  },
  bottom: {
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
  },
});
