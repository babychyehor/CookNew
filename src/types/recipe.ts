export type Recipe = {
    title: string
    ingredients: string[]
    allergens: string[]

    steps: string[]
    weight: number

    nutrition: {
        calories: number
        protein: number
        fat: number
        carbs: number
        fiber: number
        salt: number
    }
}