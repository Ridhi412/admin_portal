// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
// import firebase from './firebase';

// import * as firebase from 'firebase';
import { db } from './firebase';
import firebase from './firebase';

db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

// db.enablePersistence()
//     .then((res) => {
//         console.log('offline Mode Enabale');
//     })
//     .catch(function (err) {
//         if (err.code === 'failed-precondition') {
//             console.log(err);
//         } else if (err.code === 'unimplemented') {
//             console.log(err);
//         }
//     });

const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    console.log(user);
    if (!user || user === null) {
        return false;
    } else {
        console.log('here true');
        return true;
    }
};

const getLoggedInUser = () => {
    const cookies = new Cookies();

    var user = null;

    console.log('username', localStorage.getItem('username'));

    if (localStorage.getItem('username') !== null && localStorage.getItem('uid') !== null) {
        var userName = localStorage.getItem('username');
        var uid = localStorage.getItem('uid');
        // console.log(username, uid);

        // const user = { username: 'username', uid: 'uid' };
        user = {
            uid: uid,
            username: userName,
            password: 'test',
            firstName: 'Test',
            lastName: 'User',
            role: 'Admin',
        };
    } else {
        user = null;
    }

    // const user = null;

    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

const loginUserFireBase = async (email, password) => {
    console.log('sendData', email, password);
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(firebase.auth().currentUser.uid);
        var Name = db.collection('users').doc(firebase.auth().currentUser.uid);
        console.log('Name', Name);
        localStorage.setItem('username', firebase.auth().currentUser.email);
        localStorage.setItem('uid', firebase.auth().currentUser.uid);
        localStorage.setItem('Name', "Admin");
        // var docRef = db.collection("cities").doc("SF");

        Name.get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                    localStorage.setItem('Name', doc.data().fname);
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error);
            });
        setTimeout(() => {
            window.location.reload(false);
        }, 2000);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const registerUserFirebase = async (email, phone, fname, lname, password, appNumber) => {
    console.log(email, password);
    try {
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

        console.log(createdUser);

        var dataTest = db.collection('users').doc(firebase.auth().currentUser.uid);

        await dataTest.set({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            applicationNumber: appNumber,
            createdAt: Date.now(),
        });

        const increment = firebase.firestore.FieldValue.increment(1);

        const appNum = db.collection('Global_Variables').doc('currentApplicationNumber');

        await appNum.update({ current: increment });

        alert('user created successfully');
        localStorage.setItem('username', firebase.auth().currentUser.email);
        localStorage.setItem('uid', firebase.auth().currentUser.uid);
        localStorage.setItem('Name', fname);
        window.location.reload();
    } catch (error) {
        console.log('here');
        console.log(error);
        alert(error.message);
    }
};

export { isUserAuthenticated, getLoggedInUser, loginUserFireBase, registerUserFirebase };
