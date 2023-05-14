import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Animated,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Translation from "./Translation";
import Header from "../components/Header";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { URL } from "../URL";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import AsyncStorage from "@react-native-async-storage/async-storage";

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

const SearchScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fun = async () => {
      const token = await getData();
      // console.log(token);
      setToken(token);

      const url = `${URL}/profile?token=${token}`;
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          setHistory(response.data.History);
          setUser(response.data.Name);
          // setSellerAccount(response.data.Type);
          // console.log(history);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fun();
  }, []);

  const postHistory = () => {
    const url = `${URL}/userhistory`;

    const data = JSON.stringify({
      token,
      history,
    });

    // console.log(history);

    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        // let status = response.status;
        // alert("Sign up SUCCESSFUL !!");
        console.log("Successfully History SET !!!");
        // navigation.navigate("Product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [name, setName] = useState("");
  const [clickPrescription, setClickPrescription] = useState(false);

  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  const [localSeller, setLocalSeller] = useState([]);
  const [pharmeasy, setPharmeasy] = useState([]);
  const [apollopharmacy, setApollopharmacy] = useState([]);
  const [mg1, setmg1] = useState([]);
  const [netmeds, setNetmeds] = useState([]);

  const navigateResult = () => {
    let details = new Array(),
      localSellerDetails = new Array();
    
      localSellerDetails.push({
      title: "LOCAL SELLER",
      data: localSeller,
    });
    
    // details.push({ title: "Local Seller", data: localSeller });
    
    details.push({ title: "PHARMEASY", data: pharmeasy });
    details.push({ title: "APOLLOPHARMEASY", data: apollopharmacy });
    details.push({ title: "1MG", data: mg1 });
    details.push({ title: "NETMEDS", data: netmeds });
    // console.log(details);
    navigation.navigate("Result", { details: details, sellerDetails: localSellerDetails });
  };

  const getMedDetails = () => {
    console.log({ name });
    const h = history;
    h.push(name);
    setHistory(h);

    axios
      .get(`${URL}/findProducts?title=${name}&pin=244001`)
      .then((response) => {
        console.log(response.data);
        // details.push({'title' : 'LOCAL SELLER', 'data' : response.data});
        setLocalSeller(response.data);
        // navigation.navigate("Result", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/pharmeasy?name=${name}`)
      .then((response) => {
        // console.log(response.data);
        // details.push({'title' : 'PHARMEASY', 'data' : response.data});
        setPharmeasy(response.data);
        // navigation.navigate("Result", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/apollopharmacy?name=${name}`)
      .then((response) => {
        // console.log(response.data);
        // details.push({'title' : 'APOLLOPHARMEASY', 'data' : response.data});
        setApollopharmacy(response.data);
        // navigation.navigate("Result", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/1mg?name=${name}`)
      .then((response) => {
        // console.log(response.data);
        // details.push({'title' : '1MG', 'data' : response.data});
        setmg1(response.data);
        // navigation.navigate("Result", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/netmeds?name=${name}`)
      .then((response) => {
        // console.log(response.data);
        // details.push({'title' : 'NETMEDS', 'data' : response.data});
        setNetmeds(response.data);
        // navigation.navigate("Result", { details: response.data });
      })
      .catch((err) => {
        console.log(err);
      });

    postHistory();

    // console.log(details);
    // navigation.navigate("Result", { details: details });
  };

  useEffect(() => {
    if (
      pharmeasy.length &&
      apollopharmacy.length &&
      mg1.length &&
      netmeds.length
    ) {
      // console.log(pharmeasy);
      // console.log(apollopharmacy);
      // console.log(mg1);
      // console.log(netmeds);
      navigateResult();
    }
  }, [pharmeasy, apollopharmacy, mg1, netmeds]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log("PickImage");
    // console.log(photo);

    if (!photo.canceled) {
      let uri = photo.assets[0].uri;
      let imgdata = photo.assets;
      setImage(photo.assets[0].uri);
      navigation.navigate("UploadPhoto", { image: imgdata });
    }
  };

  const { height, width } = Dimensions.get("window");
  const SCREEN_HEIGHT = Math.round(height);
  const SCREEN_WIDTH = Math.round(width);
  // console.log(height, width);

  const startValue = new Animated.Value(Math.round(height + 100));
  const endValue = Math.round(0);

  // console.log(startValue, endValue);
  // console.log(clickPrescription);

  // const startValue = useRef(new Animated.Value(0 + SCREEN_HEIGHT)).current;
  // const endValue = -100;
  const duration = 300;

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue]);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", borderWidth: 1 }}>
        <Pressable
          style={{ flex: 1, borderWidth: 0, backgroundColor: "white" }}
          onPress={() => setClickPrescription(false)}
        >
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headertext}>Hello, </Text>
                <Text style={styles.headertext}>{user.split(' ')[0]} !!!</Text>
              </View>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Image
                    style={styles.profilelogo}
                    source={require("../img/profile.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <Header /> */}

            <View style={styles.searchcontainer}>
              <View style={{ marginVertical: 0 }}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder={"Type your medicine"}
                />
              </View>
              <View
                style={{
                  marginLeft: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    name === ""
                      ? alert("Cannot be Empty !!!")
                      : getMedDetails();
                  }}
                >
                  <Image
                    style={styles.logo}
                    source={require("../img/search_icon.png")}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.innercontainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setClickPrescription(true)}
              >
                <Image
                  style={styles.btnlogo}
                  source={require("../img/med_prescription.png")}
                />
                <Text style={styles.buttonText}>Search by Prescription</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setClickPrescription(true)}
              >
                <Image
                  style={styles.btnlogo}
                  source={require("../img/med_prescription.png")}
                />
                <Text style={styles.buttonText}>Search by Medicine Image</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 200,
                marginLeft: 25,
                // borderWidth: 1,
              }}
            >
              <Image
                source={require("../img/bottom_img.png")}
                style={{ width: 310, height: 310, resizeMode: "contain" }}
              />
            </View>
            {clickPrescription ? (
              <Animated.View
                style={[
                  styles.transitionbutton,
                  {
                    transform: [
                      {
                        translateY: startValue,
                      },
                    ],
                  },
                ]}
              >
                {/* <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    width: 450,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={styles.sidelogo}
                    source={require("../img/arrow.webp")}
                  />
                </View> */}
                <View style={styles.searchbutton}>
                  <TouchableOpacity
                    style={styles.innersearchbutton}
                    onPress={() => navigation.navigate("Photo")}
                  >
                    {/* <Text style={styles.innersearchbuttonText}>Take Photo</Text> */}
                    <Image
                      style={styles.sidelogo}
                      source={require("../img/camera_icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.innersearchbutton}
                    // onPress={() => navigation.navigate("UploadPhoto")}
                    onPress={pickImage}
                  >
                    {/* <Text style={styles.innersearchbuttonText}>Upload Photo</Text> */}
                    <Image
                      style={styles.sidelogo}
                      source={require("../img/gallery_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ) : (
              <View />
            )}
          </ScrollView>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.05,
    // borderWidth: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderTopWidth: 1,
    // backgroundColor: "#147b6933",
  },
  headerTextContainer: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: "column",
    // marginTop: 5,
    marginHorizontal: 5,
    // paddingTop: 5,
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
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchcontainer: {
    flexDirection: "row",
    marginTop: -15,
    marginBottom: -10,
    // borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  innercontainer: {
    flex: 0.4,
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  searchbutton: {
    flexDirection: "row",
    // width: 300,
    height: 70,
    padding: 10,
    // marginVertical: 10,
    marginHorizontal: 10,
    // marginLeft: 20,
    // backgroundColor: "#147b6933",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innersearchbutton: {
    marginHorizontal: 10,
    // padding: 5,
    alignItems: "center",
    // borderWidth: 1,
  },
  innersearchbuttonText: {
    width: 150,
    backgroundColor: "#147b6933",
    // borderWidth: 1,
    borderRadius: 20,
    // padding: 10,
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  sidelogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  btnlogo: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  transitionbutton: {
    // flexDirection: "row",
    // width: 255,
    height: 80,
    padding: 10,
    // marginVertical: 10,
    // margin: 10,
    backgroundColor: "#147b6933",
    // backgroundColor: "gray",
    opacity: 1,
    // borderWidth: 2,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 12,
    width: 150,
    height: 155,
    padding: 10,
    marginVertical: 10,
    margin: 10,
    backgroundColor: "#147b6933",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 18,
    // borderWidth: 1,
  },
  input: {
    height: 40,
    width: 280,
    marginVertical: 24,
    borderRadius: 20,
    // borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "black",
    backgroundColor: "#147b6933",
    // background: rgba(20, 123, 105, 0.2),
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  },
});

export default SearchScreen;
