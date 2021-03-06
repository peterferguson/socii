import { tw } from "@utils/tw"
import React, { memo, useCallback, useContext, useReducer } from "react"
import { ImageDropzone } from "react-file-utils"
import { BsLightning, BsLightningFill } from "react-icons/bs"
import { BiDollar } from "react-icons/bi"
import { FiSend } from "react-icons/fi"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { logChatPromiseExecution } from "stream-chat"
import {
  ChannelActionContext,
  ChannelStateContext,
  ChatAutoComplete,
  EmojiPicker,
  useMessageInputContext,
  useMessageInputState,
} from "stream-chat-react"
import { UploadsPreview } from "./UploadsPreview"
import { useMediaQuery } from "react-responsive"

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

// TODO
// TODO
// TODO
// TODO
// TODO: Convert this logic to a XState machine
// TODO
// TODO
// TODO
// TODO

const CommandIcon = ({ text }) => (
  <div className="flex items-center w-16 h-6 p-2 rounded-xl  bg-brand">
    <BsLightningFill className="w-4 h-4 text-white mr-0.5" />
    <span className="text-xs font-semibold text-white font-secondary">{text}</span>
  </div>
)

const commandTypes = {
  GIPHY: {
    name: "giphy",
    icon: <CommandIcon text="GIPHY" />,
  },
  BUY: {
    name: "buy",
    icon: <CommandIcon text="BUY" />,
  },
  SELL: {
    name: "sell",
    icon: <CommandIcon text="SELL" />,
  },
  // TODO: Readd invest command to stream
  // INVEST: {
  //   name: "invest",
  //   icon: <CommandIcon text="INVEST" />,
  // },
  // TICKER: AssetLogo, //TODO: Create a component to get a asset logo as a icon
  // STOCK: AssetLogo,
  // CRYPTO: AssetLogo,
  // ETF: AssetLogo,
}

const useCommand = () => {
  const defaultCommand = { mode: false, name: "", icon: null }

  const commandReducer = (command, action) => {
    const { mode, name, icon } = command
    const { type, newCommand } = action

    switch (type) {
      case "FOUND_COMMAND": {
        return {
          mode,
          name: newCommand.name,
          icon: newCommand.icon,
        }
      }
      case "SET_COMMAND_MODE": {
        return { mode: true, name, icon }
      }
      case "EXIT_COMMAND_MODE": {
        return defaultCommand
      }
      default:
        throw new Error(`Unhandled action type ${type}`)
    }
  }

  const [command, dispatch] = useReducer(commandReducer, defaultCommand)

  const setNewCommand = (newCommand) => dispatch({ type: "FOUND_COMMAND", newCommand })
  const enterCommandMode = () => dispatch({ type: "SET_COMMAND_MODE" })
  const exitCommandMode = () => dispatch({ type: "EXIT_COMMAND_MODE" })

  // * Check if the text starts with a command from the commandTypes enum
  const firstWordIsCommand = (text) => {
    const firstWord = text.split(" ")?.[0]

    switch (firstWord.replace("/", "").toLowerCase()) {
      case commandTypes.GIPHY.name:
        setNewCommand(commandTypes.GIPHY)
        return true
      // case commandTypes.INVEST.name:
      //   setNewCommand(commandTypes.INVEST)
      //   return true
      case commandTypes.BUY.name:
        setNewCommand(commandTypes.BUY)
        return true
      case commandTypes.SELL.name:
        setNewCommand(commandTypes.SELL)
        return true
      default:
        return false
    }
  }

  const reinstateCommand = (text) => `/${command.name} ${text}`

  return [
    command,
    {
      reinstateCommand,
      firstWordIsCommand,
      enterCommandMode,
      exitCommandMode,
    },
  ]
}

const MessageInputIconButton = React.forwardRef(({ className, Icon, onClick }, ref) => (
  <div
    className={tw(
      "flex-grow-0 px-2 opacity-50 cursor-pointer btn-transition",
      "hover:text-brand-dark hover:opacity-100",
      className
    )}
    role="button"
    aria-roledescription="button"
    onClick={onClick}
    ref={ref || null}
  >
    <Icon className="w-5 h-5 md:h-6 md:w-6" />
  </div>
))

