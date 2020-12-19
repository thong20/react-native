//import liraries
import React, { Component } from "react";
import { Modal, Animated, Dimensions, Image, StyleSheet, FlatList, ScrollView } from "react-native";

import { Block, Button, Text } from "../components";
import { theme } from '../constants'

const { width, height } = Dimensions.get('window')

const consoleLog = n => console.log(`===== Welcome.js - line: ${n} =====`)

// create a component
class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  scrollX = new Animated.Value(0)

  state = {
    showTerms: false,
  }

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>
          <ScrollView style={{ paddingVertical: theme.sizes.padding }}>
            <Text caption gray height={18}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
            <Text caption gray height={18}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
            <Text caption gray height={18}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
              Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
            <Text caption gray height={18}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
              Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
            <Text caption gray height={18}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
            <Text caption gray height={18}>

              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.
            </Text>
          </ScrollView>
          <Button gradient onPress={() => this.setState({ showTerms: false })}>
            <Text center white>
              I understand
            </Text>
          </Button>
        </Block>
      </Modal>
    );
  }

  renderIllustrations() {
    const { illustrations } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled // scroll không bị trôi
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment='center'
        data={illustrations}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="center"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )
        }
        onScroll={ // Sự kiện onScroll
          Animated.event(
            // Gán tọa độ x vào this.scrollX
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            // {listener: (event) => console.log(event)},
            { useNativeDriver: false },
          )
        }

      />
    )
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width)
    // console.log('stepPosition:', stepPosition)
    // console.log('width:', width)
    // console.log('this.scrollX:', this.scrollX)
    // consoleLog(63)

    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({  // steps = 0
            inputRange: [index - 1, index, index + 1], // -1 0 1
            outputRange: [0.4, 1, 0.4],                // 0 1 2
            extrapolate: 'clamp'                       // 1 2 3
          });
          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color='gray'
              style={[styles.steps, { opacity }]}
            />
          )
        })}
        {/* <Text>* * *</Text> */}
      </Block>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary>Greener.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>Login</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('Signup')}>
            <Text center semibold>Signup</Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>Terms of service</Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    // { id:2, source: require('../assets/icons/pots.png') },
    { id: 2, source: require('../assets/images/illustration_2.png') },
    { id: 3, source: require('../assets/images/illustration_3.png') },
  ]
}

export default Welcome;

// define your styles
const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  }

});
