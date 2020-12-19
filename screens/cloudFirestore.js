/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
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

import {firestore} from '../Setup';

export default function CloudFirestoreScreen({navigation}) {
  const usersCollectionRef = firestore().collection('Users');

  useEffect(() => {
    usersCollectionRef.onSnapshot((documentSnapshot) => {
      console.log(documentSnapshot.size); // count documents
    });
  }, []);

  const adduser = () => {
    usersCollectionRef.doc('12345').set({
      Name: 'donald',
      Position: 'cartoon',
      age: 'old',
      location: new firestore.GeoPoint(53.483959, -2.244644),
    });
  };

  const showDocs = () => {
    const result = usersCollectionRef
      .get()
      .then((snapshot) => snapshot.forEach((item) => console.log(item)))
      .catch((e) => console.log(e));
  };

  const deleteData = () => {
    usersCollectionRef
      .doc('12345')
      .delete()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    // const fetch = await usersCollectionRef.get();
    // fetch.forEach((snapshot) => console.log(snapshot.data()));

    await usersCollectionRef.get().then(
      // (snapshot) => snapshot.forEach((item) => console.log(item.get('Name'))),
      (snapshot) => snapshot.forEach((item) => console.log(item.data())),
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
          <Title>Firestore</Title>
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
          rounded
          style={{marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}
          onPress={adduser}>
          <Text>Save Data</Text>
        </Button>
        <Button
          rounded
          danger
          style={{marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}>
          <Text>Delete Data</Text>
        </Button>
        <Button
          rounded
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          onPress={deleteData}>
          <Text>Delete ID</Text>
        </Button>
        <Button
          danger
          rounded
          style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
          onPress={fetchData}>
          <Text>Get/Fetch Data</Text>
        </Button>
      </Content>
    </Container>
  );
}
