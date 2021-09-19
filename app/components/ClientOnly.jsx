import { useHasMounted } from "@hooks"

export default function ClientOnly({ children }) {
  const hasMounted = useHasMounted()
  return hasMounted ? children : null
}
