import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNWSVO6RwftpqhBzCE5n3oa6owvIDoxFM",
    authDomain: "global-peek.firebaseapp.com",
    projectId: "global-peek",
    storageBucket: "global-peek.firebasestorage.app",
    messagingSenderId: "402302155536",
    appId: "1:402302155536:web:fdd1d1087fc339037f8395"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);