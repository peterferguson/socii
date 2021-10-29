import { Skeleton } from "@motify/skeleton"
import tw from "../lib/tailwind"

const SkeletonCircle = ({ radius }: { radius: number }) => (
  <Skeleton
    colorMode={tw.prefixMatch("dark") ? "dark" : "light"}
    radius="round"
    height={radius * 2}
    width={radius * 2}
  />
)

export default SkeletonCircle
