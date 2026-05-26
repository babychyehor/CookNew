import { useEffect, useState } from "react"
import type { Recipe } from "../types/recipe"
import {getFavorites, toggleFavorite,} from "../utils/favorites"
import { ChefHat } from "lucide-react"

import ThemeToggle from "./ThemeToggle"

import type { Translation } from "../i18n/translations"

type Props = {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
    t: Translation
    setSelectedRecipe: (recipe: Recipe) => void
    setSelectedFromFavorites: (value: boolean) => void
    selectedRecipe: Recipe | null
}

function Sidebar({
                     darkMode,
                     setDarkMode,
                     t,
                     setSelectedRecipe,
                     setSelectedFromFavorites,
                     selectedRecipe,
                 }: Props) {

    const [, setFavoritesVersion] = useState(0)

    const favoriteRecipes = getFavorites()

    useEffect(() => {
        const update = () => setFavoritesVersion(v => v + 1)

        window.addEventListener("favorites-updated", update)

        return () =>
            window.removeEventListener("favorites-updated", update)
    }, [])

    return (
        <aside className={`w-60 sticky top-0 h-screen shrink-0 border-r p-5 flex flex-col
            ${darkMode ? "border-zinc-800 bg-zinc-950"
                       : "border-zinc-300 bg-white"}`}>

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <ChefHat />
                    <h2 className="text-2xl font-bold">
                        {t.sideBarHead}
                    </h2>
                </div>

                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>

            </div>

            <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold opacity-70">
                    {t.favorites}
                </h3>

                {favoriteRecipes.map(recipe => (
                    <div key={recipe.title} className={`flex items-center justify-between p-2 rounded-xl text-sm border transition 
                    ${selectedRecipe?.title === recipe.title ? "border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                                                             : darkMode ? "bg-zinc-800 border-transparent"
                                                                        : "bg-zinc-100 border-transparent"}`}>
                        <button onClick={() => {
                            setSelectedRecipe(recipe)
                            setSelectedFromFavorites(true)}}
                                className="flex-1 text-left"
                        >

                            {recipe.title}

                        </button>

                        <button
                            onClick={() => {
                                toggleFavorite(recipe)
                                window.dispatchEvent(new Event("favorites-updated"))}}
                            className="ml-2 text-xl"
                        >
                            ⭐
                        </button>

                    </div>
                ))}
            </div>

            <div className="hidden md:block mt-4 h-px w-full bg-zinc-700/40" />

        </aside>
    )
}

export default Sidebar