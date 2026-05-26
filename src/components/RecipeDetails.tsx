import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

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
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])

    if (!selectedRecipe) {
        return null
    }

    const safeWeight = selectedRecipe.weight || 300

    const kcalPer100g = Math.round(
        (selectedRecipe.nutrition.calories / safeWeight) * 100
    )

    const missingIngredients =
        selectedRecipe.ingredients.filter(
            item => !checkedIngredients.includes(item)
        )

    const shoppingListText =
        missingIngredients
            .map(item => `• ${item}`)
            .join("\n")

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedRecipe.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-4 md:p-6 rounded-2xl overflow-hidden ${
                    darkMode
                        ? "bg-zinc-900 text-white"
                        : "bg-white"
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

                    <p className="text-sm opacity-70 mb-4">
                        {t.ingredientHint}
                    </p>

                    <ul className="space-y-2">
                        {selectedRecipe.ingredients.map(
                            (item, i) => {
                                const checked = checkedIngredients.includes(item)

                                return (
                                            <li key={i} className="flex items-center gap-3">
                                                <input type="checkbox" checked={checked} onChange={() => {setCheckedIngredients(prev => checked ? prev.filter(x => x !== item) : [...prev, item,])}}/>

                                                <span className={` break-words ${checked ? "line-through opacity-50" : ""}`}>

                                                    {item}

                                                </span>

                                            </li>
                                        )
                            }
                        )}
                    </ul>
                </div>

                {/* Shopping list */}
                {missingIngredients.length > 0 && (
                    <div className={`mb-6 p-4 rounded-2xl ${darkMode ? "bg-black"
                                                                     : "bg-yellow-50"}`}>

                        <h3 className="text-lg md:text-xl font-semibold mb-3">
                            🛒 {t.shoppingList}
                        </h3>

                        <ul className="space-y-2">
                            {missingIngredients.map((item, i) =>
                                (<li key={i}>

                                    • {item}

                                </li>
                                )
                            )}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-2 mt-4">

                            <button onClick={() => {navigator.clipboard.writeText(shoppingListText)}}
                                    className="px-4 py-2 rounded-xl bg-yellow-500 text-black text-sm font-medium transition duration-150 hover:brightness-95 active:brightness-75 active:scale-95">

                                {t.copy}

                            </button>

                            <button onClick={() => {navigator.share?.({title: "Shopping list", text: shoppingListText,})}} className="px-4 py-2 rounded-xl bg-zinc-700 text-white text-sm font-medium">

                                {t.exportToNotes}

                            </button>

                        </div>

                    </div>
                )}

                {/* Nutrition */}
                <div className="mb-6">

                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                        {t.nutrition}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words ${darkMode ? "bg-black"
                                                                                     : "bg-zinc-100"}`}>

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
                            className={`p-3 md:p-4 rounded-xl break-words ${darkMode ? "bg-black" : "bg-zinc-100"}`}>

                            <p className="text-sm text-zinc-500">
                                {t.protein}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.protein} g
                            </p>

                        </div>

                        <div className={`p-3 md:p-4 rounded-xl break-words ${darkMode ? "bg-black" : "bg-zinc-100"}`}>

                            <p className="text-sm text-zinc-500">
                                {t.fat}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.fat} g
                            </p>

                        </div>

                        <div className={`p-3 md:p-4 rounded-xl break-words 
                        ${darkMode ? "bg-black" 
                                   : "bg-zinc-100"}`}>

                            <p className="text-sm text-zinc-500">
                                {t.carbs}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.carbs} g
                            </p>

                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl break-words 
                            ${darkMode ? "bg-black"
                                         : "bg-zinc-100"}`}>

                            <p className="text-sm text-zinc-500">
                                {t.fiber}
                            </p>

                            <p className="font-bold">
                                ~{selectedRecipe.nutrition.fiber} g
                            </p>

                        </div>

                        <div className={`p-3 md:p-4 rounded-xl break-words 
                        ${darkMode ? "bg-black"
                                   : "bg-zinc-100"}`}>

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
                            <div key={i} className={`p-3 md:p-4 rounded-xl break-words 
                                ${darkMode ? "bg-black"
                                           : "bg-zinc-100"}`}>

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