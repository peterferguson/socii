// TODO
// - Implement proper view
// - enable stream

import { AuthCheck, ClientOnly, GroupColumnCard } from "@components"
import { useAuth } from "@hooks/useAuth"
import { useStream } from "@hooks/useStream"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const NonMemberGroupView = (groupName) => {

  const is1Col = !useMediaQuery({ minWidth: 640 })

  if (Array.isArray(groupName)) groupName = groupName[0]

  return(
<div>
     NON MEMBER TEST
</div>
  )
}

export default NonMemberGroupView