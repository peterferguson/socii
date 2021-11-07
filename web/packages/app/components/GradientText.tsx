// import MaskedView from "@react-native-masked-view/masked-view"
// import { Text } from "react-native"
// import LinearGradient from "react-native-svg"

// const GradientText = (props) => {
//   return (
//     <MaskedView
//       style={{ height: 24 }}
//       maskElement={<Text style={props.text}>{props.children}</Text>}
//     >
//       <LinearGradient
//         colors={["cadetblue", "#fabada"]}
//         start={{ x: 1, y: 1 }}
//         end={{ x: 0, y: 0.33 }}
//         style={props?.gradientStyle}
//       />
//     </MaskedView>
//   )
// }
// export default GradientText

import Svg, {
  SvgProps,
  LinearGradient,
  Text,
  Defs,
  Stop,
  TSpan,
} from "react-native-svg"

const GradientText = ({
  svgProps,
  colors,
  children,
}: {
  svgProps: SvgProps
  colors: string[]
  children: React.ReactNode
}) => (
  <Svg width="1em" height="1em" viewBox="0 0 100 100" {...svgProps}>
    <Defs>
      <LinearGradient
        id="grad"
        x1="0"
        x2="100%"
        y1="0"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        {colors.map((color, index, array) => (
          <Stop
            key={`color-${index}`}
            stopColor={color}
            offset={`${(index * 100) / array.length}%`}
          />
        ))}
      </LinearGradient>
    </Defs>
    <Text fill="url(#grad)">
      <TSpan fontSize="72" x="0" y="72">
        {children}
      </TSpan>
    </Text>
  </Svg>
)

export default GradientText
