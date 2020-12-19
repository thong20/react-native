//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import ComChild from './comChild'

const consoleLog = n => console.log(`===== comParent.js - line: ${n} =====`)

function ComParent (props) {

    const { 
        border1,
        border2,
        borderRed,
        style,
        ...restProps
    } = props;


    const blockStyles = [
        border1 && styles.border1,
        border2 && styles.border2,
        borderRed && styles.borderRed,
        style
    ]

    return(
        <ComChild style={blockStyles} {...restProps}>
            {props.children}
        </ComChild>
    )
}

const styles = StyleSheet.create({
  border1: {
      borderWidth: 1
  },
  border2: {
      borderWidth: 2
  },
  borderRed: {
      borderColor: 'red'
  }
});

//make this component available to the app
export default ComParent;
