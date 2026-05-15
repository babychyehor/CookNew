import type { Language } from "../i18n/translations"

type Props = {
    language: Language
    setLanguage: (lang: Language) => void
}

function LanguageSwitcher({language, setLanguage,}: Props)
{
    return (
        <div className="relative inline-block">
            <select
                value={language}
                onChange={(e) =>
                    setLanguage(e.target.value as Language)
                }

                className="
                    appearance-none
                    cursor-pointer

                    px-4 py-2 pr-10

                    rounded-xl

                    border

                    text-sm font-medium

                    transition

                    bg-white text-black
                    border-zinc-300

                    dark:bg-zinc-900
                    dark:text-white
                    dark:border-zinc-700

                    hover:border-zinc-500
                    focus:outline-none
                "
            >
                <option value="en">🇬🇧 English</option>
                <option value="ua">🇺🇦 Українська</option>
                <option value="cz">🇨🇿 Čeština</option>
            </select>

            {/* arrow */}
            <div className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                text-zinc-500
            ">
                ▾
            </div>
        </div>
    )
}

export default LanguageSwitcher