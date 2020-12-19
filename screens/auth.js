/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  ListItem,
  Text,
  Left,
  Button,
  Icon,
  Right,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

import {Auth} from '../Setup';
import {SignUpUser, SignInUser, SignOutUser} from '../apiService';

const consoleLog = (n) =>
  console.log('****** auth.js -- line: ' + n + ' ******');

export default function AuthScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [state, setState] = useState({
    emailAddress: '',
    password: '',
  });
  const [user, setUser] = useState();

  const signIn = () => {
    SignInUser(state.emailAddress, state.password)
      // .then((data) => console.log('data.user:', data.user))
      .then((data) => alert(data))
      .catch((err) => console.log(err));
    consoleLog(38);
  };
  const signOut = () => {
    SignOutUser()
      .then((data) => alert(data))
      .catch((err) => alert(err));
  };
  const signUp = () => {
    SignUpUser(state.emailAddress, state.password)
      .then((data) => {
        // data là string 'Sign Up successfuly' được
        // khai báo trong hàm resolve() khi init Promise ở file auth.js
        alert(data);
      })
      .catch((err) => console.log(err));
  };

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent icon onPress={() => navigation.goBack()}>
            <Icon type="Ionicons" name="chevron-back-outline" />
            {/* <Icon type="MaterialIcons" name="arrow-back-ios" /> */}
          </Button>
        </Left>
        <Body>
          <Title>Authentication</Title>
        </Body>
        <Right>
          {user && (
            <Button transparent icon onPress={signOut}>
              <Icon name="log-out-outline" />
            </Button>
          )}
        </Right>
      </Header>
      <Content padder>
        {/* SIGN UP FORM */}
        <Form>
          <Item floatingLabel>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={state.emailAddress}
              onChangeText={(text) => setState({...state, emailAddress: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              value={state.password}
              onChangeText={(text) => setState({...state, password: text})}
            />
          </Item>
          <Button block onPress={signUp}>
            <Text>Sign Up</Text>
          </Button>
        </Form>
        {/* SIGN IN FORM */}
        <Form>
          <Item floatingLabel>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={state.emailAddress}
              onChangeText={(text) => setState({...state, emailAddress: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              value={state.password}
              onChangeText={(text) => setState({...state, password: text})}
            />
          </Item>
          <Button block onPress={signIn}>
            <Text>Sign In</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
