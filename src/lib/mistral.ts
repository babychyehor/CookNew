import { Mistral } from "@mistralai/mistralai"

export const mistralClient = new Mistral({
    apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
})