import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Home() {
  const { username } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <h1>Hola {username} estas en el home</h1>
      <Footer />
    </>
  );
}
