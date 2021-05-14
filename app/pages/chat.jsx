import { UserContext } from "@lib/context";

import LoadingIndicator from "@components/LoadingIndicator";
import AuthCheck from "@components/AuthCheck";

import { useContext } from "react";
import dynamic from "next/dynamic";

const StreamChatWithNoSSR = dynamic(
  () => import("@components/stream/components/Chat"),
  { ssr: false }
);

export default function Chat() {
  const { streamClient } = useContext(UserContext);

  if (!streamClient) {
    return <LoadingIndicator />;
  }

  return (
    <AuthCheck>
      <StreamChatWithNoSSR />
    </AuthCheck>
  );
}
