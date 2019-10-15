import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCwgKDrSZ-Veyb9DVqMB-MVfyjYOecRX2c",
    authDomain: "react-native-lesson-56eaf.firebaseapp.com",
    databaseURL: "https://react-native-lesson-56eaf.firebaseio.com",
    projectId: "react-native-lesson-56eaf",
    storageBucket: "react-native-lesson-56eaf.appspot.com",
    messagingSenderId: "802051006894",
    appId: "1:802051006894:web:a6ee88cf19c8586cb4683f"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);