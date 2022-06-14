// Import the functions you need from the SDKs you need
import {FirebaseOptions, getApp, initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "@firebase/auth";
import {collection, DocumentSnapshot, getDocs, getFirestore, limit, query, where} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOZ5Z4sfNSzPx7hf9wnKGD8PX5PPQqlyw",
    authDomain: "infostudents-8abaa.firebaseapp.com",
    projectId: "infostudents-8abaa",
    storageBucket: "infostudents-8abaa.appspot.com",
    messagingSenderId: "948245169952",
    appId: "1:948245169952:web:556372b39dd1f7d254f945",
    measurementId: "G-8GLG68CR0K"
};

// Initialize Firebase
function createFirebaseApp(config: FirebaseOptions) {
    try {
        return getApp();
    } catch {
        return initializeApp(config);
    }
}

export async function getUserWithUsername(username: string | string[] | undefined) {
    const q = query(
        collection(firestore, 'users'),
        where('username', '==', username),
        limit(1)
    )
    return (await getDocs(q)).docs[0];
}

export function offerToJSON(doc: DocumentSnapshot) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);