import { CenteredColumn } from "app/components/Centered"
import { Socii } from "app/components/Logos"
import { Numpad, PinValue } from "app/components/Numpad/"
import { HeaderText } from "@components/Text"
import {
  getAuthTimelock,
  getPinAuthAttemptsLeft,
  saveAuthTimelock,
  savePinAuthAttemptsLeft,
} from "app/handlers/localstorage/globalSettings"
import { useBlockBackButton, useDimensions } from "app/hooks"
import tw from "app/lib/tailwind"
import Constants from "expo-constants"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Alert, View } from "react-native"
import Animated from "react-native-reanimated"

const MAX_ATTEMPTS = 10
const TIMELOCK_INTERVAL_MINUTES = 5

const PinAuthenticationScreen = ({ navigation, route }) => {
  useBlockBackButton()
  const { goBack } = navigation
  //   const [errorAnimation, onShake] = useShakeAnimation()

  // TODO: Add valid values for these
  let validPin: string,
    onCancel: () => void = () => {},
    onSuccess: (pin: string) => void = () => {},
    onShake: () => void = () => {},
    errorAnimation: Animated.SharedValue<number>

  const { isNarrowPhone, isSmallPhone, isTallPhone } = useDimensions()

  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
  const [value, setValue] = useState("")
  const [initialPin, setInitialPin] = useState("")
  const [actionType, setActionType] = useState(validPin ? "authentication" : "creation")

  const finished = useRef(false)

  useEffect(() => {
    // See if the user previously tried and aborted
    // If that's the case, we need to update the default
    // amount of attempts left to prevent abuse
    const init = async () => {
      const attemptsLeft = await getPinAuthAttemptsLeft()
      if (!isNaN(attemptsLeft)) setAttemptsLeft(attemptsLeft)
    }

    init()

    return () => !finished.current && onCancel()
  }, [])

  useEffect(() => {
    const checkTimelock = async () => {
      // When opening the screen we need to check
      // if the user wasn't banned for too many tries
      const timelock = await getAuthTimelock()
      if (timelock) {
        const now = Date.now()
        const stillBanned = now < timelock
        if (stillBanned) {
          const timeLeftMS = timelock - now
          const timeAmountSeconds = timeLeftMS / 1000
          const unit = timeAmountSeconds > 60 ? "minutes" : "seconds"
          const timeAmount =
            timeAmountSeconds > 60
              ? Math.ceil(timeAmountSeconds / 60)
              : Math.ceil(timeAmountSeconds)

          Alert.alert(
            "Still blocked",
            `You still need to wait ~ ${timeAmount} ${unit} before trying again`
          )
          onCancel()
          finished.current = true
          goBack()
        } else {
          await saveAuthTimelock(null)
          await savePinAuthAttemptsLeft(null)
        }
      }
    }

    checkTimelock()
  }, [goBack, onCancel])

  useEffect(() => {
    if (attemptsLeft === 0) {
      Alert.alert(
        "Too many tries!",
        `You need to wait ${TIMELOCK_INTERVAL_MINUTES} minutes before trying again`
      )
      // Set global
      saveAuthTimelock(Date.now() + TIMELOCK_INTERVAL_MINUTES * 60 * 1000)
      onCancel()
      finished.current = true
      goBack()
    }
  }, [attemptsLeft, goBack, onCancel])

  const handleNumpadPress = useCallback(
    newValue => {
      setValue(prevValue => {
        let nextValue = prevValue
        if (nextValue === null) {
          nextValue = newValue
        } else if (newValue === "back") {
          // If pressing back while on confirmation and no value
          // we switch back to "creation" mode so the user can
          // reenter the original pin in case they did a mistake
          if (prevValue === "" && actionType === "confirmation") {
            setActionType("creation")
            setInitialPin("")
            setValue("")
          } else nextValue = prevValue.slice(0, -1)
        } else {
          if (nextValue.length <= 3) nextValue += newValue
        }

        if (nextValue.length === 4) {
          if (actionType === "authentication") {
            const valid = validPin === nextValue
            if (!valid) {
              onShake()
              setAttemptsLeft(attemptsLeft - 1)
              savePinAuthAttemptsLeft(attemptsLeft - 1)
              setTimeout(() => setValue(""), 300)
            } else {
              onSuccess(nextValue)
              finished.current = true
              setTimeout(() => goBack(), 300)
            }
          } else if (actionType === "creation") {
            // Ask for confirmation
            setActionType("confirmation")
            // Store the pin in state so we can compare with the conf.
            setInitialPin(nextValue)

            // Clear the pin
            setTimeout(() => setValue(""), 300)
          } else {
            // Confirmation
            const valid = initialPin === nextValue
            if (!valid) onShake()
            else {
              onSuccess(nextValue)
              finished.current = true
              setTimeout(() => goBack(), 300)
            }
          }
        }

        return nextValue
      })
    },
    [actionType, attemptsLeft, goBack, initialPin, onShake]
  )

  return (
    <CenteredColumn
      style={tw.style(`bg-white flex-1`, {
        paddingTop: Constants.statusBarHeight,
      })}
    >
      <CenteredColumn style={{ flex: 2 }}>
        <CenteredColumn
          style={tw.style(`px-5 mt-24 justify-between`, {
            // flex: 1,
            margin: isSmallPhone ? 0 : 28,
            paddingBottom: isNarrowPhone ? 12 : 24,
          })}
        >
          <Socii width={80} height={80} />
          <CenteredColumn style={tw`my-12`}>
            <View style={tw`mb-8`}>
              <HeaderText
                text={
                  actionType === "authentication"
                    ? "Type your PIN"
                    : actionType === "creation"
                    ? "Choose your PIN"
                    : "Confirm your PIN"
                }
              />
            </View>
            <PinValue translateX={errorAnimation} value={value} />
          </CenteredColumn>
        </CenteredColumn>
      </CenteredColumn>
      <CenteredColumn
        style={tw.style(`justify-start`, {
          flex: 3,
          margin: isTallPhone ? 27 : 12,
        })}
      >
        <CenteredColumn style={tw`max-w-[313px]`}>
          <Numpad
            decimal={false}
            onPress={handleNumpadPress}
            width={isNarrowPhone ? 275 : "100%"}
          />
        </CenteredColumn>
      </CenteredColumn>
    </CenteredColumn>
  )
}

export default React.memo(PinAuthenticationScreen)
