import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Header from '../components/Header';

const widthX = Dimensions.get("window").width;

export default function MetadataScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Header fontSize={widthX * 0.05} fontFamily="Montserrat_400Regular" color="#fff" text="Anytime you take a picture on your phone, metadata is created.
Metadata can be information such as the time and location that the file was created. Using our high tech metadata remover, you can maintain your privacy and have piece of mind by removing this sensitive data." padding={25} align='center' />
        <Text>Decentralize your data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  