const MessagingInput = (props) => {
  const { acceptedFiles, maxNumberOfFiles, multipleUploads, channel } =
    useContext(ChannelStateContext)
  const { sendMessage } = useContext(ChannelActionContext)
  const commands = channel?.getConfig?.()?.commands

  const [
    command,
    { reinstateCommand, firstWordIsCommand, enterCommandMode, exitCommandMode },
  ] = useCommand()

  const overrideSubmitHandler = (message) => {
    if (!message.text || message.text === " ") return
    let updatedMessage

    // - detect command & if it exists update the displayed input
    if (firstWordIsCommand(message.text) && message.attachments.length) {
      updatedMessage = { ...message, text: " " }
    }

    // - In command state reinstate the command before submission
    if (command.mode) {
      const updatedText = reinstateCommand(message.text)
      updatedMessage = { ...message, text: updatedText }
    }

    const sendMessagePromise = sendMessage(updatedMessage || message)
    logChatPromiseExecution(sendMessagePromise, "send message")
    exitCommandMode()
  }

  let messageInput = useMessageInputState({ ...props, overrideSubmitHandler })
  let messageInputContext = useMessageInputContext()

  // ! Having to resort to this as the useMessageInputContext is overwriting the overriderSubmitHandler
  messageInput = {
    ...messageInputContext,
    ...messageInput,
    textareaRef: messageInputContext.textareaRef,
    grow: true,
    maxRows: 5,
  }

  const onChange = useCallback(
    (e) => {
      const { value } = e.target
      const deletePressed = e.nativeEvent?.inputType === "deleteContentBackward"

      // - In command mode detect empty deletion & exit command mode
      if (value.length <= 1 && deletePressed) exitCommandMode()

      // - Check for command & enter command mode if found
      // - Updating displayed input based on command removal
      if (!command.mode && firstWordIsCommand(value) && !messageInput.numberOfUploads) {
        e.target.value = " "
        enterCommandMode()
      }

      messageInput.handleChange(e)
    },
    [command.mode, enterCommandMode, exitCommandMode, firstWordIsCommand, messageInput]
  )
  const onClickCommand = () => {
    messageInput.textareaRef.current.focus()
    messageInput.handleChange({
      target: { value: "/" },
      preventDefault: () => null,
    })
  }
  const onClickTicker = () => {
    messageInput.textareaRef.current.focus()
    messageInput.handleChange({
      target: { value: "$" },
      preventDefault: () => null,
    })
  }

  return (
    <div
      className={tw("flex items-center justify-center p-2 bg-white standalone:mb-4")}
      style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}
    >
      <MessageInputIconButton
        Icon={HiOutlineEmojiHappy}
        onClick={messageInput.openEmojiPicker}
        ref={messageInput.emojiPickerRef}
      />
      <MessageInputIconButton Icon={BiDollar} onClick={onClickCommand} />
      <MessageInputIconButton Icon={BsLightning} onClick={onClickTicker} />
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
        <div className="flex items-center focus-within:border focus-within:border-brand">
          {command.mode && !messageInput.numberOfUploads && command.icon}
          <UploadsPreview {...messageInput} />
          <ChatAutoComplete
            commands={commands}
            innerRef={messageInput.textareaRef}
            handleSubmit={messageInput.handleSubmit}
            onSelectItem={messageInput.onSelectItem}
            onChange={onChange}
            value={messageInput.text}
            placeholder="Send a message"
            onPaste={messageInput.onPaste}
            grow={true}
          />
        </div>
      </ImageDropzone>
      <MessageInputIconButton
        Icon={FiSend}
        className="rotate-45"
        onClick={messageInput.handleSubmit}
      />
      <EmojiPicker {...messageInput} />
    </div>
  )
}

export default memo(MessagingInput)
