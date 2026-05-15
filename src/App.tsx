import { useCallback, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"
import LanguageSwitcher from "./components/LanguageSwitcher"

import type { Recipe } from "./types/recipe"

import { mistralClient } from "./lib/mistral"

import {
    translations,
    aiLanguages,
    type Language,
} from "./i18n/translations"

function App() {
    const [darkMode, setDarkMode] = useState(true)

    const [language, setLanguage] =
        useState<Language>("en")

    const [dish, setDish] = useState("")

    const [loading, setLoading] = useState(false)

    const [recipes, setRecipes] =
        useState<Recipe[]>([])

    const [selectedRecipe, setSelectedRecipe] =
        useState<Recipe | null>(null)

    const t = translations[language]

    const aiLanguage = aiLanguages[language]

    const handleSearch =
        useCallback(async () =>
            {
                if (!dish.trim() || loading) return

                setLoading(true)

                try
                {
                    const res =
                        await mistralClient.chat.complete(
                            {
                                model: "mistral-large-latest",

                                messages:
                                    [{
                                        role: "user",

                                        content: `
                                        Generate 3 recipes for ${dish}.

                                        IMPORTANT:
                                        - Write everything in ${aiLanguage}
                                        - Recipe titles must be in ${aiLanguage}
                                        - Ingredients must be in ${aiLanguage}
                                        - Steps must be in ${aiLanguage}

                                        Return ONLY raw JSON.
                                        Do not use markdown.

                                        [
                                          {
                                            "title": "Recipe name",
                                            "ingredients": ["ingredient"],
                                            "steps": ["step"]
                                          }
                                        ]
                                    `,
                                    }],
                            })

                    const text =
                        res.choices?.[0]?.message?.content

                    if (!text || typeof text !== "string")
                        return

                    const cleaned =
                        text
                            .replace(/```json/g, "")
                            .replace(/```/g, "")
                            .trim()

                    const parsed: Recipe[] =
                        JSON.parse(cleaned)

                    if (!Array.isArray(parsed))
                        return

                    setRecipes(parsed)

                    setSelectedRecipe(
                        parsed[0] ?? null
                    )
                }

                catch (e)
                {
                    console.error(
                        "Recipe generation failed:",
                        e
                    )
                }

                finally
                {
                    setLoading(false)
                }
            },

            [dish, loading, aiLanguage]
        )

    const appTheme =
        useMemo(() =>
                (
                    darkMode
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-black"
                ),

            [darkMode]
        )

    return (
        <div
            className=
                {
                    `h-screen flex overflow-hidden transition-colors duration-300 ${appTheme}`
                }
        >
            <Sidebar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                t={t}
            />

            <main className="flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                    <Header t={t} />

                    <div className="p-6">
                        <LanguageSwitcher
                            language={language}
                            setLanguage={setLanguage}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <SearchBar
                        dish={dish}
                        setDish={setDish}
                        handleSearch={handleSearch}
                        loading={loading}
                        darkMode={darkMode}
                        t={t}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {
                                    recipes.map((recipe, i) => (
                                        <RecipeCard
                                            key={recipe.title}
                                            recipe={recipe}
                                            index={i}
                                            darkMode={darkMode}
                                            selected=
                                                {
                                                    selectedRecipe?.title === recipe.title
                                                }
                                            onClick=
                                                {
                                                    () => setSelectedRecipe(recipe)
                                                }
                                            t={t}
                                        />
                                    ))
                                }
                            </AnimatePresence>
                        </div>

                        <RecipeDetails
                            selectedRecipe={selectedRecipe}
                            darkMode={darkMode}
                            t={t}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App