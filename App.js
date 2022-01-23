import React, { useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import MetadataScreen from './screens/MetadataScreen';
import MessengerScreen from './screens/MessengerScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import PasswordManagerScreen from './screens/PasswordManagerScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function Home() {

  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Root"
            component={App}
            options={{headerShown: false }}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name="Confirm"
            component={ConfirmScreen}
          />
        </Stack.Navigator>

    </NavigationContainer>
  );

}

function App() {
  return (
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
        <Drawer.Screen name="Password Manager" component={PasswordManagerScreen} options={{
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
  );
}