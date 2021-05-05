import React from 'react';
import { MessageSimple } from 'stream-chat-react';

import "@styles/CustomMessage.module.css";

const CustomMessage = (props) => {
  return (
    <>
      <MessageSimple {...props} />
    </>
  );
};

export default CustomMessage;
