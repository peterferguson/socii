import React, { createContext } from "react";

export const UserContext = createContext({
  user: null,
  username: null,
  userStreamToken: null,
  userGroups: null,
});

export const SelectedGroupContext = createContext({
  selectedGroup: null,
  changeSelectedGroup: (selectedGroup) => {},
});
