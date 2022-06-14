import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import {UserContext} from "../lib/context";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth, firestore} from "../lib/firebase";
import {User} from "@firebase/auth";
import {doc, getFirestore, onSnapshot} from "@firebase/firestore";
import {useUserType, useUserData} from "../lib/hook";
import ErrorBoundary from "../components/ErrorBoundary";
import {Footer} from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
    const userData = useUserData();
    const userType = useUserType();

    return (
        <ErrorBoundary>
            <UserContext.Provider value={{user: userData.user, isRegistered: userData.isRegistered, username: userData.username, studentType: userType}}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </UserContext.Provider>
        </ErrorBoundary>
  )
}

export default MyApp
