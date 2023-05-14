import * as React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headertext}>Hello, </Text>
        <Text style={styles.headertext}>USER !!!</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={styles.profilelogo}
            source={require("../img/profile_icon.webp")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    borderWidth: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#147b6933",
  },
  headerTextContainer: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: "column",
    // marginTop: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    // borderWidth: 1,
    // marginTop: 0,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headertext: {
    fontWeight: "bold",
    fontSize: 30,
  },
  profilelogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});

export default Header;
