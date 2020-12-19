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
} from 'native-base';

import {storage, database} from '../Setup';
import {Dimensions, FlatList, Image, View} from 'react-native';

export default function CloudStorageScreen({navigation}) {
  const storageRef = storage().ref('images/tempImage10.png');
  const [allImages, setAllImages] = useState([]);

  const dataURL =
    'data:image/gif;base64,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';

  const uploadImage = async () => {
    const task = storageRef.putString(dataURL, 'data_url');
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferredout of ${taskSnapshot.totalBytes}`,
      );
    });
    task.then((taskSnapshot) => { // then() là method của Task, không phải là Promise
      console.log('Image upload successfully');
      storage()
        .ref(taskSnapshot.metadata.fullPath)
        .getDownloadURL()
        .then((addressURL) => { 
          setAllImages((allImages) => [...allImages, addressURL]);
          database().ref('imageGallery').update({imageUrl: addressURL});
        });
      console.log('allImages:', allImages[0]);
    });
  };

  const getAllImages = () => {
    const ref = storage().ref('images');
    ref.list().then((resultList) => {
      setAllImages([]);
      console.log('resultList.item:', resultList.items)
      resultList.items.forEach((itemsRef) => { // thuộc tính .items trả về 1 Array
        itemsRef.getDownloadURL().then((downloadUrl) => { // .getDownloadURL() return 1 Promise<string>
          setAllImages((allImages) => [...allImages, downloadUrl]);
        });
      });
    });
  };

  const renderImage = (item) => {
    return (
      <View key={item.index}>
        <Image
          source={{uri: item.item}}
          style={{
            //   width: Dimensions.get('window').width / 4,
            //   height: Dimensions.get('window').width / 4,
            width: 60,
            height: 60,
          }}
        />
      </View>
    );
  };
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
          <Title>Cloud Storage</Title>
        </Body>
        <Right />
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          icon
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          onPress={uploadImage}>
          <Text>Upload Image</Text>
        </Button>
        <Button
          icon
          danger
          style={{marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}}
          onPress={getAllImages}>
          <Text>Get Image Library</Text>
        </Button>
        {console.log('allImages:', allImages)}
        <>
          <FlatList
            data={allImages}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImage}
          />
        </>
      </Content>
    </Container>
  );
}
