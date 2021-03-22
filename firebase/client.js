import firebase from 'firebase'
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD2G0eqr71fKuzTZ8_cCAjfZQqr-O6jLSA",
  authDomain: "burger-builder-app-3a30d.firebaseapp.com",
  databaseURL: "https://burger-builder-app-3a30d.firebaseio.com",
  projectId: "burger-builder-app-3a30d",
  storageBucket: "burger-builder-app-3a30d.appspot.com",
  messagingSenderId: "31208006202",
  appId: "1:31208006202:web:4907a21c0a5c290b658b03"
};

firebase.initializeApp(firebaseConfig)

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}