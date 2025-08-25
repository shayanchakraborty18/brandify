// ThemeSelector.jsx
import { useTheme } from "../context/ThemeContext"
import { themes } from "./themes"

export default function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useTheme()

  const handleSelect = (key) => {
    setActiveTheme(key)
  }

  return (
    <div className="flex flex-col flex-wrap gap-3 p-3">
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => handleSelect(key)}
          className={`w-6 h-6 rounded-full border-1 transition 
            ${activeTheme === key ? "border-light scale-140" : "border-light/50"}`}
          style={{
            backgroundColor: themes[key]["--color-primary"],
          }}
        />
      ))}
    </div>
  )
}
