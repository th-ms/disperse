import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

const widthX = Dimensions.get("window").width;

export default function MessengerHomeScreen({ navigation }) {
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#121212" }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{
            flex: 1,
            alignItems: 'center',
            padding: 25
            }}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push('Direct Message')}>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        New Message
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 50,
    width: widthX * 0.8
  },
});
