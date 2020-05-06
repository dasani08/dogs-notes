import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBmh-ck3ZOosoqgR5nOBDRwavX3oSnwQ4g',
  authDomain: 'dog-notes.firebaseapp.com',
  databaseURL: 'https://dog-notes.firebaseio.com',
  projectId: 'dog-notes',
  storageBucket: 'dog-notes.appspot.com',
  messagingSenderId: '854153079112',
  appId: '1:854153079112:web:5c02cbf4342d7d26322b7d',
  measurementId: 'G-HGTFVB3H6K',
};

firebase.initializeApp(config);
export default firebase;
