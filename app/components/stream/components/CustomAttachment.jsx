import { Attachment } from "stream-chat-react";
import StockDisplayAttachment from "@components/stream/components/CustomAttachments/StockDisplayAttachment";
import InvestCommandAttachment from "./CustomAttachments/InvestCommandAttachment";
import React from "react";
import { useTickerPriceData } from "@lib/hooks";

export default function CustomAttachment(props) {
  const { attachments } = props;
  const [attachment] = attachments || [];

  switch (attachment?.type) {
    case "stock":
      return <StockDisplayAttachment attachment={attachment} />;
    case "mml":
      return <InvestCommandAttachment attachment={attachment} />;
    default:
      break;
  }

  return <Attachment {...props} />;
}
