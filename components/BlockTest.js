//import liraries
import React, { Component, Children } from "react";
import { View, Text, StyleSheet } from "react-native";

const consoleLog = (n) => console.log(`===== BlockTest.js - line: ${n} =====`);

// create a component
function BlockTest(props) {
	// 													toán tử rest (những phần còn lại của props)
  const { border1, borderRed, style, ...restProps } = props;

  const blockStyles = [
		border1 && styles.border1,
    borderRed && styles.borderRed,
		style,
  ];
  // console.log(restProps)
	// {consoleLog(17)}
  return(
		<View style={[...blockStyles]}>
			{props.children}
		</View>
	)
}

// define your styles
export const styles = StyleSheet.create({
  border1: {
    borderWidth: 1,
  },
  borderRed: {
    borderColor: "red",
  },
});

//make this component available to the app
export default BlockTest;
