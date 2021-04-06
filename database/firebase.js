import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBnlb0l0bPWnCtj5VjDRr1iKzbiDQLJtsY",
    authDomain: "cata-proyecto.firebaseapp.com",
    projectId: "cata-proyecto",
    storageBucket: "cata-proyecto.appspot.com",
    messagingSenderId: "39138561309",
    appId: "1:39138561309:web:6bbad9628d120b8fcba5f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  export default{
      firebase,
      db
  }