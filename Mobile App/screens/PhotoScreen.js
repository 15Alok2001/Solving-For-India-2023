import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { Button, Image, View, Text, StyleSheet } from "react-native";
// import {ErrorAlert} from "./utils";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from "expo-camera";

import CameraButton from "../components/CameraScreenButton";
import mime from "mime";
import axios from "axios";
import { URL } from "../URL";

export default function PhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [permission, requestPermission] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log(cameraStatus.status);
      requestPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (permission === false) {
    // Camera permissions are still loading
    return <Text>No access to camera</Text>;
  }

  //   if (permission != ) {
  //     // Camera permissions are not granted yet
  //     return (
  //       <View style={styles.container}>
  //         <Text style={{ textAlign: "center" }}>
  //           We need your permission to show the camera
  //         </Text>
  //         <Button onPress={requestPermission} title="grant permission" />
  //       </View>
  //     );
  //   }

  //   function toggleCameraType() {
  //     setType((current) =>
  //       current === CameraType.back ? CameraType.front : CameraType.back
  //     );
  //   }

  const sendImage = () => {
    // console.log(image[0]);
    const uri = image;
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

  const takePicture = async () => {
    // console.log(cameraRef);
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        setImage(photo.uri);
        // console.log(image);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    console.log(image);
    if (image) {
        try {
            // Not able to save the image !!!!
            // await MediaLibrary.createAssetsAsync(image);
            // alert('Picture Save !!');
            navigation.navigate("Result");
            // setImage(null);
        } catch(e){
            console.log(e);
        }
    }
  }


  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} ratio="16:9" type={type} ref={cameraRef}>
          <View style={styles.camerabtn}>
            <CameraButton
              icon={"retweet"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <CameraButton
              icon={"flash"}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={styles.camerabtn}>
            <CameraButton
              title={"Re-Take"}
              icon="retweet"
              onPress={() => setImage(null)}
              color={'black'}
            />
            <CameraButton title={"Confirm"} icon="check" color={'black'} onPress={sendImage}/>
          </View>
        ) : (
          <CameraButton
            title={"Take a Picture"}
            icon="camera"
            onPress={takePicture}
            color={"black"}
          />
        )}
      </View>

      {/* <TouchableOpacity
        onPress={async () => {
          const response = await pickImage();
          if (response?.imageData) {
            setImage(response.assets[0].uri);
            setImageData(response?.imageData);
          }
        }}
      >
        <Text>Upload Picture</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  camerabtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 64,
  },
  button: {
    hegiht: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
