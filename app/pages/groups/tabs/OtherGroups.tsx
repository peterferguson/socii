// TODO:
// potentially add all the surrounding tab context to the page.... would this cause issues for certain non users?

import ComingSoon from "@components/ComingSoon"
import React from "react"
import { FaUserInjured } from "react-icons/fa"

const OtherGroups = () => {
  return (
    <div>
      <ComingSoon color="brand-pink" description="">
        <FaUserInjured className={`w-24 h-24 text-brand-pink`} />
      </ComingSoon>
    </div>
  )
}
export default OtherGroups

// // TODO fix paths
// export async function getStaticPaths() {
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }
