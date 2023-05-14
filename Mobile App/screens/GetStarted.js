import { useFonts } from "expo-font";
import React from "react";
import { SafeAreaView, View, TextInput, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';

let w = 0, h = 0;
export default function GetStarted({ navigation }) {
    // const { height, width } = Dimensions.get("window");
    // console.log(height, width);
    // w = width;
    // h = height;
    // console.log(h, w);
    // const[loaded]=useFonts({})
    return (
        <View style={{ flex: 1, alignItems:'center',justifyContent:'center',backgroundColor:'#FFFFFF'}}>
            <View style={{ flex:0.2, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row',marginTop: -40 }}>
                    <Image source={require('../img/im.png')} style={styles.headimg} />
                    <Text style={styles.head}>AUSHADHI AIKYAM</Text>
                </View>
            </View>
            <Image source={require('../img/4015641_71.ios.jpg')} style={{height:276.69, width:332,resizeMode:'contain',marginBottom:30}}></Image>
                <Text style={styles.text}>Get Your Medicine</Text>
                <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:10}}>
                <Text style={styles.text1}>At</Text>
                <Text style={{fontWeight:'bold',fontSize:24,color:'#06A881'}}> Best</Text>
                <Text style={styles.text1}> Price</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Signup') } style={styles.button}><Text style={styles.textbutton}>Get Started</Text>
                </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        color:'#06A881'
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 24,
        color:'#06A881'
    },
    textbutton: {
        fontWeight: 'bold',
        fontSize: 24,
        color:'#FFFFFF'
    },
    button:{
        backgroundColor:"#06A881",
        height:51,
        width:255,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        color:'#FFFFFF',
        fontWeight:'bold'
    },
    sign: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#FFFFFF",
        opacity: 0.85
    },
    account: {
        fontWeight: 'medium',
        fontSize: 15,
        marginBottom: 5
    },
    head: {
        color: "#06A881",
        fontSize: 28,
        fontWeight: 'bold',
        opacity: 0.85
    },
    headimg: {
        height: 47,
        width: 55,
        resizeMode: 'contain'
    }
})