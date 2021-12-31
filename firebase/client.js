import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2G0eqr71fKuzTZ8_cCAjfZQqr-O6jLSA",
  authDomain: "burger-builder-app-3a30d.firebaseapp.com",
  databaseURL: "https://burger-builder-app-3a30d.firebaseio.com",
  projectId: "burger-builder-app-3a30d",
  storageBucket: "burger-builder-app-3a30d.appspot.com",
  messagingSenderId: "31208006202",
  appId: "1:31208006202:web:4907a21c0a5c290b658b03",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  if (!user) return null;

  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        // const date = new Date(createdAt.seconds * 1000);
        // const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date);

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const uploadImage = (file) => {
  const storage = firebase.storage();
  const ref = storage.ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
