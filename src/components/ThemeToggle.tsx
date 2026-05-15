import { Moon, Sun } from "lucide-react"

type Props = {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
}

function ThemeToggle({
                         darkMode,
                         setDarkMode,
                     }: Props)
{
    return (
        <button
            onClick={() =>
                setDarkMode(!darkMode)
            }

            className=
                {
                    `p-3 rounded-xl transition
                ${
                        darkMode
                            ? "bg-zinc-900 hover:bg-zinc-800"
                            : "bg-zinc-200 hover:bg-zinc-300"
                    }`
                }
        >
            {
                darkMode
                    ? <Sun size={18} />
                    : <Moon size={18} />
            }
        </button>
    )
}

export default ThemeToggle