import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SellerScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("SellerSignUp")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SellerSignIn")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellerScreen;
