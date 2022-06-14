import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Navbar} from '../components/Navbar'
import Enter from "./enter";
import Landing from "./landing";

const Home: NextPage = () => {
  return (
      <div>
          <Landing/>
      </div>
  );
}

export default Home
