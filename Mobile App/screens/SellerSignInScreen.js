import * as React from "react";
import {
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const SellerSignInScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, borderWidth:1,}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent:"center",}}>
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="email"/>
          <TextInput style={styles.textInput} placeholder="password"/>
          <TouchableOpacity style={styles.button}>
            <Text>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SellerSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 10,
    borderWidth: 2,
  },
  textInput: {
    height: 40,
    width: 250,
    marginVertical: 12,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
  },
});
