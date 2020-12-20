
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Detail = ({navigation}) => {
  return(
    <View>
      <Text>Detail Component</Text>
      <Button title='Go back' component={() => navigation.goBack()}/>
      </View>
  )
}
const Home = ({navigation}) => {
  return(
    <View>
      <Text>Home component</Text>
      <Button title='Go Detail' onPress={() => navigation.navigate('Detail')}/>
    </View>
  )
}

const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Detail' component={Detail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
