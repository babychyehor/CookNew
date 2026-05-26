import type { Recipe } from "../types/recipe"

const FAVORITES_KEY = "favorite_dishes"

export function getFavorites(): Recipe[] {
    const data = localStorage.getItem(FAVORITES_KEY)

    if (!data) return []

    try {
        return JSON.parse(data)
    } catch {
        return []
    }
}

export function toggleFavorite(recipe: Recipe) {
    const favorites = getFavorites()

    const exists = favorites.some(
        item => item.title === recipe.title
    )

    const updated = exists
        ? favorites.filter(item => item.title !== recipe.title)
        : [...favorites, recipe]

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
    )

    return updated
}

export function isFavorite(title: string) {
    return getFavorites().some(
        item => item.title === title
    )
}