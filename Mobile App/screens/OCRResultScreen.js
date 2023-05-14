import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  Image,
  TouchableOpacity,
} from "react-native";

const OCRResultScreen = ({ route, navigation }) => {
  const details = route.params.details;
  // const details = [
  //   "Aushadhi",
  //   "Aikyam",
  //   "Hello",
  //   "Aushadhi",
  //   "Aikyam",
  //   "Hello",
  //   "Aushadhi",
  //   "Aikyam",
  //   "Hello",
  //   "Aushadhi",
  //   "Aikyam",
  //   "Hello",
  // ];
  console.log(details);

  let med_names = new Array();

  med_names.push({ title: "RESULTS", data: details });

  console.log(med_names);

  const Item = ({ name }) => (
    <View style={styles.textcontainer}>
      <View style={{ width: '90%',}}>
        <Text style={styles.regularText}>{name}</Text>
      </View>
      <Image
        source={require("../img/cross_icon.png")}
        style={{ width: 20, height: 20, resizeMode: "contain" }}
      />
    </View>
  );

  const renderItem = ({ item }) => <Item name={item} />;

  // Add section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionheader}>
      <View style={{ width: "90%" }}>
        <Text
          style={[
            styles.regularText,
            { fontWeight: "600", fontSize: 30, right: -15 },
          ]}
        >
          {title}
        </Text>
      </View>
      <Image
        source={require("../img/info_icon.png")}
        style={{ height: 40, width: 40 }}
      />
    </View>
  );

  return (
    // <ScrollView style={styles.container}>
    //   <Text style={styles.regularText}>RESULT SCREEN</Text>
    <View style={styles.innercontainer}>
      {/* <View
        style={{
          borderWidth: 0,
          width: "100%",
          height: 50,
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../img/info_icon.png")}
          style={{ height: 40, width: 40 }}
        />
      </View> */}
      <SectionList
        sections={med_names}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      ></SectionList>
      <TouchableOpacity style={styles.submit}>
        <Text style={styles.regularText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
    // </ScrollView>
  );
};

export default OCRResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#333333",
  },
  innercontainer: {
    flex: 1,
    borderWidth: 1,
    margin: 0,
    padding: 10,
    backgroundColor: "#35b5f433",
    // height: 600,
    borderRadius: 20,
    // position : "absolute",
    // float: right
  },
  sectionheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // gap: 100,
    marginTop: 0,
    padding: 10,
    // borderWidth: 1,
  },
  textcontainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    margin: 10,
    padding: 10,
    // height: 600,
    borderRadius: 20,
  },
  sitecontainer: {
    paddingHorizontal: 40,
    // paddingVertical: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  regularText: {
    fontSize: 20,
    // padding: 20,
    marginVertical: 8,
    // color: "#EDEFEE",
    textAlign: "center",
  },
  submit: {
    margin: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
  },
});
