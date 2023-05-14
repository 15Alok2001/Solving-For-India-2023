// const sites = [
//   {
//     title: "1MG",
//     data: [
//       { name: "Fries", price: "$3.00", link: "11K" },
//     ],
//   },
//   {
//     title: "NETMEDS",
//     data: [
//       { name: "Fries", price: "$3.00", link: "11K" },
//     ],
//   },
// ];

import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  SectionList,
  TouchableOpacity,
} from "react-native";
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

const ResultScreen = ({ route }) => {
  const med_details = route.params.details;
  const seller_details = route.params.sellerDetails;
  // const details = obje.details
  console.log(seller_details);

  const addCart = async (productId) => {
    const token = await getData();
    // console.log(token);

    const url = `${URL}/addToCart?token=${token}`;
    console.log(url);

    const data = JSON.stringify({
      productId: productId,
    });

    console.log(productId);

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Added to Cart");
        // setHistory(response.data);
        // setSellerAccount(response.data.Type);
        // console.log(history);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // let med_details = new Array();

  // for (let i = 0; i < details.length; i++) {
  //   med_details.push({ title: 'PharmEasy', data: details });
  // }

  // console.log(med_details);
  const SellerItem = ({ name, price, product_id }) => (
    <View
      style={[
        styles.sitecontainer,
        { borderWidth: 0, padding: 10, flexDirection: "row" },
      ]}
    >
      <View style={{ borderWidth: 0 }}>
        <Text style={[styles.regularText, { fontWeight: "600" }]}>{name}</Text>
        <Text style={styles.regularText}>Price : {price}</Text>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          addCart(product_id);
        }}
      >
        <Image
          source={require("../img/cart_icon.jpg")}
          style={{ resizeMode: "contain", width: 60, height: 60 }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderSellerItem = ({ item }) => (
    <SellerItem name={item.Name} price={item.Price} product_id={item._id} />
  );

  // Add section header
  const renderSellerSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        {title.toUpperCase()}
      </Text>
    </View>
  );

  const Item = ({ name, price, link }) => (
    <View style={styles.sitecontainer}>
      {/* <Text style={[styles.regularText, {padding: 5, marginHorizontal: 0,}]}>Name</Text> */}
      <Text style={[styles.regularText, { fontWeight: "600" }]}>{name}</Text>
      <Text style={styles.regularText}>Price : {price}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        <Text style={[styles.regularText, { color: "blue" }]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.name} price={item.price} link={item.link} />
  );

  // Add section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        {title.toUpperCase()}
      </Text>
    </View>
  );

  return (
    // <ScrollView style={styles.container}>
    //   <Text style={styles.regularText}>RESULT SCREEN</Text>
    <View style={styles.innercontainer}>
      <SectionList
        sections={seller_details}
        keyExtractor={(item, index) => item + index}
        renderItem={renderSellerItem}
        renderSectionHeader={renderSellerSectionHeader}
      ></SectionList>
      <SectionList
        sections={med_details}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      ></SectionList>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#333333",
  },
  innercontainer: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    // height: 600,
    backgroundColor: "#35b5f433",
    // opacity: 0.6,
    borderRadius: 20,
  },
  sectionheader: {
    alignItems: "center",
    // marginVertical: 10,
    marginTop: 30,
    padding: 10,
  },
  sitecontainer: {
    paddingHorizontal: 10,
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
    fontSize: 18,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    // textAlign: "center",
  },
});

export default ResultScreen;
