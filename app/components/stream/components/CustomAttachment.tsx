import { Attachment } from "stream-chat-react";

export default function CustomAttachment(props) {
  const { attachments } = props;
  const [attachment] = attachments || [];

  if (attachment?.type === "stock") {
    return (
      <div>
        Stock:
        <a href={attachment.url} rel="noreferrer">
          <img alt="custom-attachment" height="100px" src={attachment.image} />
          <br />
          {attachment.name}
        </a>
      </div>
    );
  }

  return <Attachment {...props} />;
}
