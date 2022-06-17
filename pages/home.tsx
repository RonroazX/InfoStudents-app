import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { OfferFeed } from "../components/OfferFeed";
import {
  collectionGroup,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
  Timestamp,
  startAfter,
} from "@firebase/firestore";
import { offerToJSON } from "../lib/firebase";
import { Button, Spinner } from "@chakra-ui/react";
import Loader from "../components/Loader";

const LIMIT = 2;

export async function getServerSideProps(context: any) {
  const ref = collectionGroup(getFirestore(), "offers");
  const offersQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const offers = (await getDocs(offersQuery)).docs.map(offerToJSON);
  return {
    props: { offers },
  };
}

export default function Home(props: any) {
  const [offers, setOffers] = useState(props.offers);
  const [loading, setLoading] = useState(false);
  const [offersEnd, setOffersEnd] = useState(false);

  const getMoreOffers = async () => {
    setLoading(true);
    const last = offers[offers.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const ref = collectionGroup(getFirestore(), "offers");
    const offersQuery = query(
      ref,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newOffers = (await getDocs(offersQuery)).docs.map((doc) =>
      doc.data()
    );

    setOffers(offers.concat(newOffers));
    setLoading(false);

    if (newOffers.length < LIMIT) {
      setOffersEnd(true);
    }
  };

  const { username } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <h1>Hola {username} estas en el home</h1>
      <OfferFeed offers={offers} admin={false} />
      {!loading && !offersEnd && (
        <Button variant={"solid"} onClick={getMoreOffers}>
          Cargar más
        </Button>
      )}
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
        />
      )}
      {offersEnd && "No hay más ofertas"}
      <Footer />
    </>
  );
}
