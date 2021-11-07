import { Skeleton } from "@motify/skeleton"
import tw from "../lib/tailwind"

const SkeletonText = ({ height, width }: { height: number; width: number }) => (
  <Skeleton
    colorMode={tw.prefixMatch("dark") ? "dark" : "light"}
    width={width}
    height={height}
  />
)

export default SkeletonText
