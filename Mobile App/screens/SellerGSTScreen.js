import * as React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SellerGSTScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
        <Text style={styles.text}>Enter GST Number</Text>
          <TextInput style={styles.textInput} placeholder="GST Number" />
          <TouchableOpacity style={styles.button}>
            <Text>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SellerGSTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 10,
    borderWidth: 2,
  },
  text: {
    fontSize:25,
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
