import { userType } from "../lib/types";
import { Center } from "@chakra-ui/react";

export default function UserProfile({ user }: { user: userType }) {
  return (
    <Center marginTop={"10"}>
      <div className="box-center">
        <img
          src={user?.photoURL}
          className="card-img-center"
          alt={"User Profile image"}
        />
        <p>
          <i>@{user.username}</i>
        </p>
        <h1>{user.displayName}</h1>
      </div>
    </Center>
  );
}
