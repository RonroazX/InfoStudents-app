import Link from "next/link";
import { offer } from "../lib/types";
import React from "react";

interface OffersFeed {
  offers: offer[];
  admin: boolean;
}

export const OfferFeed: React.FC<OffersFeed> = ({ offers, admin }) => {
  return (
    <>
      {offers
        ? offers.map((offer) => (
            <OfferItem offer={offer} key={offer.slug} admin={admin} />
          ))
        : []}
    </>
  );
};

function OfferItem({ offer, admin = false }: { offer: offer; admin: boolean }) {
  return (
    <div className="card">
      <Link href={`/${offer.username}`}>
        <a>
          <strong>By @{offer.username}</strong>
        </a>
      </Link>

      <Link href={`/${offer.username}`}>
        <h2>
          <a>{offer.title}</a>
        </h2>
      </Link>
    </div>
  );
}
