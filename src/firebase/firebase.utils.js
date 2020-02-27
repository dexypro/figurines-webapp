import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyApemxl4MoNVF21uyzz6ATvV8PGdkijXgE',
  authDomain: 'luxury-db-4fa8e.firebaseapp.com',
  databaseURL: 'https://luxury-db-4fa8e.firebaseio.com',
  projectId: 'luxury-db-4fa8e',
  storageBucket: 'luxury-db-4fa8e.appspot.com',
  messagingSenderId: '599449818668',
  appId: '1:599449818668:web:f1da8c65278f4934fd2389',
  measurementId: 'G-VEV956V09E'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
