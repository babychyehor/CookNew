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
                       }: Props)
{
    return (
        <AnimatePresence mode="wait">
            {
                selectedRecipe && (
                    <motion.div
                        key={selectedRecipe.title}

                        initial={{ opacity: 0, x: 40 }}

                        animate={{ opacity: 1, x: 0 }}

                        exit={{ opacity: 0, x: -40 }}

                        className=
                            {
                                `p-6 rounded-2xl ${
                                    darkMode
                                        ? "bg-zinc-900 text-white"
                                        : "bg-white"
                                }`
                            }
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            {selectedRecipe.title}
                        </h2>

                        {/* Ingredients */}

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">
                                {t.ingredients}
                            </h3>

                            <ul className="space-y-1">
                                {
                                    selectedRecipe.ingredients.map((item, i) => (
                                        <li
                                            key={i}

                                            className="text-zinc-400"
                                        >
                                            • {item}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* Steps */}

                        <div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t.instructions}
                            </h3>

                            <div className="space-y-2">
                                {
                                    selectedRecipe.steps.map((step, i) => (
                                        <div
                                            key={i}

                                            className=
                                                {
                                                    `p-3 rounded-xl ${
                                                        darkMode
                                                            ? "bg-black"
                                                            : "bg-zinc-100"
                                                    }`
                                                }
                                        >
                                            <span className="font-bold">
                                                {t.step} {i + 1}:
                                            </span>{" "}

                                            {step}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default RecipeDetails