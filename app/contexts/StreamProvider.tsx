import { useProvideAuth } from "@hooks/useProvideAuth";
import { useProvideStream } from "@hooks/useProvideStream";
import React from "react";
import { streamContext } from "./streamContext";


export function StreamProvider({ children }): JSX.Element {
  const auth = useProvideAuth();
  const stream = useProvideStream(auth.user?.uid, auth.username, auth.user?.name);
  return <streamContext.Provider value={stream}>{children}</streamContext.Provider>;
}
