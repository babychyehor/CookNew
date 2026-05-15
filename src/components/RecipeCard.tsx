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
                    }: Props)
{
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0 }}

            transition={{ delay: index * 0.1 }}

            onClick={onClick}

            className=
                {
                    `p-5 rounded-3xl cursor-pointer border transition
                ${
                        selected
                            ? darkMode
                                ? "border-white"
                                : "border-zinc-500"
                            : "border-transparent"
                    }
                ${
                        darkMode
                            ? "bg-zinc-900 hover:bg-zinc-800"
                            : "bg-white hover:bg-zinc-200"
                    }`
                }
        >
            <h3 className="text-2xl font-semibold mb-3">
                {recipe.title}
            </h3>

            <p className="text-sm text-zinc-500">
                {t.ingredients}: {recipe.ingredients.length}
            </p>
        </motion.div>
    )
}

export default RecipeCard