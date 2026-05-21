import { Loader2 } from "lucide-react"

import { translations } from "../i18n/translations"

type Props = {
    dish: string
    setDish: (value: string) => void
    handleSearch: () => void
    loading: boolean
    darkMode: boolean
    t: typeof translations.en
}

function SearchBar({
                       dish,
                       setDish,
                       handleSearch,
                       loading,
                       darkMode,
                       t,
                   }: Props)
{
    return (
        <div className="max-w-3xl mb-7">
            <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={dish}
                onChange={(e) =>
                    setDish(e.target.value)
                }

                onKeyDown={(e) =>
                {
                    if (e.key === "Enter")
                    {
                        handleSearch()
                    }
                }}

                className={
                    `w-full px-4 py-4 md:px-6 md:py-5 rounded-2xl border text-base md:text-lg outline-none transition
    ${
                        darkMode
                            ? "bg-zinc-900 border-zinc-800 focus:border-zinc-600"
                            : "bg-white border-zinc-300 focus:border-zinc-500"
                    }`
                }
            />

            <button
                onClick={handleSearch}
                disabled={loading}

                className={
                    `mt-4 w-full py-4 md:py-5 rounded-2xl font-semibold transition active:scale-[0.98] flex items-center justify-center gap-2
    ${
                        darkMode
                            ? "bg-white text-black hover:bg-zinc-300"
                            : "bg-black text-white hover:bg-zinc-800"
                    }`
                }
            >
                {
                    loading
                        ? (<><Loader2 className="animate-spin" />{t.generating}</>)
                        : (t.generate)
                }
            </button>
        </div>
    )
}

export default SearchBar