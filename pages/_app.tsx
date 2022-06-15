import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import { useUserType, useUserData } from "../lib/hook";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  const userType = useUserType();

  return (
    <ErrorBoundary>
      <UserContext.Provider
        value={{
          user: userData.user,
          isRegistered: userData.isRegistered,
          username: userData.username,
          studentType: userType,
        }}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
