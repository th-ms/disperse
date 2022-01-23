import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { createStackNavigator } from '@react-navigation/stack';
import MessengerHomeScreen from "./MessengerHomeScreen";
import MessageScreen from "./MessageScreen";

const Stack = createStackNavigator();

export default function MessengerScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#252525',
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
      },
      headerTitleStyle: {
        color: 'white'
      },
    }}>
      <Stack.Screen name="Messages" component={MessengerHomeScreen} />
      <Stack.Screen name="Direct Message" component={MessageScreen} />
    </Stack.Navigator>
  )
    
}