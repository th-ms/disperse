import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef, useState } from "react";
import Header from '../components/Header';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const widthX = Dimensions.get("window").width;
const axios = require('axios');

export default function HomeScreen({ navigation }) {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

  return (
    <KeyboardAwareScrollView style={{
            backgroundColor: "#121212",
        }}
        contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <Header fontSize={widthX * 0.175} fontFamily="Montserrat_700Bold" color="#fff" text="Disperse" paddingBottom={25} />
        <Header fontSize={widthX * 0.06} fontFamily="Montserrat_500Medium" color="#fff" text="Decentralized storage and communication." align="center" paddingBottom={25}/>
        <Image source={require('../public/img/network.png')} style={{ width: widthX * 0.5, height: widthX * 0.5 }} resizeMode='cover'/>
        <Header fontSize={widthX * 0.06} fontFamily="Montserrat_500Medium" color="#fff" text="Centralized for your needs." align="center" paddingTop={25}/>
        <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="second"
            countryPickerProps={{
            countryCodes: ["US"],
            }}
            countryPickerButtonStyle={{
            display: "none",
            }}
            onChangeCountry={(text) => {
            setCountryCode(text);
            }}
            onChangeText={(text) => {
            setPhoneNumber(text);
            let numberCheck = new RegExp(
                "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
            );
            setValid(numberCheck.test(text) ? true : false);
            }}
            withDarkTheme
            containerStyle={{
            width: RFValue(288, 812),
            marginBottom: RFValue(45, 812),
            marginTop: RFValue(75, 812),
            backgroundColor: "rgba(71,59,240,1)",
            borderRadius: 12,
            height: RFValue(64, 812),
            }}
            textContainerStyle={{
            backgroundColor: "rgba(13,13,13,0)",
            fontFamily: "Lato_400Regular",
            paddingLeft: RFValue(24, 812),
            }}
        />
        <Button
            onPress={() => send(phoneNumber,navigation)}
            title="Submit"
            color = {valid ? '#FFFFFF' : '#FF0000'}
        />

    </KeyboardAwareScrollView>
  );
}

function send(number,navigation){
    console.log(number);
    axios.post('http://10.49.105.72:8003/get_verification', {'number':number}).catch(function (error) {
        console.log(error);
      });
    navigation.navigate('Confirm');
}