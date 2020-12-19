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
  Item,
  Input,
} from 'native-base';

import {submitUser} from '../apiService';
import {database} from '../Setup';

const consoleLog = (n) =>
  console.log('****** realtimeDatabase.js -- line: ' + n + ' ******');

export default function RealtimeDBScreen({navigation}) {
  const [Id, setId] = useState();
  const [Name, setName] = useState('');
  const [Position, setPosition] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // chú ý: các method này sẽ tự động thực thi để xử lý lấy dữ liệu, mà ko cần gọi
    // vd: userRef(), OnLoadingListener() - ko cần gọi, vì nó giống 2 method setInterval và setTimeout
    const userRef = database().ref('/users'); // truy cập vào: root -> users, của database

    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setUsers([]);
      snapshot.forEach((childSnapshot) => {
        setUsers((users) => [...users, childSnapshot.val()]);
      });
    });

    const childRemovedListener = userRef.on('child_removed', (snapshot) => {
      // Set Your Functionality whatever you want
      alert('Child Removed');
      console.log('Child Removed Successful');
    });
    const childChangedListener = userRef.on('child_changed', (snapshot) => {
      // Set Your Functionality whatever you want
      alert('Child Updated');
      console.log('Child Updated Successful');
    });

    return () => {
      userRef.off('value', OnLoadingListener);
      userRef.off('child_removed', childRemovedListener);
      userRef.off('child_changed', childChangedListener);
    };
  }, []);

  const saveUser = () => {
    submitUser(Id, Name, Position)
      .then((result) => {
        setId(null);
        setName('');
        setPosition('');
      })
      .catch((err) => console.log(err));
  };
  const deleteAllUser = () => {
    database()
      .ref('users')
      .remove()
      .then(() => [setUsers([])]);
  };
  const deleteUser = (item) => {
    database()
      .ref('/users/' + item.Id)
      .remove()
      .then(() => {})
      .catch((error) => console.log('Remove failed: ' + error.message));
  };
  const editUser = (item) => {
    setId(item.Id);
    setName(item.Name);
    setPosition(item.Position);
  };

  return (
    <Container>
      <Header>
        <Left style={{flex: 0.2}}>
          <Button transparent icon onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 1, justifyContent: 'center'}}>
          <Title>Realtime Database</Title>
        </Body>
        <Right style={{flex: 0.2}}>
          <Button transparent icon onPress={deleteAllUser}>
            <Icon name="trash" />
          </Button>
          {/* <Button transparent icon onPress={saveUser}>
            <Icon name="save" />
          </Button> */}
        </Right>
      </Header>
      <Header searchBar rounded>
        <Item>
          <Input
            placeholder="Name"
            value={Name}
            onChangeText={(text) => setName(text)}
          />
        </Item>
        <Item>
          <Input
            placeholder="Position"
            keyboardType="numeric"
            value={Position}
            onChangeText={(text) => setPosition(text)}
          />
        </Item>
        <Button onPress={saveUser} style={{marginLeft: 10}}>
          <Text>Add</Text>
        </Button>
      </Header>
      <Content padder>
        {users.map((item, index) => (
          <ListItem icon key={`${item.Id}`}>
            <Body>
              <Text>{item.Name}</Text>
              <Text>{item.Position}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => editUser(item)}>
                <Icon active name="create" />
              </Button>
              <Button transparent onPress={() => deleteUser(item)}>
                <Icon active name="trash" />
              </Button>
            </Right>
          </ListItem>
        ))}
      </Content>
    </Container>
  );
}
