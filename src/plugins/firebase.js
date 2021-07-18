import firebase from "firebase/app";
import "firebase/auth";
import store from "../store/store";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
// export other Firebase bits like db, etc

const onAuthStateChangedPromise = new Promise((resolve, reject) => {
  auth.onAuthStateChanged(
    (user) => {
      store.commit(user !== null ? "LOGIN" : "LOGOUT", user);
      resolve(user);
    },
    (err) => {
      reject(err);
    }
  );
});

export const onAuthStateInit = () => onAuthStateChangedPromise;
