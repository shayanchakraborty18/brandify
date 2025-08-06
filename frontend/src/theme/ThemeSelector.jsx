// ThemeSelector.jsx
import { useTheme } from "../context/ThemeContext"
import { themes } from "./themes"

export default function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useTheme()

  return (
    <div className="flex flex-col gap-2 p-2">
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => setActiveTheme(key)}
          className={`rounded px-3 py-1 text-sm border ${
            activeTheme === key ? "border-primary text-primary" : "border-gray-300"
          }`}
          style={{
            backgroundColor: themes[key]["--color-background"],
            color: themes[key]["--color-text"],
          }}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
      ))}
    </div>
  )
}
