import { motion } from "framer-motion"
import type { MouseEvent } from "react"
import { useState } from "react"
import { isFavorite, toggleFavorite } from "../utils/favorites"

import type { Recipe } from "../types/recipe"
import { translations } from "../i18n/translations"
import { getFavorites } from "../utils/favorites"


type Props = {
    recipe: Recipe
    index: number
    darkMode: boolean
    selected: boolean
    hasSelected: boolean
    onClick: () => void
    t: typeof translations.en
}

function RecipeCard({
                        recipe,
                        index,
                        darkMode,
                        selected,
                        hasSelected,
                        onClick,
                        t,
                    }: Props) {
    const favorites = getFavorites()

    const isFav = favorites.some((fav) => fav.title === recipe.title)

    const [favorite, setFavorite] = useState(isFavorite(recipe.title))

    function handleFavorite(e: MouseEvent) {
        e.stopPropagation()

        const updated = toggleFavorite(recipe)

        setFavorite(updated.some(item => item.title === recipe.title))

        window.dispatchEvent(new Event("favorites-updated"))
    }

    const safeWeight = recipe.weight || 300

    const kcalPer100g = Math.round((recipe.nutrition.calories / safeWeight) * 100)

    return (
        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{opacity: hasSelected ? selected ? 1 : 0.4 : 1, height: hasSelected ? selected ? "auto" : 80 : "auto"}}
                            exit={{ opacity: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={onClick}
                            className={`p-4 md:p-5 rounded-3xl cursor-pointer border transition active:scale-[0.98] overflow-hidden
                            
                            ${isFav ? "border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : selected ? darkMode ? "border-white" : "border-zinc-500" : "border-transparent"}
                            
                            ${darkMode ? "bg-zinc-900 md:hover:bg-zinc-800"
                                       : "bg-white md:hover:bg-zinc-200"}
                                `}>

                                                    <div className="flex items-center justify-between mb-3">

                                                        <h3 className="text-xl md:text-2xl font-semibold">
                                                            {recipe.title}
                                                        </h3>

                                                        <button onClick={handleFavorite} className="text-2xl">
                                                            {favorite ? "⭐" : "☆"}
                                                        </button>
                                                    </div>

                            {(!hasSelected || selected) && (
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-zinc-500">
                                        {recipe.ingredients.length} {t.ingredients}
                                    </p>

                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full   
                                    ${darkMode ? "bg-yellow-500/20 text-yellow-300" 
                                               : "bg-yellow-100 text-yellow-700"}
                                    `}>

                                    ~{kcalPer100g} kcal / 100g

                                    </span>
                                </div>
                            )}
        </motion.div>
    )
}

export default RecipeCard