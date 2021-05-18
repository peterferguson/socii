import { memo, useCallback, useContext, useReducer } from "react";
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

// 1 Is currently handled by the overrideSubmitHandler. Since we check for commands on submission
// ? This could be changed in the future for some autodetection (which may be necessary for good command chaining UX)
// ? Downside of this would be turning commands such as `/ticker TSLA` into two stage UX rather than one!

// 2 Is handled in the onChange function (Maybe move all handling in here)

const CommandIcon = ({ text }) => (
  <div className={"giphy-icon__wrapper"}>
    <LightningBoltSmall className="h-4 w-4 text-white -mr-1.5" />
    <p className={"giphy-icon__text"}>{text}</p>
  </div>
);

const commandTypes = {
  GIPHY: {
    name: "giphy",
    icon: <CommandIcon text="GIPHY" />,
  },
  INVEST: {
    name: "invest",
    icon: <CommandIcon text="INVEST" />,
  },
  BUY: {
    name: "buy",
    icon: <CommandIcon text="BUY" />,
  },
  SELL: {
    name: "sell",
    icon: <CommandIcon text="SELL" />,
  },
  // TICKER: AssetLogo, //TODO: Create a component to get a asset logo as a icon
  // STOCK: AssetLogo,
  // CRYPTO: AssetLogo,
  // ETF: AssetLogo,
};

// * Icons for buttons in input section
const emojiButtons = {
  emoji: { icon: EmojiIcon },
  command: { icon: UseCommandIcon },
  submit: { icon: SendIcon },
};

const useCommand = () => {
  const defaultCommand = { mode: false, name: "", icon: null };

  const commandReducer = (command, action) => {
    const { mode, name, icon } = command;
    const { type, newCommand } = action;

    switch (type) {
      case "FOUND_COMMAND": {
        return {
          mode,
          name: newCommand.name,
          icon: newCommand.icon,
        };
      }
      case "SET_COMMAND_MODE": {
        return { mode: true, name, icon };
      }
      case "EXIT_COMMAND_MODE": {
        return defaultCommand;
      }
      default:
        throw new Error(`Unhandled action type ${type}`);
    }
  };

  const [command, dispatch] = useReducer(commandReducer, defaultCommand);

  const setNewCommand = (newCommand) => {
    dispatch({ type: "FOUND_COMMAND", newCommand });
  };
  const enterCommandMode = () => dispatch({ type: "SET_COMMAND_MODE" });
  const exitCommandMode = () => dispatch({ type: "EXIT_COMMAND_MODE" });

  // * Check if the text starts with a command from the commandTypes enum
  const firstWordIsCommand = (text) => {
    const firstWord = text.split(" ")[0];

    switch (firstWord.replace("/", "").toLowerCase()) {
      case commandTypes.GIPHY.name:
        setNewCommand(commandTypes.GIPHY);
        return true;
      case commandTypes.INVEST.name:
        setNewCommand(commandTypes.INVEST);
        return true;
      case commandTypes.BUY.name:
        setNewCommand(commandTypes.BUY);
        return true;
      case commandTypes.SELL.name:
        setNewCommand(commandTypes.SELL);
        return true;
      default:
        return false;
    }
  };

  const reinstateCommand = (text) => `/${command.name} ${text}`;

  return [
    command,
    {
      reinstateCommand,
      firstWordIsCommand,
      enterCommandMode,
      exitCommandMode,
    },
  ];
};

const MessagingInput = (props) => {
  const { acceptedFiles, maxNumberOfFiles, multipleUploads, sendMessage } =
    useContext(ChannelContext);

  const [
    command,
    { reinstateCommand, firstWordIsCommand, enterCommandMode, exitCommandMode },
  ] = useCommand();

  const overrideSubmitHandler = (message) => {
    if (!message.text || message.text === " ") return;
    let updatedMessage;

    // - detect command & if it exists update the displayed input
    if (firstWordIsCommand(message.text) && message.attachments.length) {
      updatedMessage = { ...message, text: " " };
    }

    // - In command state reinstate the command before submission
    if (command.mode) {
      const updatedText = reinstateCommand(message.text);
      updatedMessage = { ...message, text: updatedText };
    }

    const sendMessagePromise = sendMessage(updatedMessage || message);
    logChatPromiseExecution(sendMessagePromise, "send message");
    exitCommandMode();
  };

  const messageInput = useMessageInput({ ...props, overrideSubmitHandler });

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      const deletePressed =
        e.nativeEvent?.inputType === "deleteContentBackward";

      // - In command mode detect empty deletion & exit command mode
      if (value.length <= 1 && deletePressed) {
        exitCommandMode();
      }

      // - Check for command & enter command mode if found
      // - Updating displayed input based on command removal
      if (
        !command.mode &&
        firstWordIsCommand(value) &&
        !messageInput.numberOfUploads
      ) {
        e.target.value = " ";
        enterCommandMode();
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
