export type Recipe = {
    title: string
    ingredients: string[]
    steps: string[]

    nutrition: {
        calories: number
        protein: number
        fat: number
        carbs: number
        fiber: number
        salt: number
    }

    weight: number
}