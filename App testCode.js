import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const consoleLog = n => console.log(`****** App.js - line: ${n} ******`)

ScreenDetail.defaultProps = {
  navigation: this.props
}
class ScreenDetail extends Component {

  render() {
    // const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <Text>Thong20</Text>
      )
    })
    return (
      <View>
        <Text>Screen Home</Text>
      </View>
    )

  }
}

class ScreenHome extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Screen Home</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ScreenDetail')}
          style={{
            backgroundColor: 'coral',
            width: 100,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 15
          }}
        >
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
            Click
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{
      colors: {
        background: 'dodgerblue'
      }
    }}>


      <Stack.Navigator>
        <Stack.Screen name='ScreenHome' component={ScreenHome} />
        <Stack.Screen name='ScreenDetail' component={ScreenDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
