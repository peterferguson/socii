import { memo, useCallback, useContext, useState } from "react";
import { ImageDropzone } from "react-file-utils";
import { logChatPromiseExecution } from "stream-chat";
import {
  ChannelContext,
  ChatAutoComplete,
  EmojiPicker,
  useMessageInput,
} from "stream-chat-react";

import EmojiIcon from "@icons/stream/emoji.svg";
import SendIcon from "@icons/stream/send.svg";
import UseCommandIcon from "@icons/stream/command.svg";
import LightningBoltSmall from "@icons/stream/lightningBoltSmall.svg";

import { UploadsPreview } from "./UploadsPreview";

// * Actions split by state

// - Command mode disabled
// 1 detect command submission to activate
// 2 detect submission to remove command

// - Command mode active
// 1 detect deletion event to deactivate
// 2 detect submission to reinstate removed command

// ! BUG: When a user types a command twice or a series of commands they get stuck in a
// ! BUG: true command state but no command is executed. Allowing command chaining could
// ! BUG: definitely be a future feature. So we need to test for this & handle it.
// ! BUG: As an example feature consider the /buy /ticker command combination

// * Initial state has the following structure
// * {commandMode: false, command: "", commandIcon: null, messageText: ""}
// * submitHandler checks the state and either removes or reinstates the command
// * i.e. submitHandler handles the text being sent
// * onChange checks the state and updates it based on deletion or command presence
// * i.e. onChange handles state updates

// 1 Is currently handled by the overrideSubmitHandler. Since we check for commands on submission
// ? This could be changed in the future for some autodetection (which may be necessary for good command chaining UX)
// ? Downside of this would be turning commands such as `/ticker TSLA` into two stage UX rather than one!

// 2 Is handled in the onChange function (Maybe move all handling in here)

const CommandIcon = ({ type }) => (
  <div className={"giphy-icon__wrapper"}>
    <LightningBoltSmall className="h-4 w-4 text-white -mr-1.5" />
    <p className={"giphy-icon__text"}>{type}</p>
  </div>
);

const commandTypes = {
  GIPHY: {
    name: "giphy",
    icon: <CommandIcon type="GIPHY" />,
  },
  INVEST: {
    name: "invest",
    icon: <CommandIcon type="INVEST" />,
  },
  BUY: {
    name: "buy",
    icon: <CommandIcon type="BUY" />,
  },
  SELL: {
    name: "sell",
    icon: <CommandIcon type="SELL" />,
  },
  // TICKER: AssetLogo, //TODO: Create a component to get a asset logo as a icon
  // STOCK: AssetLogo, //TODO: Create a component to get a asset logo as a icon
  // CRYPTO: AssetLogo, //TODO: Create a component to get a asset logo as a icon
};

// * Icons for buttons in input section
const emojiButtons = {
  emoji: { icon: EmojiIcon },
  command: { icon: UseCommandIcon },
  submit: { icon: SendIcon },
};

const MessagingInput = (props) => {
  const { acceptedFiles, maxNumberOfFiles, multipleUploads, sendMessage } =
    useContext(ChannelContext);

  const defaultCommand = { mode: false, name: "", icon: null };
  const [command, setCommand] = useState(defaultCommand);

  // * Check if the text starts with a command from the commandTypes enum
  const containsCommand = (text) => {
    const firstWord = text.split(" ")[0];
    switch (firstWord.replace("/", "").toLowerCase()) {
      case commandTypes.GIPHY.name:
        setCommand((command) => ({ ...command, ...commandTypes.GIPHY }));
        return true;
      case commandTypes.INVEST.name:
        setCommand((command) => ({ ...command, ...commandTypes.INVEST }));
        return true;
      case commandTypes.BUY.name:
        setCommand((command) => ({ ...command, ...commandTypes.BUY }));
        return true;
      case commandTypes.SELL.name:
        setCommand((command) => ({ ...command, ...commandTypes.SELL }));
        return true;
      default:
        return false;
    }
  };

  const reinstateCommand = (text) => `/${command.name} ${text}`;
  const removeCommand = (text) => text.replace(`/${command.name}`, "");

  const overrideSubmitHandler = (message) => {
    let updatedMessage;
    // if (!message.text) return;

    // - detect command & if it exists update the displayed input
    if (containsCommand(message.text) && message.attachments.length) {
      const updatedText = removeCommand(message.text);
      updatedMessage = { ...message, text: updatedText };
    }

    // - In command state reinstate the command before submission
    if (command.mode) {
      const updatedText = reinstateCommand(message.text);
      updatedMessage = { ...message, text: updatedText };
    }

    const sendMessagePromise = sendMessage(updatedMessage || message);
    logChatPromiseExecution(sendMessagePromise, "send message");
    setCommand((command) => ({ ...command, mode: false }));
  };

  const messageInput = useMessageInput({ ...props, overrideSubmitHandler });

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      const deletePressed =
        e.nativeEvent?.inputType === "deleteContentBackward";

      // - In command mode detect empty deletion & exit command mode
      if (messageInput.text.length === 1 && deletePressed) {
        setCommand((command) => ({ ...command, mode: false }));
      }

      // - Check for command & enter command mode if found
      // - Updating displayed input based on command removal
      if (
        !command.mode &&
        containsCommand(messageInput.text) &&
        !messageInput.numberOfUploads
      ) {
        e.target.value = removeCommand(value);
        setCommand((command) => ({ ...command, mode: true }));
      }
      messageInput.handleChange(e);
    },
    [command.name, messageInput]
  );

  const onClickCommand = () => {
    messageInput.textareaRef.current.focus();
    messageInput.handleChange({
      target: { value: "/" },
      preventDefault: () => null,
    });
  };
  return (
    <div className={"str-chat__messaging-input"}>
      <EmojiButton
        emojiButton={emojiButtons.emoji}
        onClick={messageInput.openEmojiPicker}
        ref={messageInput.emojiPickerRef}
      />
      <EmojiButton
        emojiButton={emojiButtons.command}
        onClick={onClickCommand}
      />
      <ImageDropzone
        accept={acceptedFiles}
        handleFiles={messageInput.uploadNewFiles}
        multiple={multipleUploads}
        disabled={
          (maxNumberOfFiles !== undefined &&
            messageInput.numberOfUploads >= maxNumberOfFiles) ||
          command.mode
        }
      >
        <div className={"messaging-input__input-wrapper"}>
          {command.mode && !messageInput.numberOfUploads ? command.icon : null}
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
            placeholder="Send a message"
            onPaste={messageInput.onPaste}
            triggers={props.autocompleteTriggers}
            grow={props.grow}
            disabled={props.disabled}
            additionalTextareaProps={props.additionalTextareaProps}
          />
        </div>
      </ImageDropzone>
      <EmojiButton
        emojiButton={emojiButtons.submit}
        onClick={messageInput.handleSubmit}
      />
      <EmojiPicker {...messageInput} />
    </div>
  );
};

const EmojiButton = ({ emojiButton }) => (
  <div
    className={"messaging-input__button"}
    role="button"
    aria-roledescription="button"
    onClick={emojiButton.onClick}
    ref={emojiButton.ref ? emojiButton.ref : null}
  >
    <emojiButton.icon
      className={`h-8 w-8 sm:h-6 sm:w-6 ${
        emojiButton?.className ? emojiButton?.className : ""
      }`}
    />
  </div>
);

export default memo(MessagingInput);
