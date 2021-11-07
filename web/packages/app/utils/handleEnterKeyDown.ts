export const handleEnterKeyDown = (event: { key: string }, callback: () => void) => {
  if (event.key === "Enter") {
    callback()
  }
}
