import {useCallback, useEffect, useMemo, useState} from "react"
import { AnimatePresence } from "framer-motion"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"
import ThemeToggle from "./components/ThemeToggle"
import LanguageSwitcher from "./components/LanguageSwitcher"

import type { Recipe } from "./types/recipe"

import { mistralClient } from "./lib/mistral"

import { translations, aiLanguages, type Language } from "./i18n/translations"
import {getFavorites, toggleFavorite,} from "./utils/favorites"


function App() {
    const [darkMode, setDarkMode] = useState(true)
    const [language, setLanguage] = useState<Language>("en")
    const [dish, setDish] = useState("")
    const [loading, setLoading] = useState(false)

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const [selectedFromFavorites, setSelectedFromFavorites] = useState(false)

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [, setFavoritesVersion] = useState(0)

    const t = translations[language]
    const favoriteRecipes = getFavorites()
    useEffect(() => {const update = () => setFavoritesVersion(v => v + 1)
        window.addEventListener("favorites-updated", update)

        return () => window.removeEventListener("favorites-updated", update)

    }, [])
    const aiLanguage = aiLanguages[language]

    const handleSearch = useCallback(async () => {
        if (!dish.trim() || loading) return

        setLoading(true)

        try {const res = await mistralClient.chat.complete({
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

            const text = res.choices?.[0]?.message?.content

            if (!text || typeof text !== "string") return

            const cleaned = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()

            const parsed: Recipe[] = JSON.parse(cleaned)

            if (!Array.isArray(parsed)) return

            const safe = parsed.filter((r) => r?.title && r?.nutrition && typeof r.weight === "number")

            setSelectedFromFavorites(false)
            setRecipes(safe)
            setSelectedRecipe(safe[0] ?? null)
            setDish("")
            setSidebarOpen(false)

        } catch (e) {console.error("Recipe generation failed:", e)} finally {setLoading(false)}
    }, [dish, loading, aiLanguage])

    const appTheme = useMemo(() => (darkMode ? "bg-black text-white" : "bg-zinc-100 text-black"), [darkMode])

    return (<div className={`min-h-screen flex transition-colors duration-300 ${appTheme}`}>

            <div className="hidden md:block">
                <Sidebar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    t={t}
                    setSelectedRecipe={setSelectedRecipe}
                    setSelectedFromFavorites={setSelectedFromFavorites}
                    selectedRecipe={selectedRecipe}
                />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className={`absolute inset-0 ${darkMode ? "bg-black/60" 
                                                                : "bg-black/30"}`}
                         onClick={() => setSidebarOpen(false)}/>

                    <div className={`absolute right-0 top-0 h-full w-72 p-5 flex flex-col ${darkMode ? "bg-zinc-900 text-white" 
                                                                                                     : "bg-white text-black"}`}>
                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-bold">
                                {t.sideBarHead}
                            </h2>

                            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
                        </div>

                        <div className="mt-6 space-y-4">

                            <div className="w-full">
                                <LanguageSwitcher language={language} setLanguage={setLanguage}/>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold opacity-70 px-1 mb-3">
                                    {t.favorites}
                                </h3>

                                <div className="h-px w-full bg-zinc-700/40 mb-4" />

                                <div className="space-y-2">
                                    {favoriteRecipes.map(recipe => (<div key={recipe.title} className={`flex items-center justify-between p-2 rounded-xl text-sm border transition 
                                    ${selectedRecipe?.title === recipe.title ? "border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                                                                             : darkMode ? "bg-zinc-800 border-transparent"
                                                                                        : "bg-zinc-100 border-transparent"}`}>
                                            <button onClick={() =>
                                            {
                                                setSelectedRecipe(recipe)
                                                setSelectedFromFavorites(true)
                                                setSidebarOpen(false)
                                            }} className="flex-1 text-left break-words">

                                                {recipe.title}

                                            </button>

                                            <button onClick={() => {toggleFavorite(recipe); window.dispatchEvent(new Event("favorites-updated"))}} className="ml-2 text-xl">
                                                ⭐
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col">

                <div className={`w-full p-4 md:border-none md:p-0${darkMode ? "border-zinc-800" 
                                                                            : "border-zinc-300"}`}>

                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <Header t={t} darkMode={darkMode} />

                            <div className="flex items-center gap-3 pr-2 md:pr-6">

                                <div className="hidden md:block">
                                    <LanguageSwitcher language={language} setLanguage={setLanguage}/>
                                </div>

                                <button
                                    className="md:hidden p-3"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    ☰
                                </button>

                            </div>
                        </div>

                        <div className={`mt-3 h-0.5 w-full ${darkMode ? "bg-zinc-800" 
                                                                      : "bg-zinc-300"}`} />
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

                        {recipes.length > 0 && !selectedFromFavorites && (
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {recipes.map((recipe, i) => (
                                        <RecipeCard
                                            key={recipe.title}
                                            recipe={recipe}
                                            index={i}
                                            darkMode={darkMode}
                                            selected={selectedRecipe?.title === recipe.title}
                                            hasSelected={!!selectedRecipe}
                                            onClick={() => {
                                                setSelectedRecipe(recipe)
                                                setSelectedFromFavorites(false)
                                            }}
                                            t={t}

                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

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