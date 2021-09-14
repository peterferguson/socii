import { useHasMounted } from "@hooks"
import React, { useEffect, useState } from "react"

export default function ClientOnly({ children }) {
  const hasMounted = useHasMounted()
  return hasMounted ? children : null
}
