import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { AccordionList } from 'accordion-collapse-react-native';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import isaac from "isaac";
import bcrypt from 'bcryptjs';
import CryptoJS from "react-native-crypto-js";

const widthX = Dimensions.get("window").width;
const heightY = Dimensions.get("window").height;

export default function PasswordManagerScreen({ navigation }) {
  const [website, setWebsite] = useState();
  const [editing, setEditing] = useState(false);
  const [locked, setLocked] = useState(true);
  const [passwordUnset, setPasswordUnset] = useState(false);
  const [vaultPassword, setVaultPassword] = useState();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(async () => {
    try {
      let password = await AsyncStorage.getItem('passwordManagerPassword');
      if (password === null) {
        setPasswordUnset(true);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const readData = async () => {
    try {
      let encData = await AsyncStorage.getItem('encData');
      let bytes  = CryptoJS.AES.decrypt(encData, vaultPassword);
      let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setList(data);
    } catch (e) {
      console.log(e);
    }
  }

  const writeData = async () => {
    try {
      let encData = CryptoJS.AES.encrypt(JSON.stringify(list), vaultPassword).toString();
      await AsyncStorage.setItem('encData', encData);
    } catch (e) {
      console.log(e);
    }
  }

  const setupVaultPassword = async () => {
    try {
      bcrypt.setRandomFallback((len) => {
        const buf = new Uint8Array(len);
      
        return buf.map(() => Math.floor(isaac.random() * 256));
      });
      let salt = bcrypt.genSaltSync(4);
      let hash = bcrypt.hashSync(vaultPassword, salt);
      await AsyncStorage.setItem('passwordManagerPassword', hash);
      setPasswordUnset(false);
      toggleOverlay();
      setVaultPassword();
    } catch (e) {
      console.log(e);
    }
  }

  const verifyVaultPassword = async () => {
    try {
      let password = await AsyncStorage.getItem('passwordManagerPassword');
      if (bcrypt.compareSync(vaultPassword, password)) {
        setLocked(false);
        readData();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const editEntry = (id) => {
    let workingList = list;
    let workingElement = workingList.find(e => e.id === id);

    setId(workingElement.id);
    setWebsite(workingElement.website);
    setUsername(workingElement.username);
    setPassword(workingElement.password);
    setEditing(true);

    toggleOverlay();
    writeData();
  }

  const deleteEntry = (id) => {
    let workingList = list;
    let workingElement = workingList.find(e => e.id === id);

    if (workingElement) {
      let pos = workingList.indexOf(workingElement);
      workingList.splice(pos, 1);
      setList(workingList);
    }
    writeData();
  }

  const saveData = () => {
    if (!((username.length > 0 || password.length > 0) && website.length > 0)) return;
    if (editing) {
      let workingList = list;
      let workingElement = workingList.find(e => e.id === id);
      workingElement.website = website;
      workingElement.username = username;
      workingElement.password = password;
      setList(workingList);
    } else {
      let workingList = list;
      workingList.push({
        id: workingList.length,
        website,
        username,
        password
      });
      setList(workingList);
    }
    setEditing(false);
    setWebsite();
    setUsername();
    setPassword();
    toggleOverlay();
    writeData();
  }

  const [list, setList] = useState();

  function _head(item){
    return(
      <View style={styles.collapseHeader}>
        <Text style={styles.collapseText}>{item.website}</Text>
      </View>
    );
  }

  function _body(item){
    return (
      <View style={styles.collapseBody}>
      <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_600SemiBold"
      }]}>Site: <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_400Regular"
      }]}>{item.website}</Text></Text>
      <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_600SemiBold"
      }]}>Username: <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_400Regular"
      }]}>{item.username}</Text></Text>
      <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_600SemiBold"
      }]}>Password: <Text style={[styles.collapseText, {
        fontFamily: "Montserrat_400Regular"
      }]}>{item.password}</Text></Text>
      <View style={{ flexDirection: "row", flex: 1, alignSelf: 'stretch', marginTop: 15 }}>
        <View style={{
          marginRight: 10
        }}>
          <FontAwesome.Button name="edit" backgroundColor="#007AFF" onPress={() => editEntry(item.id)} style={{
            justifyContent: 'center',
            width: 100
          }} iconStyle={{
            padding: 3,
          }}>Edit</FontAwesome.Button>
        </View>
        <FontAwesome.Button name="trash" backgroundColor="#d9534f" onPress={() => deleteEntry(item.id)} style={{
          justifyContent: 'center',
          width: 100
        }} iconStyle={{
          padding: 3
        }}>Delete</FontAwesome.Button>
      </View>
      
    </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212"}} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header fontSize={widthX * 0.08} fontFamily="Montserrat_700Bold" color="#fff" text="Password Entries" paddingBottom={25} />
        <TouchableOpacity style={styles.button} onPress={toggleOverlay}>
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                New Entry
            </Text>
        </TouchableOpacity>
        <AccordionList
            list={list}
            header={_head}
            body={_body}
            keyExtractor={item => `${item.id}`}
          />
        <Overlay isVisible={passwordUnset} overlayStyle={{
          backgroundColor: "#3f3f3f",
          width: widthX * 0.8,
          height: heightY * 0.3,
        }}>
          <View style={{
              alignItems: "center",
          }}>
            <Header fontSize={widthX * 0.05} fontFamily="Montserrat_700Bold" color="#fff" text="Set a password for the vault" paddingBottom={25} paddingTop={15}/>
            <TextInput style={styles.input} onChangeText={setVaultPassword} value={vaultPassword} secureTextEntry={true}></TextInput>
            <TouchableOpacity style={[styles.button, { marginTop: 15, width: 220 }]} onPress={setupVaultPassword}>
              <Text
                  style={{
                      fontSize: 20,
                  }}
              >
                  Save
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <Overlay isVisible={locked} overlayStyle={{
          backgroundColor: "#3f3f3f",
          width: widthX * 0.8,
          height: heightY * 0.3,
        }}>
          <View style={{
              alignItems: "center",
          }}>
            <Header fontSize={widthX * 0.05} fontFamily="Montserrat_700Bold" color="#fff" text="Enter your vault password" paddingBottom={25} paddingTop={15}/>
            <TextInput style={styles.input} onChangeText={setVaultPassword} value={vaultPassword} secureTextEntry={true}></TextInput>
            <TouchableOpacity style={[styles.button, { marginTop: 15, width: 220 }]} onPress={verifyVaultPassword}>
              <Text
                  style={{
                      fontSize: 20,
                  }}
              >
                  Save
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <Overlay isVisible={visible} onBackdropPress={() => {toggleOverlay(); setEditing(false);}} overlayStyle={{
          backgroundColor: "#3f3f3f",
          width: widthX * 0.8,
          height: heightY * 0.6,
        }}>
          <ScrollView>
            <View style={{
              alignItems: "center",
            }}>
              <Header fontSize={widthX * 0.08} fontFamily="Montserrat_700Bold" color="#fff" text="New Entry" paddingBottom={25} paddingTop={15}/>
              <Header fontSize={25} fontFamily="Montserrat_400Regular" color="#fff" text="Website" />
              <TextInput style={styles.input} onChangeText={setWebsite} value={website}></TextInput>
              <Header fontSize={25} fontFamily="Montserrat_400Regular" color="#fff" text="Username" />
              <TextInput style={styles.input} onChangeText={setUsername} value={username}></TextInput>
              <Header fontSize={25} fontFamily="Montserrat_400Regular" color="#fff" text="Password" />
              <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true}></TextInput>
              <TouchableOpacity style={[styles.button, { marginTop: 15, width: 220 }]} onPress={saveData}>
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Save
                </Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </Overlay>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      padding: 10,
      paddingTop: 25
    },
    collapseHeader: {
      backgroundColor: "#252525",
      width: widthX*0.94,
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: "#fff",
      height: 70,
      justifyContent: 'center'
    },
    collapseBody: {
      backgroundColor: "#252525",
      padding: 20,
      borderRightColor: "#fff",
      borderRightWidth: 2,
      borderLeftColor: "#fff",
      borderLeftWidth: 2,
      borderBottomColor: "#fff",
      borderBottomWidth: 2
    },
    collapseText: {
      color: "#fff",
      fontFamily: "Montserrat_400Regular",
      fontSize: 20,
      paddingBottom: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#007AFF",
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 50,
      width: widthX * 0.5,
      marginBottom: 20,
      fontFamily: "Montserrat_400Regular",
    },
    input: {
      height: 50,
      width: 220,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      fontSize: 20,
      color: "#000",
      borderColor: "#000",
      backgroundColor: "#fff",
      borderRadius: 10
    }
  });
  