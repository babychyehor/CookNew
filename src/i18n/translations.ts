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
    favorites: string

    ingredientHint: string
    shoppingList: string
    copy: string
    exportToNotes: string
    allergens: string
    replaceIngredient: string
    dietNormal: string
    dietVegan: string
    dietGlutenFree: string
    dietLactoseFree: string

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

        instructions: "Cooking",

        step: "Step",

        sideBarHead: "AI Cook",

        nutrition: "Nutrition",

        calories: "Total calories",

        protein: "Protein",

        fat: "Fat",

        carbs: "Carbs",

        fiber: "Fiber",

        salt: "Salt",

        favorites: "Favorites",

        ingredientHint:
            "✓ Mark ingredients you already have",

        shoppingList:
            "Shopping list",

        copy: "Copy",

        exportToNotes: "Export to Notes",

        allergens: "Allergens",

        replaceIngredient: "Replace ingredient",

        dietNormal: "Normal",

        dietVegan: "Vegan",

        dietGlutenFree: "Gluten Free",

        dietLactoseFree: "Lactose Free",
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

        favorites: "Улюблене",

        ingredientHint:
            "✓ Познач інгредієнти, які вже є вдома",

        shoppingList:
            "Список покупок",

        copy: "Скопіювати",

        exportToNotes: "Експортувати в нотатки",

        allergens: "Алергени",

        replaceIngredient: "Замінити інгредієнт",

        dietNormal: "Звичайна",

        dietVegan: "Веганська",

        dietGlutenFree: "Без глютену",

        dietLactoseFree: "Без лактози",
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

        calories:
            "Celkový počet kalorií",

        protein: "Bílkoviny",

        fat: "Tuky",

        carbs: "Sacharidy",

        fiber: "Vláknina",

        salt: "Sůl",

        favorites: "Oblíbené",

        ingredientHint:
            "✓ Označ ingredience, které už máš doma",

        shoppingList:
            "Nákupní seznam",

        copy: "Kopírovat",

        exportToNotes: "Exportovat do Poznámek",

        allergens: "Alergeny",

        replaceIngredient: "Nahradit ingredienci",

        dietNormal: "Normální",

        dietVegan: "Veganská",

        dietGlutenFree: "Bez lepku",

        dietLactoseFree: "Bez laktózy",
    },
}

export const aiLanguages: Record<
    Language,
    string
> = {
    en: "English",
    ua: "Ukrainian",
    cz: "Czech",
}

export type Language =
    keyof typeof translations