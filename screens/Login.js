//import liraries
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';

import { Block, Button, Text, Input } from "../components";
import { theme } from '../constants'

const consoleLog = n => console.log(`====== Login.js - line: ${n} ======`)


const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = 'subscribe';

// create a component
class Login extends Component {
    state = {
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
        errors: [],
        loading: false,
    }

    handleLogin() {
        const { navigation } = this.props;
        const { email, password } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading: true });

        if (email !== VALID_EMAIL) {
            errors.push('email')
        }
        if (password !== VALID_PASSWORD) {
            errors.push('password')
        }

        this.setState({ errors, loading: false })

        if (!errors.length) {
            navigation.navigate('Browse')
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;

        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return (
            <KeyboardAvoidingView style={styles.login} behavior='padding'>
                <Block padding={[0, theme.sizes.padding * 1.5]}>
                    {/* <Block style={{ padding: 10}}> */}
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label="Email"
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            secure
                            label="Password"
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {
                                loading ?
                                    <ActivityIndicator size='small' color='white' /> :
                                    <Text bold white center>Login</Text>

                            }
                        </Button>

                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text
                                gray
                                caption
                                center
                                style={{ textDecorationLine: 'underline' }}
                            >
                                Forgot your password?
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
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    }
});

//make this component available to the app
export default Login;

/*
===== Thuật toán kiểm lỗi =====
- Khi nhập địa chỉ email không đúng, ta sẽ gọi hàm hasErrors('email')
và truyền giá trị 'email' vào
- Trong khi đó, ta cũng có 1 biến Array để lưu trữ kiểm lỗi,
khi gặp lỗi email, ta sẽ push vào Array 1 phần tử giá trị là 'email'
- Quay lại hàm hasErrors(), ta sử dụng method includes() để kiểm tra giá trị
'email' có trong mảng lưu trữ không, hàm này sẽ trả về TRUE nếu có, ngược lại FALSE
nếu không có.
- Tận dụng method includes() ta sử dụng toán tử điều kiện:
TRUE ? styles.hasErrors : null
*/