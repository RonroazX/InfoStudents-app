import { userType } from "../lib/types";

export default function UserProfile({ user }: { user: userType }) {
  return (
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
  );
}
