import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import MetadataScreen from './screens/MetadataScreen';
import MessengerScreen from './screens/MessengerScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        drawerActiveBackgroundColor: "#121212",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#ccc",
        drawerStyle: {
          backgroundColor: '#000',
        },
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{
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
          headerTintColor: '#ffffff',
        }}/>
        <Drawer.Screen name="Metadata Remover" component={MetadataScreen} options={{
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
          headerTintColor: '#ffffff',
        }}/>
        <Drawer.Screen name="Messenger" component={MessengerScreen} options={{
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
          headerTintColor: '#ffffff',
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}