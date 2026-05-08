
import { ChefHat } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

type Props = {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
}

function Sidebar({ darkMode, setDarkMode,}: Props)
{
    return (
        <aside
            className=
                {`w-60 border-r p-5 flex flex-col
                 ${darkMode
                    ? "border-zinc-800 bg-zinc-950"
                    : "border-zinc-300 bg-white"
                  }
                `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChefHat />

                    <h2 className="text-2xl font-bold">
                        AI Cook
                    </h2>
                </div>

                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
            </div>

        </aside>
    )
}

export default Sidebar