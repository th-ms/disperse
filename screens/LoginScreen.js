import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import Header from '../components/Header';

const widthX = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Header fontSize={widthX * 0.175} fontFamily="Montserrat_700Bold" color="#fff" text="Disperse" paddingBottom={25} />
        <Header fontSize={widthX * 0.06} fontFamily="Montserrat_500Medium" color="#fff" text="Decentralized storage and communication." align="center" paddingBottom={25}/>
        <Image source={require('../public/img/network.png')} style={{ width: widthX * 0.5, height: widthX * 0.5 }} resizeMode='cover'/>
        <Header fontSize={widthX * 0.06} fontFamily="Montserrat_500Medium" color="#fff" text="Centralized for your cum." align="center" paddingTop={25}/>
        <Text>Decentralize your data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  