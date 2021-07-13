import { SelectedGroup } from "@models/SelectedGroup";
import { createContext } from "react";

// TODO: Not sure this is the correct use of a context ... I think it is not!
// FIXME: This seems to be responsible for memory leaks

export const selectedGroupContext = createContext({
  selectedGroup: null,
  changeSelectedGroup: null,
} as SelectedGroup);
