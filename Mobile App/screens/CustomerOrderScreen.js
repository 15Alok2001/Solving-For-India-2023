import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../URL";

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

const CustomerOrderScreen = () => {
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        if(orders && orders.length){
            console.log(orders);
        }
    },[orders])
  useEffect(() => {
    // setProductList([]);
    const getCustomerOrders = async () => {
      const token = await getData();
      //   setToken(token);
      const url = `${URL}/customerOrders?token=${token}`;

      try {
        const response = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        console.log('ok');
        // setOrders(response.data.orders);
        response.data.orders((e)=>{
            axios({
                method : 'GET',
                headers: { "Content-Type": "application/json"},
                url : `${URL}/individualOrder?order=${e}&sId=${response.data.id}`
            }).then((res)=>{
                console.log('ok');
            }).catch((err)=>{
                console.log('oops');
            })
        })
      } catch (err) {}
    };
    getCustomerOrders();
  }, []);
};

export default CustomerOrderScreen;
