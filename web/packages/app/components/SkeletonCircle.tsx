import { Skeleton } from "@motify/skeleton"
import tw from "../lib/tailwind"

const SkeletonCircle = ({ height, width }: { height: number; width: number }) => (
  <Skeleton
    colorMode={tw.prefixMatch("dark") ? "dark" : "light"}
    radius="round"
    height={height}
    width={width}
  />
)

export default SkeletonCircle
