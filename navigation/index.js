//import liraries
import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";

import { theme } from "../constants";
import * as Icon from 'react-native-vector-icons'

/*
  const screens = createStackNavigator(
    { Welcome, Login, Explore, Browse, Product, Settings},
    {
      defaultNavigationOptions: {
        headerStyle: {},
        headerBackImage: <Image />,
        headerBackTitle: null,
        headerLeftContainerStyle: {},
        headerRightContainerStyle: {},
      }
    }
    
  )
*/

const Stack = createStackNavigator();

// create a component
const MyNavigation = () => {
  return (
    <NavigationContainer theme={{
      colors: {
        background: 'white'
      }
    }}>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          headerStyle: {
            height: theme.sizes.base * 5,
            backgroundColor: theme.colors.white,
            borderBottomColor: null,
            borderWidth: null,

            // shadow
            elevation: 0, // for android
            shadowOffset: null // for iOS
          },
          headerTitle: '',
          headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
          // headerBackTitle: '',
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            alignItems: 'center',
            marginLeft: theme.sizes.base * 1.2,
            paddingRight: theme.sizes.base,
          },
          headerRightContainerStyle: {
            alignItems: 'center',
            marginLeft: theme.sizes.base * 2,
            paddingRight: theme.sizes.base,
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log('Clicked - index.js - line: 94 *******')}
              >
                <Icon.Entypo name='dots-three-horizontal' color={theme.colors.gray} />
              </TouchableOpacity>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default MyNavigation;
