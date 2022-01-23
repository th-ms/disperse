import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef, useState } from "react";
import Header from '../components/Header';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TextInput } from 'react-native-gesture-handler';

const widthX = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);
  const [securityCode, setSecurityCode] = useState("");
  const [validCode, setValidCode] = useState(false);

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
        <TextInput
            maxLength={7}
            keyboardType="number-pad"
            width={RFValue(288, 812)}
            placeholderTextColor={"rgba(0, 0, 0, 0.25)"}
            placeholder={"Security Code"}
            style={{
            height: RFValue(64, 812),
            paddingLeft: RFPercentage(3),
            backgroundColor: "rgba(71,59,240,1)",
            borderRadius: 12,
            marginBottom: RFValue(45, 812),
            fontFamily: "Montserrat_500Medium",
            fontSize: RFValue(18, 812),
            }}
            onChangeText={(code) => {
            setSecurityCode(code);
            if (code.length === 6) {
                setValidCode(true);
            } else {
                setValidCode(false);
            }
            }}
        />
        <Button
            onPress={() => navigation.navigate('Root')}
            title="Submit"
            color = {valid ? '#FFFFFF' : '#FF0000'}
        />

    </KeyboardAwareScrollView>
  );
}

  