import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import GetStartedScreen from "../screens/GetStartedScreen";
import GetStarted from "../screens/GetStarted";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
import ResultScreen from "../screens/ResultScreen";
import OCRResultScreen from "../screens/OCRResultScreen";
import PhotoScreen from "../screens/PhotoScreen";
import UploadPhotoScreen from "../screens/UploadPhotoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import OrderScreen from "../screens/OrderScreen";
import IndividualOrderScreen from "../screens/IndividualOrderScreen";
import ProductScreen from "../screens/ProductScreen";
import NewProductScreen from "../screens/NewProductScreen";

import SellerScreen from "../screens/SellerScreen";
import SellerSignUpScreen from "../screens/SellerSignUpScreen";
import SellerSignInScreen from "../screens/SellerSignInScreen";
import SellerGSTScreen from "../screens/SellerGSTScreen";

import CustomerOrderScreen from "../screens/CustomerOrderScreen";

import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen
        name="Footer"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: "PROFILE", }}/>
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="IndividualOrder" component={IndividualOrderScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="NewProduct" component={NewProductScreen} />

      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="OCRResult" component={OCRResultScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
      <Stack.Screen name="Seller" component={SellerScreen} />
      <Stack.Screen name="SellerSignUp" component={SellerSignUpScreen} />
      <Stack.Screen name="SellerSignIn" component={SellerSignInScreen} />
      <Stack.Screen name="SellerGST" component={SellerGSTScreen} />

      <Stack.Screen name="CustomerOrder" component={CustomerOrderScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
