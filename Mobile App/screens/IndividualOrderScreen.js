import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../URL";

const IndividualOrderScreen = ({ route }) => {
  const [orderList, setOrderList] = useState([]);
  const [temp, setTemp] = useState({});

  useEffect(() => {
    if (temp && temp.Name) {
      console.log(temp);
      setOrderList([{'data' : [temp]}]);
    }
  }, [temp]);

  useEffect(() => {
    const getProduct = async () => {
      const url = `${URL}/individualProduct?productId=${route.params.pID}`;
      console.log(url);
      try {
        const response = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });

        console.log(response.data);
        setTemp(response.data);
        // console.log(temp);
      } catch (err) {}
    };
    getProduct();
  }, []);

  const Item = ({ name, price, desc }) => (
    <View style={styles.sitecontainer}>
      <Text style={styles.regularText}>{name.toUpperCase()}</Text>
      <Text style={styles.regularText}>Price : {price}</Text>
      <Text style={styles.regularText}>{desc}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.Name} price={item.Price} desc={item.Description} />
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
        contentContainerStyle={{marginTop:250,width:'100%'}}
        // renderSectionHeader={renderSectionHeader}
      ></SectionList>
    </View>
  );
};

export default IndividualOrderScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#35B5F4",
    borderWidth: 1,
  },
  sectionheader: {
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 10,
    padding: 10,
  },
  sitecontainer: {
    padding:30,
    paddingHorizontal: 80,
    // paddingVertical: 20,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    opacity: 1,
  },
  regularText: {
    fontSize: 18,
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
