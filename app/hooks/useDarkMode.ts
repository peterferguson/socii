import { useEffect, useState } from "react"

// TODO: add a setting to choose match the users system theme

export const useDarkMode = (): [string, () => void] => {
  const [theme, setTheme] = useState("light")

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode)
    setTheme(mode)
  }

  const toggleTheme = () => (theme === "light" ? setMode("dark") : setMode("light"))

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme")
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme
      ? setMode("dark")
      : localTheme
      ? setTheme(localTheme)
      : setMode("light")

    const root = document.documentElement

    theme !== "light" ? root.classList.add("dark") : root.classList.remove("dark")
  }, [theme])

  return [theme, toggleTheme]
}
