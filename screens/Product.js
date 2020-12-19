//import liraries
import React, { Component } from 'react';
import { FlatList, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-vector-icons';


import { Divider, Button, Input, Block, Text } from "../components";
import { theme, mocks } from '../constants'

const { width, height } = Dimensions.get('window')
const consoleLog = n => console.log(`****** Product.js - line: ${n} ******`)

// create a component
class Product extends Component {
  // cú pháp reactnavigation v4.x ============================
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerRight: (
  //       <Button onPress={() => { }}>
  //         <Text>Thong20</Text>
  //         {/* <Icon.Entypo name='dots-three-horizontal' color={theme.colors.gray} /> */}
  //       </Button>
  //     )
  //   }
  // }
  // =========================================================

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      // headerRight: () => (
      // <TouchableOpacity onPress={() => console.log('Clicked')}>
      //   <Icon.Entypo name='dots-three-horizontal' color={theme.colors.gray} />
      //   <Text>thong20</Text>
      // </TouchableOpacity>
      // )
    })
  }

  renderGallery() {
    const { product } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment='center'
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode='contain'
            style={{ width, height: height / 2.8 }}
          />
        )}

      />
    )
  }

  render() {
    const { product } = this.props
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderGallery()}

        <Block style={styles.product}>
          <Text h2 bold>{product.name}</Text>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
            {product.tags.map(tag => (
              <Text key={`key-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>{product.description}</Text>

          <Divider margin={[theme.sizes.padding * 0.9, 0]} />

          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[theme.sizes.padding * 0.9, 0]}>
              {product.images.slice(1, 3).map(
                (image, index) => (
                  <Image
                    key={`gallery-${index}`}
                    source={image}
                    style={styles.image}
                  />
                )
              )}
              <Block
                flex={false}
                card
                center
                middle
                color='rgba(197, 204, 214, 0.20)'
                style={styles.more}
              >
                <Text gray>+{product.images.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: mocks.products[0]
}

// define your styles
const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  }
});



//make this component available to the app
export default Product;
