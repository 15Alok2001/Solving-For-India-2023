import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import CameraButton from "../components/CameraScreenButton";
// import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import mime from "mime";
import { URL } from "../URL";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

const UploadPhoto = ({ route, navigation }) => {
  const { height, width } = Dimensions.get("window");

  console.log("UploadPhoto");
  const { image } = route.params;

  // console.log(image);

  // const image = image[0];
  // const newImageUri =  "file://" + image[0].uri.split("file:///").join("");
  // const newImageUri = image[0].uri;
  // console.log(newImageUri);

  // const decodedFileName = decodeURIComponent(fileName);

  const sendImage = () => {
    // console.log(image[0]);
    const uri = image[0].uri;
    const url = `${URL}/getFile`;
    console.log(url);

    const data = new FormData();

    data.append("file", {
      uri: uri,
      name: uri.split("/").pop(), // getting the text after the last slash which is the name of the image
      type: mime.getType(uri), // image.type returns 'image' but mime.getType(image.uri) returns 'image/jpeg' or whatever is the type
    });


    axios
      .post(url, data, {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        navigation.navigate("OCRResult", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={image[0]}
          style={{ width: width, height: height, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.bottom}>
        <CameraButton
          title={"Cancel"}
          icon="cross"
          color={"black"}
          onPress={() => navigation.goBack()}
        />
        <CameraButton
          title={"Confirm"}
          icon="check"
          color={"black"}
          onPress={sendImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  camera: {
    resizeMode: "contain",
  },
  bottom: {
    flex: 0.1,
    flexDirection: "row",
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    borderRadius: 0,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default UploadPhoto;
