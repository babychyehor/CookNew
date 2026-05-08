import { motion, AnimatePresence } from "framer-motion"
import type { Recipe } from "../types/recipe";

type Props = {
    selectedRecipe: Recipe | null
    darkMode: boolean
}

function RecipeDetails({ selectedRecipe, darkMode,}: Props)
{
    return (
        <AnimatePresence mode="wait">
            {selectedRecipe &&
                (
                    <motion.div
                            key={selectedRecipe.title}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            className={`p-8 rounded-3xl ${darkMode ? "bg-zinc-900" : "bg-white"}`}>

                        <h2 className="text-4xl font-bold mb-8">
                            {selectedRecipe.title}
                        </h2>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4">
                                Ingredients
                            </h3>

                            <ul className="space-y-2">
                                {selectedRecipe.ingredients.map((item, i) => (
                                    <li key={i} className="text-zinc-400">
                                        • {item}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div>

                            <h3 className="text-2xl font-semibold mb-4">
                                Steps
                            </h3>

                            <div className="space-y-4">
                                {selectedRecipe.steps.map((step, i) => (
                                    <div key={i} className={`p-4 rounded-2xl ${darkMode ? "bg-black" : "bg-zinc-100"}`}>
                                            <span className="font-bold">
                                                Step {i + 1}:
                                            </span>{" "}
                                        {step}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default RecipeDetails