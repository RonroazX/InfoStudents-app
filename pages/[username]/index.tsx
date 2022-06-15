import UserProfile from "../../components/UserProfile";
import { OfferFeed } from "../../components/OfferFeed";
import { offer, userType } from "../../lib/types";
import { getUserWithUsername, offerToJSON } from "../../lib/firebase";
import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
  getDocs,
} from "@firebase/firestore";

export default function UserProfilePage({
  user,
  offers,
}: {
  user: userType;
  offers: offer[];
}) {
  return (
    <main>
      <UserProfile user={user} />
      <OfferFeed offers={offers} admin={false} />
    </main>
  );
}

export async function getServerSideProps({ query }: any) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  let user = null;
  let offers = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  if (userDoc) {
    user = userDoc.data();
    const offersQuery = await queryData(userDoc);
    offers = (await getDocs(offersQuery)).docs.map(offerToJSON);
  }

  return {
    props: { user, offers },
  };
}

async function queryData(userDoc: QueryDocumentSnapshot<DocumentData>) {
  return query(
    collection(getFirestore(), userDoc.ref.path, "offers"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(5)
  );
}
