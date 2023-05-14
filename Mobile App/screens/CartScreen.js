import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import axios from "axios";
import { URL } from "../URL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");

    if (value !== null) {
      // value previously stored
      console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const CartScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [tempdata, setTempdata] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (tempdata && tempdata.Name) {
      console.log("effect");
      let x = productList;
      // console.log(tempdata);
      x.push({ data: [tempdata] });
      setProductList(x);
      console.log(tempdata);
      setTempdata(null);
      console.log(productList);
    }
  }, [tempdata]);

  useEffect(() => {
    setProductList([]);
    const getProductList = async () => {
      const token = await getData();
      setToken(token);
      const url = `${URL}/cartItems?token=${token}`;

      try {
        const response1 = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });
        const productIDList = response1.data;
        productIDList.forEach(async (e) => {
          const product_url = `${URL}/individualProduct?productId=${e}`;
          const response2 = await axios.get(product_url, {
            headers: { "Content-Type": "application/json" },
          });
          setTempdata(response2.data);
        });
      } catch (err) {}
    };
    getProductList();
  }, []);

  const buyProducts = () => {
    const url = `${URL}/placeOrder?token=${token}`;
    productList.forEach((product) => {
      const data = JSON.stringify({
        productId: product.data[0]._id,
        // address needs to be dynamic
        address: 'Dehradun',
      });

      axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

        deletefromCart(product.data[0]._id);
    });
  };

  const deletefromCart = (productID) => {
    console.log(productID);
    const deleteURL = `${URL}/removeFromCart?token=${token}`;
    const data = JSON.stringify({
      productId: productID,
    });

    // console.log(productID);

    axios({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      url: deleteURL,
      data,
    })
      .then((response) => {
        let newProductIDList = [];
        console.log("loop");
        console.log(productList[0].data[0]._id);
        productList.forEach((pid) => {
          if (pid.data[0]._id !== productID) {
            newProductIDList.push(pid);
          }
        });
        setProductList(newProductIDList);
        console.log(productList);
        console.log(newProductIDList);
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Item = ({ name, price, desc, productID }) => (
    <View style={styles.sitecontainer}>
      <View style={{ borderWidth: 0 }}>
        <Text style={styles.regularText}>{name.toUpperCase()}</Text>
        <Text style={styles.regularText}>Price : {price}</Text>
        <Text style={styles.regularText}>{desc}</Text>
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          deletefromCart(productID);
        }}
      >
        <Image
          source={require("../img/cross_icon.png")}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.Name}
      price={item.Price}
      desc={item.Description}
      productID={item._id}
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
        sections={productList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        // renderSectionHeader={renderSectionHeader}
      ></SectionList>
      <TouchableOpacity style={styles.bottom} onPress={() => {buyProducts();}}>
        <Text style={styles.regularText1}>BUY NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#35B5F460",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
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
    flexDirection: "row",
    marginLeft:15,
    // alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "white",
    opacity: 1,
    width: "80%",
  },
  regularText: {
    fontSize: 18,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    // textAlign: "center",
  },
  regularText1: {
    fontSize: 18,
    color:'#FFF',
    fontWeight: 'bold',
    fontSize:20,
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
    backgroundColor:'#35B5F4'
  },
});
