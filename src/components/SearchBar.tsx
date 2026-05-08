import { Loader2 } from "lucide-react"

type Props = {
    dish: string
    setDish: (value: string) => void
    handleSearch: () => void
    loading: boolean
    darkMode: boolean
}

function SearchBar({dish, setDish, handleSearch, loading, darkMode,}: Props)
{
    return (
            <div className="max-w-3xl mb-7">
                <input type="text"
                    placeholder="Enter a dish..."
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()} } }
                    className=
                           {`w-full px-6 py-5 rounded-2xl border text-lg outline-none transition
                                ${darkMode ? "bg-zinc-900 border-zinc-800 focus:border-zinc-600"
                                           : "bg-white border-zinc-300 focus:border-zinc-500"
                                 }
                          `}
                />

                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className=
                        {`mt-4 w-full py-5 rounded-2xl font-semibold transition flex items-center justify-center gap-2
                        ${darkMode ? "bg-white text-black hover:bg-zinc-300" 
                                   : "bg-black text-white hover:bg-zinc-800"
                         }
                        `}
                >

                    {loading ?
                        (
                        <>
                            <Loader2 className="animate-spin" />
                            Generating recipes...
                        </>
                        )
                             : ("Generate Recipes")
                    }

                </button>
            </div>
    )
}

export default SearchBar