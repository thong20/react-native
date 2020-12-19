//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const consoleLog = n => console.log(`===== comChild.js - line ${n} =====`);

// create a component
class ComChild extends Component {
    render() {
        console.log('this.props:', this.props)
        consoleLog(10)
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default ComChild;
