import { motion } from "framer-motion"

import type { Recipe } from "../types/recipe"
import { translations } from "../i18n/translations"

type Props = {
    recipe: Recipe
    index: number
    darkMode: boolean
    selected: boolean
    onClick: () => void
    t: typeof translations.en
}

function RecipeCard({
                        recipe,
                        index,
                        darkMode,
                        selected,
                        onClick,
                        t,
                    }: Props) {

    const safeWeight = recipe.weight || 300

    const kcalPer100g = Math.round(
        (recipe.nutrition.calories / safeWeight) * 100
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className={`
                p-4 md:p-5 rounded-3xl cursor-pointer border transition active:scale-[0.98]
                ${
                selected
                    ? darkMode
                        ? "border-white"
                        : "border-zinc-500"
                    : "border-transparent"
            }
                ${
                darkMode
                    ? "bg-zinc-900 md:hover:bg-zinc-800"
                    : "bg-white md:hover:bg-zinc-200"
            }
            `}
        >
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {recipe.title}
            </h3>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">
                    {recipe.ingredients.length} {t.ingredients}
                </p>

                <span
                    className={`
                        text-xs font-semibold px-3 py-1 rounded-full
                        ${
                        darkMode
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-yellow-100 text-yellow-700"
                    }
                    `}
                >
                    ~{kcalPer100g} kcal / 100g
                </span>
            </div>
        </motion.div>
    )
}

export default RecipeCard