import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  username: null,
  userStreamToken: null,
  userGroups: null,
});
