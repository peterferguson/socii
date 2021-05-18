import { Attachment } from "stream-chat-react";
import StockDisplayAttachment from "@components/stream/components/CustomAttachments/StockDisplayAttachment";

export default function CustomAttachment(props) {
  const { attachments } = props;
  const [attachment] = attachments || [];

  switch (attachment?.type) {
    case "stock":
      const tickerSymbol = attachment.name;
      const { name, exchange, ...asset } = attachment?.asset;

      return (
        <StockDisplayAttachment
          attachment={attachment}
          tickerSymbol={tickerSymbol}
          exchange={exchange}
          asset={asset}
        />
      );
    default:
      break;
  }

  return <Attachment {...props} />;
}
