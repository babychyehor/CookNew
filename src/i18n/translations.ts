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
    },
}

export const aiLanguages: Record<Language, string> = {
    en: "English",
    ua: "Ukrainian",
    cz: "Czech",
}

export type Language =
    keyof typeof translations