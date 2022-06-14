import {createContext} from "react";
import {User} from "@firebase/auth";

let user: null | undefined | User;
let studentType: undefined | boolean;

export const UserContext = createContext({ user, isRegistered: false, username: '',studentType});