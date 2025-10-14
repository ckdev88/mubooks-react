// pre-setup for proper (but basic) i18n support, not in use yet
type LanguageCode = "en" | "nl" | "pt"

interface BaseTranslations {
    // specific types for specific keys can go here, e.g.: welcome: string
    // e.g. nr2: n:NestedTranslations;
    [additionalKey: string]: string | NestedTranslations // Allow any other string keys
}
interface NestedTranslations {
    [additionalKey: string]: string
}

type Translations = {
    [lang in LanguageCode]: BaseTranslations
}

// TODO current strings are in ./i18n/notifications.ts, apply them here
const translations: Translations = {
    en: {
        /** n = Notifications */
        n: {
            add_to_reading: "add to started",
            add_to_finished: "add to finished"
        },
        welcome: "Welcome",
        goodbye: "Goodbye",
        // Can add more keys
        hello: "Hello"
    },
    nl: {
        welcome: "Welkom",
        goodbye: "Doei"
    },
    pt: {
        welcome: "Bem vindo",
        goodbye: "Tchau"
    }
}

let currentLanguage: LanguageCode = "en"

export const setLanguage = (lang: LanguageCode): void => {
    currentLanguage = lang
}
// Enhanced t function that handles nested paths

function isTranslationObject(obj: unknown): obj is Record<string, string | NestedTranslations> {
    return typeof obj === "object" && obj !== null
}

export const t = (path: string): string => {
    const parts = path.split(".")
    let value: string | NestedTranslations | BaseTranslations = translations[currentLanguage]

    for (const part of parts) {
        if (!isTranslationObject(value)) break
        value = value[part]
    }

    return typeof value === "string" ? value : path
}

// Example usage:
// t('n.add_to_reading') => "add to started"
// t('welcome') => "Welcome"
// t('nonexistent.key') => "nonexistent.key"
