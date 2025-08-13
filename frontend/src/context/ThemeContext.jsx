// ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { themes } from "../theme/themes"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem("theme") || "blue")
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  useEffect(() => {
    const themeVars = themes[activeTheme]
    for (const key in themeVars) {
      document.documentElement.style.setProperty(key, themeVars[key])
    }
    localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, showThemeSelector, setShowThemeSelector }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
