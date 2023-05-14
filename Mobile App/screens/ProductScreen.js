import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
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

const ProductScreen = ({ navigation }) => {
  //   let productList = new Array();

  const [tempdata, setTempdata] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (tempdata && tempdata.Name) {
      console.log("effect");
      let x = productList;
      // console.log(tempdata);
      x.push({ title: tempdata.Name, data: [tempdata] });
      setProductList(x);
      setTempdata(null);
      // console.log(tempdata);
      // console.log(productList);
    }
  }, [tempdata]);

  useEffect(() => {
    setProductList([]);
    const getProductList = async () => {
      const token = await getData();
      const url = `${URL}/getProducts?token=${token}`;

      try {
        const response1 = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });
        const productIDList = response1.data.products;
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

  const Item = ({ price, desc }) => (
    <View style={styles.sitecontainer}>
      {/* <Text style={[styles.regularText, {padding: 5, marginHorizontal: 0,}]}>Name</Text> */}
      <Text style={styles.regularText}>Price : {price}</Text>
      <Text style={styles.regularText}>{desc}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item price={item.Price} desc={item.Description} />
  );

  // Add section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.outer}>
      <View style={styles.addProduct}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NewProduct")}
        >
          <Text style={{fontSize:15,color:'#FFF',fontWeight:'bold'}}>ADD PRODUCT</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={productList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      ></SectionList>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#35B5F460",
    borderWidth: 1,
    alignItems : 'center'
  },
  addProduct: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 15,
    backgroundColor: "#35b5f4",
    borderRadius: 25,
    width:150,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:"rgba(0,0,0,0.50)",
    elevation:15,
    // shadowOffset:{
    //   width:0,
    //   height:2
    // }
  },
  sectionheader: {
    alignItems: "center",
    // marginVertical: 10,
    marginTop: 5,
    padding: 10,
    marginBottom:1
  },
  sitecontainer: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    width:280,
    borderRadius: 20,
    backgroundColor: "white",
    opacity: 1,
    marginBottom:10
    // right:-41
    // alignItems : 'center'
  },
  regularText: {
    fontSize: 18,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    // textAlign: "center",
  },
});