import styles from "@styles/MessagingInput.module.css";
import { memo, useCallback, useContext, useState } from 'react';
import { ImageDropzone } from 'react-file-utils';
import { logChatPromiseExecution } from 'stream-chat';
import { ChannelContext, ChatAutoComplete, EmojiPicker, useMessageInput } from 'stream-chat-react';

import EmojiIcon from "@icons/stream/emoji.svg";
import SendIcon from "@icons/stream/send.svg";
import CommandIcon from "@icons/stream/command.svg";
import LightningBoltSmall from "@icons/stream/lightningBoltSmall.svg";

import { UploadsPreview } from './UploadsPreview';

const GiphyIcon = () => (
  <div className={styles['giphy-icon__wrapper']}>
    <LightningBoltSmall />
    <p className={styles['giphy-icon__text']}>GIPHY</p>
  </div>
);

const MessagingInput = (props) => {
  const { acceptedFiles, maxNumberOfFiles, multipleUploads, sendMessage } = useContext(
    ChannelContext,
  );

  const [giphyState, setGiphyState] = useState(false);

  const overrideSubmitHandler = (message) => {
    let updatedMessage;

    if (message.attachments.length && message.text.startsWith('/giphy')) {
      const updatedText = message.text.replace('/giphy', '');
      updatedMessage = { ...message, text: updatedText };
    }

    if (giphyState) {
      const updatedText = `/giphy ${message.text}`;
      updatedMessage = { ...message, text: updatedText };
    }

    const sendMessagePromise = sendMessage(updatedMessage || message);
    logChatPromiseExecution(sendMessagePromise, 'send message');

    setGiphyState(false);
  };

  const messageInput = useMessageInput({ ...props, overrideSubmitHandler });

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      const deletePressed = e.nativeEvent?.inputType === 'deleteContentBackward';

      if (messageInput.text.length === 1 && deletePressed) {
        setGiphyState(false);
      }

      if (!giphyState && messageInput.text.startsWith('/giphy') && !messageInput.numberOfUploads) {
        e.target.value = value.replace('/giphy', '');
        setGiphyState(true);
      }

      messageInput.handleChange(e);
    },
    [giphyState, messageInput],
  );

  const onClickCommand = () => {
    messageInput.textareaRef.current.focus();
    messageInput.handleChange({
      target: { value: '/' },
      preventDefault: () => null,
    });
  };

  return (
    <div className={styles['str-chat__messaging-input']}>
      <div
        className={styles['messaging-input__button emoji-button']}
        role='button'
        aria-roledescription='button'
        onClick={messageInput.openEmojiPicker}
        ref={messageInput.emojiPickerRef}
      >
        <EmojiIcon className="h-4 w-4"/>
      </div>
      <div
        className={styles["messaging-input__button"]}
        role="button"
        aria-roledescription="button"
        onClick={onClickCommand}
      >
        <CommandIcon className="h-4 w-4"/>
      </div>
      <ImageDropzone
        accept={acceptedFiles}
        handleFiles={messageInput.uploadNewFiles}
        multiple={multipleUploads}
        disabled={
          (maxNumberOfFiles !== undefined && messageInput.numberOfUploads >= maxNumberOfFiles) ||
          giphyState
        }
      >
        <div className={'messaging-input__input-wrapper'}>
          {giphyState && !messageInput.numberOfUploads && <GiphyIcon />}
          <UploadsPreview {...messageInput} />
          <ChatAutoComplete
            commands={messageInput.getCommands()}
            innerRef={messageInput.textareaRef}
            handleSubmit={messageInput.handleSubmit}
            onSelectItem={messageInput.onSelectItem}
            onChange={onChange}
            value={messageInput.text}
            rows={1}
            maxRows={props.maxRows}
            placeholder='Send a message'
            onPaste={messageInput.onPaste}
            triggers={props.autocompleteTriggers}
            grow={props.grow}
            disabled={props.disabled}
            additionalTextareaProps={props.additionalTextareaProps}
          />
        </div>
      </ImageDropzone>
      <div
        className={styles['messaging-input__button']}
        role='button'
        aria-roledescription='button'
        onClick={messageInput.handleSubmit}
      >
        <SendIcon className="h-4 w-4"/>
      </div>
      <EmojiPicker {...messageInput} />
    </div>
  );
};

export default memo(MessagingInput);
