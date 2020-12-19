//import liraries
import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";

// create a component
class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });

    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Success!",
        "Your email has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            },
          },
        ]
        // { cancelable: false }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;

    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signUp} behavior="padding">
        <Block padding={[0, theme.sizes.padding * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />

            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign up
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  signUp: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

//make this component available to the app
export default SignUp;
