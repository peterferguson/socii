// import { BottomSheetModal } from "@gorhom/bottom-sheet"
// import { useAuth, useModal } from "app/hooks"
// import { checkUsernameExists } from "app/lib/firebase/db"
// import { createAccount } from "app/lib/firebase/function"
// import tw from "app/lib/tailwind"
// import debounce from "lodash/debounce"
// import React, { useCallback, useEffect, useState } from "react"
// import { Text, TextInputProps, View, Keyboard } from "react-native"
// import { CenteredColumn } from "./Centered"
// import { Modal, ModalBackdrop, ModalHeader } from "./Modal"
// import { Numpad } from "./Numpad"
// import NumpadValue from "./NumpadValue"
// import { RoundButton } from "./RoundButton"
// import { TextInputWithCharacterCounter } from "./TextInputWithCharacterCounter"
// import { UserPhoto } from "./UserPhoto"

// export const AddCashModal: React.FC<{
//   modalRef: React.MutableRefObject<BottomSheetModal>
// }> = ({ modalRef }) => {
//   const scrollPositions = ["75%", "95%"]
//   const { user } = useAuth()
//   const { handleClose, handleExpand } = useModal(modalRef)
//   const [scaleAnim, setScaleAnim] = useState(1)


//   const handleNumpadPress = useCallback(
//     newValue => {
//       setValue(prevValue => {
//         const isExceedingWeeklyLimit =
//           parseFloat(prevValue + parseFloat(newValue)) > limitWeekly;

//         const isInvalidFirstEntry =
//           !prevValue &&
//           (newValue === '0' || newValue === '.' || newValue === 'back');

//         const isMaxDecimalCount =
//           prevValue && prevValue.includes('.') && newValue === '.';

//         const isMaxDecimalLength =
//           prevValue &&
//           prevValue.charAt(prevValue.length - 3) === '.' &&
//           newValue !== 'back';

//         if (
//           isExceedingWeeklyLimit ||
//           isInvalidFirstEntry ||
//           isMaxDecimalCount ||
//           isMaxDecimalLength
//         ) {
//           if (isExceedingWeeklyLimit) onLimitExceeded('weekly');
//           onShake();
//           return prevValue;
//         }

//         let nextValue = prevValue;
//         if (nextValue === null) {
//           nextValue = newValue;
//         } else if (newValue === 'back') {
//           nextValue = prevValue.slice(0, -1);
//         } else {
//           nextValue += newValue;
//         }

//         onClearError();

//         let prevPosition = 1;
//         if (prevValue && prevValue.length > 3) {
//           prevPosition = 1 - (prevValue.length - 3) * 0.075;
//         }
//         if (nextValue.length > 3) {
//           const characterCount = 1 - (nextValue.length - 3) * 0.075;
//           setScaleAnim(
//             runSpring(new Clock(), prevPosition, characterCount, 0, 400, 40)
//           );
//         } else if (nextValue.length === 3) {
//           setScaleAnim(runSpring(new Clock(), prevPosition, 1, 0, 400, 40));
//         }

//         return nextValue;
//       });

//     },
//     [limitWeekly, onClearError, onLimitExceeded, onShake]
//   );

//   return (
//     <Modal
//       modalRef={modalRef}
//       snapToPositions={scrollPositions}
//       backdropComponent={ModalBackdrop}
//       defaultPositionIndex={0}
//     >
//       <View style={tw`flex-1 items-center pt-2`}>
//         <ModalHeader modalRef={modalRef} label={"To continue you need a username"} />
//         <CenteredColumn style={tw`p-4`}>
//             <NumpadValue {}/>
//             <Numpad/>
//         </CenteredColumn>
//       </View>
//     </Modal>
//   )
// }