//import liraries
import React, { Component } from 'react';
import { Animated, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-vector-icons'; // có thể sử dụng <Icon.FontAwesome />
import { LinearGradient } from 'expo-linear-gradient';

import { Button, Input, Block, Text } from "../components";
import { theme, mocks } from '../constants'


const { width, height } = Dimensions.get('window')

// create a component
class Explore extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null,

  }

  renderImage(img, index) {
    const { navigation } = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - (theme.sizes.base * 2);
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 72 ? fullWidth : sizes.width * 1.1;
    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate('Product')}
      >
        <Image
          source={img}
          style={[
            styles.image,
            { minWidth: imgWidth, maxWidth: imgWidth }
          ]}
        />
      </TouchableOpacity>
    )
  }

  renderExplore() {
    const { images, navigation } = this.props;
    const mainImage = images[0];
    return (
      <Block style={{ marginBottom: height / 2.5 }}>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => navigation.navigate('Product')}
        >
          <Image
            source={mainImage}
            style={[styles.image, styles.mainImage]}
          />
        </TouchableOpacity>

        <Block row space='between' wrap>
          {
            images.slice(1).map((img, index) => this.renderImage(img, index))
          }
        </Block>
      </Block>
    )
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.6)']}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>Filter</Text>
        </Button>
      </LinearGradient>
    )
  }

  handleSearchFocus(status) {
    Animated.timing(
      this.state.searchFocus,
      {
        toValue: status ? 0.8 : 0.6, // status === true, increase flex size
        duration: 200,
        useNativeDriver: false,
      }
    ).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Block animated flex={searchFocus} style={styles.search}>
        <Input
          placeholder='Search'
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon.FontAwesome
              name={isEditing ? 'close' : 'search'}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    )
  }

  render() {
    return (
      <Block>
        {/* <Block flex={false} row center space='between' style={styles.header}> */}
        <Block flex={false} row center space='between' style={styles.header}>
          <Text h1 bold>Explore</Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    );
  }
}

Explore.defaultProps = {
  images: mocks.explore
}


// define your styles
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
    // borderWidth: 2, borderColor: 'red'
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
    // borderWidth: 2, borderColor: 'red',
    marginTop: theme.sizes.base * -1,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    // top: theme.sizes.base / -2.666,
    top: -6
  },
  explore: {
    marginHorizontal: theme.sizes.base * 2,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - (theme.sizes.base * 2),
    marginBottom: theme.sizes.padding,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - (theme.sizes.base * 2),
    minHeight: width - (theme.sizes.base * 2),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  }
});

//make this component available to the app
export default Explore;
