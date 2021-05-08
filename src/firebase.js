import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAJF3EFSKve3ItBA8mNc0S2UKukDTpdB5U",
    authDomain: "movie-watch-b68e4.firebaseapp.com",
    projectId: "movie-watch-b68e4",
    storageBucket: "movie-watch-b68e4.appspot.com",
    messagingSenderId: "293172056979",
    appId: "1:293172056979:web:a477d13abae20106f9ce66"
});

export const auth = app.auth();
export default app;