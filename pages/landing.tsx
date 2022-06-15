import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Centered } from "../components/Centered";
import { Box } from "@chakra-ui/react";
import LandingSearch from "../components/LandingSearch";

export default function Landing() {
  return (
    <>
      <Navbar />
      <LandingSearch />
      <Centered />
      <Footer />
    </>
  );
}
