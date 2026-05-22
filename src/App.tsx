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

import { translations, aiLanguages, type Language } from "./i18n/translations"

function App() {
    const [darkMode, setDarkMode] = useState(true)
    const [language, setLanguage] = useState<Language>("en")
    const [dish, setDish] = useState("")
    const [loading, setLoading] = useState(false)

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] =
        useState<Recipe | null>(null)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const t = translations[language]
    const aiLanguage = aiLanguages[language]

    const handleSearch =
        useCallback(async () => {
            if (!dish.trim() || loading) return

            setLoading(true)

            try {
                const res =
                    await mistralClient.chat.complete({
                        model: "mistral-large-latest",

                        messages: [
                            {
                                role: "user",

                                content: `
                                            Generate 3 recipes for "${dish}" with full nutritional profile.
                                            
                                            IMPORTANT:
                                            - Write everything in ${aiLanguage}
                                            - Recipe titles must be in ${aiLanguage}
                                            - Ingredients must be in ${aiLanguage}
                                            - Steps must be in ${aiLanguage}
                                            
                                            - All values MUST be numbers only
                                            - Calories are total kcal for whole dish
                                            - Protein, fat, carbs, fiber, salt in grams
                                            - Weight MUST be total dish weight in grams
                                            
                                            CRITICAL RULES:
                                            - Return ONLY valid JSON
                                            - No markdown
                                            - No backticks
                                            - No extra text
                                            - Always return EXACTLY 3 recipes
                                            - NEVER omit fields
                                            
                                            OUTPUT:
                                            [
                                              {
                                                "title": "Recipe name",
                                                "ingredients": ["ingredient"],
                                                "steps": ["step"],
                                                "weight": 500,
                                                "nutrition": {
                                                    "calories": 600,
                                                    "protein": 30,
                                                    "fat": 20,
                                                    "carbs": 70,
                                                    "fiber": 5,
                                                    "salt": 2
                                                }
                                              }
                                            ]
                                `
                            }
                        ]
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

                const safe =
                    parsed.filter(
                        (r) =>
                            r?.title &&
                            r?.nutrition &&
                            typeof r.weight === "number"
                    )

                setRecipes(safe)
                setSelectedRecipe(safe[0] ?? null)

                setSidebarOpen(false)

            } catch (e) {
                console.error("Recipe generation failed:", e)
            } finally {
                setLoading(false)
            }
        }, [dish, loading, aiLanguage])

    const appTheme =
        useMemo(() =>
                darkMode
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-black"
            , [darkMode])

    return (
        <div
            className={`min-h-screen flex overflow-hidden transition-colors duration-300 ${appTheme}`}
        >
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    t={t}
                />
            </div>

            {/* Mobile Sidebar Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSidebarOpen(false)}
                    />

                    <div className="absolute left-0 top-0 h-full w-72 bg-zinc-900 p-4">
                        <Sidebar
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            t={t}
                        />

                        <div className="mt-4">
                            <LanguageSwitcher
                                language={language}
                                setLanguage={setLanguage}
                            />
                        </div>

                        <button
                            className="mt-4 text-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <Header t={t} />

                        <button
                            className="md:hidden p-3"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                    </div>

                    <div className="p-4 md:p-6 hidden md:block">
                        <LanguageSwitcher
                            language={language}
                            setLanguage={setLanguage}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-6">
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
                                {recipes.map((recipe, i) => (
                                    <RecipeCard
                                        key={recipe.title}
                                        recipe={recipe}
                                        index={i}
                                        darkMode={darkMode}
                                        selected={
                                            selectedRecipe?.title === recipe.title
                                        }
                                        onClick={() =>
                                            setSelectedRecipe(recipe)
                                        }
                                        t={t}
                                    />
                                ))}
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