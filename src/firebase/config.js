import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDkNFK33fPJeCLG0sJ8Z79sXc5wUuouyMM",
  authDomain: "vegan-way-16bda.firebaseapp.com",
  projectId: "vegan-way-16bda",
  storageBucket: "vegan-way-16bda.appspot.com",
  messagingSenderId: "3048133841",
  appId: "1:3048133841:web:7f33a6efd8691c528421f0",
  measurementId: "G-XWT8WRTVZX"
};

//inicializa firebase
firebase.initializeApp(firebaseConfig)

//inicializa serviço firestore
const projectFirestore = firebase.firestore()

export { projectFirestore }