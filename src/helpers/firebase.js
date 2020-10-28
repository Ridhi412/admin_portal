import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: 'AIzaSyCnB6bVU3l1o6NSim96hYMqVYQXT8p-1ek',
    authDomain: 'stet-d84bf.firebaseapp.com',
    databaseURL: 'https://stet-d84bf.firebaseio.com',
    projectId: 'stet-d84bf',
    storageBucket: 'stet-d84bf.appspot.com',
    messagingSenderId: '851022538939',
    appId: '1:851022538939:web:6314530885f6b6dadb619e',
    measurementId: 'G-9SNP6LVLN7',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase
    .firestore()
    .enablePersistence()
    .then((res) => {
        console.log('offline Mode Enabale');
    })
    .catch(function (err) {
        if (err.code === 'failed-precondition') {
            console.log(err);
        } else if (err.code === 'unimplemented') {
            console.log(err);
        }
    });

/** Requires timestamp settings for later versions of firebase */
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
