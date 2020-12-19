// import 'react-native-gesture-handler';
import React from 'react';
import App from './App';
import firebase, {utils} from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDmyYL1bv5nRR86s9AxZlO4HwZN33dwxQg',
  authDomain: 'minhphong1515.firebaseapp.com',
  databaseURL: 'https://minhphong1515.firebaseio.com',
  projectId: 'minhphong1515',
  storageBucket: 'minhphong1515.appspot.com',
  messagingSenderId: '275502436728',
  appId: '1:275502436728:web:2f9d17dcb92fc307baf88d',
  measurementId: 'G-G0095W507B',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, Auth, database, firestore, storage, utils};

function Setup() {
  return <App />;
}

export default Setup;
