import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    TouchableOpacity,
    Text,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";
import { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import piexif from "piexifjs";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const widthX = Dimensions.get("window").width;

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

export default function MetadataScreen({ navigation }) {
    const [exifData, setExifData] = useState("");
    const [showData, setShowData] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    function parseExif(exifData) {
        const result = [];
        Object.keys(exifData).forEach(key => {
            let pair = exifData[key];
            if (typeof pair == 'string' || typeof pair == 'number') {
                result.push(`${key}: ${pair}`);
            }
        })
        return result.join('\n');
    }

    const cleanImage = async () => {
        const result = resultData;
        const base64Data = result.replace("data:image/jpeg;base64,","");
        
        try {
            const uri = FileSystem.documentDirectory + `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}.jpeg`;
            await FileSystem.writeAsStringAsync(
                uri,
                base64Data,
                {
                  'encoding': FileSystem.EncodingType.Base64
                }
            )
            const mediaResult = await MediaLibrary.saveToLibraryAsync(uri);
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    const loadImage = async () => {
        setButtonDisabled(true);

        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
          exif: true,
          quality: 1,
        });
    
        setBase64Image(pickerResult.base64);
        setExifData(parseExif(pickerResult.exif));
        setShowData(true);

        let result = piexif.remove(`data:image/jpg;base64,${pickerResult.base64}`);

        setResultData(result);
      };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#121212"}} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
            <View style={styles.container}>
                <Header
                    fontSize={widthX * 0.05}
                    fontFamily="Montserrat_400Regular"
                    color="#fff"
                    text="Anytime you take a picture on your phone, metadata is created.
    Metadata can be information such as the time and location that the file was created. Using our high tech metadata remover, you can maintain your privacy and have piece of mind by removing this sensitive data."
                    padding={25}
                    align="center"
                />
                <TouchableOpacity disabled={buttonDisabled} style={styles.button} onPress={loadImage}>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Upload Image
                    </Text>
                </TouchableOpacity>
                <View style={{
                    display: showData ? "flex" : "none",
                    alignItems: "center"
                }}>
                    <Header
                        fontSize={widthX * 0.07}
                        fontFamily="Montserrat_400Regular"
                        color="#fff"
                        text="Results:"
                        paddingTop={25}
                        paddingBottom={25}
                        align="center"
                    />
                    <Image
                        source={{
                            uri: `data:image/jpg;base64,${base64Image}`
                        }}
                        resizeMode="cover"
                        style={{
                            width: widthX * 0.75,
                            height: widthX * 0.75,
                        }}
                    />
                    <Text style={{
                        padding: 30,
                        color: "#fff"
                    }}>{exifData}</Text>
                    <TouchableOpacity disabled={buttonDisabled} style={{
                        alignItems: "center",
                        backgroundColor: "#50D766",
                        paddingLeft: 80,
                        paddingRight: 80,
                        paddingTop: 20,
                        paddingBottom: 20,
                        borderRadius: 50,
                        marginBottom: 50
                    }} onPress={cleanImage}>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Clean and Save
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 50,
    },
});
