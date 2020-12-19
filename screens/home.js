/* eslint-disable no-unused-vars */
import React from 'react';
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

export default function HomeScreen({navigation}) {
  return (
    <Container>
      <Header>
        <Body>
          <Title>React Native Firebase Tutorials</Title>
        </Body>
      </Header>
      <Content>
        <ListItem onPress={() => navigation.navigate('Auth')}>
          <Text>Authentication</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('RealtimeDB')}>
          <Text>Realitme Database</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('CloudFirestore')}>
          <Text>Cloud Firestore</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('CloudStorage')}>
          <Text>Cloud Storage</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('Auth')}>
          <Text>Admob</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('Auth')}>
          <Text>Push Notifications</Text>
        </ListItem>
      </Content>
    </Container>
  );
}
