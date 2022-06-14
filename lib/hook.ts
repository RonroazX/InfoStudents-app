import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import {useContext, useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {UserContext} from "./context";
import {Unsubscribe} from "@firebase/util";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
    const [user] = useAuthState(auth);
    const [isRegistered, setIsRegistered] = useState(false);
    const [username, setUsername] = useState('');
    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;
        if (user) {
            const ref = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                if (doc.data()?.name.length) {
                    setIsRegistered(true);
                    setUsername(doc.data()?.username);
                }
            });
        } else {
            setIsRegistered(false)
        }
        return unsubscribe;
    }, [user]);
    return { user, isRegistered, username};
}

export function useUserType() {
    const [user] = useAuthState(auth);
    const [studentType, setStudentType ] = useState(false);
    useEffect(() => {
        let unsubscribe;

        if (user) {
            // const ref = firestore.collection('users').doc(user.uid);
            const ref = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setStudentType(doc.data()?.studentType);
            });
        } else {
            setStudentType(false)
        }
        return unsubscribe;

        }, [user]);
    return studentType;
}