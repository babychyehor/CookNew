import { motion, AnimatePresence } from "framer-motion"

import type { Recipe } from "../types/recipe"
import { translations } from "../i18n/translations"

type Props = {
    selectedRecipe: Recipe | null
    darkMode: boolean
    t: typeof translations.en
}

function RecipeDetails({
                           selectedRecipe,
                           darkMode,
                           t,
                       }: Props) {
    if (!selectedRecipe) return null

    const safeWeight = selectedRecipe.weight || 300

    const kcalPer100g = Math.round(
        (selectedRecipe.nutrition.calories / safeWeight) * 100
    )

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedRecipe.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-4 md:p-6 rounded-2xl overflow-hidden ${
                    darkMode ? "bg-zinc-900 text-white" : "bg-white"
                }`}
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words">
                    {selectedRecipe.title}
                </h2>

                {/* Ingredients */}
                <div className="mb-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                        {t.ingredients}
                    </h3>

                    <ul className="space-y-1">
                        {selectedRecipe.ingredients.map((item, i) => (
                            <li
                                key={i}
                                className="text-zinc-400 break-words"
                            >
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Nutrition */}
                <div className="mb-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                        {t.nutrition}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.calories}
                            </p>

                            <p className="font-bold">
                                {selectedRecipe.nutrition.calories} kcal total
                            </p>

                            <p className="text-xs text-zinc-500">
                                ~{kcalPer100g} kcal / 100g
                            </p>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.protein}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.protein} g
                            </p>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.fat}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.fat} g
                            </p>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.carbs}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.carbs} g
                            </p>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.fiber}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.fiber} g
                            </p>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${
                                darkMode ? "bg-black" : "bg-zinc-100"
                            }`}
                        >
                            <p className="text-sm text-zinc-500">
                                {t.salt}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.salt} g
                            </p>
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                        {t.instructions}
                    </h3>

                    <div className="space-y-2">
                        {selectedRecipe.steps.map((step, i) => (
                            <div
                                key={i}
                                className={`p-3 md:p-4 rounded-xl break-words ${
                                    darkMode ? "bg-black" : "bg-zinc-100"
                                }`}
                            >
                                <span className="font-bold">
                                    {t.step} {i + 1}:
                                </span>{" "}
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default RecipeDetails