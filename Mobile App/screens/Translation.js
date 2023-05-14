import { useEffect, useRef } from "react";
import * as React from "react";
import {
  View,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Translation = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const SCREEN_HEIGHT = Math.round(height);
  const SCREEN_WIDTH = Math.round(width);
  console.log(height, width);

  const startValue = new Animated.Value(Math.round(height + 200));
  const endValue = Math.round(height - 350);

  console.log(startValue, endValue);

  // const startValue = useRef(new Animated.Value(0 + SCREEN_HEIGHT)).current;
  // const endValue = -100;
  const duration = 1000;

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue]);

  return (
    // <View style={styles.container}>
    <Animated.View
      style={[
        styles.square,
        {
          transform: [
            {
              translateY: startValue,
            },
          ],
        },
      ]}
    >
      <View style={styles.innercontainer}>
        <TouchableOpacity
          style={styles.logocontainer}
          onPress={() => navigation.navigate("Photo")}
        >
          <Image
            style={styles.logo}
            source={require("../img/camera_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logocontainer}>
          <Image
            style={styles.logo}
            source={require("../img/gallery_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    margin: 50,
  },
  innercontainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    margin: 5,
    paddingLeft: 20,
  },
  logocontainer: {
    marginHorizontal: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  square: {
    height: 80,
    width: 360,
    backgroundColor: "white",
    borderWidth: 2,
  },
});

export default Translation;
