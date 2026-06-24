import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { mistralClient } from "../lib/mistral"

import type { Recipe } from "../types/recipe"
import { translations } from "../i18n/translations"
import React from "react"

type Props = {
    selectedRecipe: Recipe | null
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>
    darkMode: boolean
    t: typeof translations.en
}

function RecipeDetails({selectedRecipe, setSelectedRecipe, darkMode, t,}: Props)
    {
        const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
        const [replacingIngredient, setReplacingIngredient] = useState<string | null>(null)


        if (!selectedRecipe) {return null}
        const handleReplaceIngredient = async (
            ingredient: string
        ) => {
            if (!selectedRecipe) return

            setReplacingIngredient(ingredient)

            try {
                const res = await mistralClient.chat.complete({
                    model: "mistral-large-latest",
                    messages: [
                        {
                            role: "user",
                            content: `
                                    Replace ingredient "${ingredient}" in this recipe.
                                    
                                    Recipe:
                                    ${JSON.stringify(selectedRecipe)}
                                    
                                    Rules:
                                    - Keep recipe as similar as possible
                                    - Replace only this ingredient
                                    - Update ingredients
                                    - Update steps if needed
                                    - Update allergens
                                    - Update nutrition
                                    - Return ONLY valid JSON
`
                        }
                    ]
                })

                const text =
                    res.choices?.[0]?.message?.content

                if (!text || typeof text !== "string")
                    return

                const cleaned = text
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim()

                try {const updatedRecipe = JSON.parse(cleaned)

                    if (updatedRecipe?.title) {
                        setSelectedRecipe(updatedRecipe)
                    }
                } catch (e) {
                    console.error("Invalid JSON:", e)
                }

            } catch (e) {
                console.error(e)

                alert("Mistral API limit exceeded. Try again later.")
            } finally {
                setReplacingIngredient(null)
            }
        }

        const safeWeight = selectedRecipe.weight || 300

        const kcalPer100g = Math.round((selectedRecipe.nutrition.calories / safeWeight) * 100)

        const missingIngredients = selectedRecipe.ingredients.filter(item => !checkedIngredients.includes(item))

        const shoppingListText = missingIngredients
                .map(item => `• ${item}`)
                .join("\n")
        const canShare = typeof navigator !== "undefined" && !!navigator.share

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
                    }`}>

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
                                (item, i) =>
                                {
                                    const checked = checkedIngredients.includes(item)

                                    return (
                                                <li key={i} className="flex items-center gap-3">
                                                    <input type="checkbox" checked={checked} onChange={() => {setCheckedIngredients(prev => checked ? prev.filter(x => x !== item) : [...prev, item,])}}/>

                                                    <div className="flex items-center gap-2 flex-1">
                                                                <span
                                                                    className={`flex-1 break-words ${
                                                                        checked
                                                                            ? "line-through opacity-50"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {item}
                                                                </span>

                                                        <button
                                                            onClick={() =>
                                                                handleReplaceIngredient(item)
                                                            }
                                                            disabled={!!replacingIngredient}
                                                            className={`px-2 py-1 rounded-lg text-xs text-black
${
                                                                replacingIngredient
                                                                    ? "bg-yellow-300 cursor-not-allowed"
                                                                    : "bg-yellow-500"
                                                            }`}
                                                        >
                                                            {replacingIngredient === item
                                                                ? "..."
                                                                : "↻"}
                                                        </button>
                                                    </div>

                                                </li>
                                            )
                                }
                            )}
                        </ul>
                    </div>

                    {/* Allergens */}
                    {selectedRecipe.allergens?.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-3">
                                ⚠️ {t.allergens}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {selectedRecipe.allergens.map((allergen, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            darkMode
                                                ? "bg-red-900 text-red-100"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      {allergen}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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

                                {canShare && (<button onClick={() => {navigator.share({title: "Shopping list", text: shoppingListText})}}
                                            className="px-4 py-2 rounded-xl bg-zinc-700 text-white text-sm font-medium transition duration-150 hover:brightness-95 active:brightness-75 active:scale-95">

                                                {t.exportToNotes}

                                             </button>)}

                            </div>

                        </div>
                    )}

                    {/* Nutrition */}
                    <div className="mb-6">

                        <h3 className="text-lg md:text-xl font-semibold mb-3">
                            {t.nutrition}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div className={`p-3 md:p-4 rounded-xl break-words ${darkMode ? "bg-black" : "bg-zinc-100"}`}>

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

                            <div className={`p-3 md:p-4 rounded-xl break-words${darkMode ? "bg-black" : "bg-zinc-100"}`}>

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