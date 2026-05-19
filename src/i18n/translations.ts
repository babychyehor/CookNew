// translations.ts

export type Translation = {
    title: string
    subtitle: string
    searchPlaceholder: string
    generate: string
    generating: string
    ingredients: string
    instructions: string
    step: string
    sideBarHead: string
    nutrition: string
    calories: string
    protein: string
    fat: string
    carbs: string
    fiber: string
    salt: string
}

export const translations: Record<string, Translation> = {
    en: {
        title: "Cook Something New",

        subtitle:
            "AI recipe generator powered by Mistral",

        searchPlaceholder:
            "Enter dish name...",

        generate: "Generate recipes",

        generating:
            "Generating recipes...",

        ingredients: "Ingredients",

        instructions: "Сooking",

        step: "Step",

        sideBarHead: "AI Cook",

        nutrition: "Nutrition",

        calories: "Total calories",

        protein: "Protein",

        fat: "Fat",

        carbs: "Carbs",

        fiber: "Fiber",

        salt: "Salt",
    },

    ua: {
        title: "Приготуй щось нове",

        subtitle:
            "ШI генератор рецептів на базі Mistral",

        searchPlaceholder:
            "Введіть назву страви...",

        generate:
            "Згенерувати рецепти",

        generating:
            "Генерація рецептів...",

        ingredients: "Інгредієнти",

        instructions: "Приготування",

        step: "Крок",

        sideBarHead: "ШІ Кухар",

        nutrition: "Харчова цінність",

        calories: "Загально калорій",

        protein: "Білки",

        fat: "Жири",

        carbs: "Вуглеводи",

        fiber: "Клітковина",

        salt: "Сіль",
    },

    cz: {
        title: "Uvař něco nového",

        subtitle:
            "UI generátor receptů pomocí Mistral",

        searchPlaceholder:
            "Zadejte název jídla...",

        generate:
            "Generovat recepty",

        generating:
            "Generování receptů...",

        ingredients: "Ingredience",

        instructions: "Příprava",

        step: "Krok",

        sideBarHead: "UI Kuchař",

        nutrition: "Nutriční hodnoty",

        calories: "Celkový počet kalorií",

        protein: "Bílkoviny",

        fat: "Tuky",

        carbs: "Sacharidy",

        fiber: "Vláknina",

        salt: "Sůl",
    },
}

export const aiLanguages: Record<Language, string> = {
    en: "English",
    ua: "Ukrainian",
    cz: "Czech",
}

export type Language =
    keyof typeof translations