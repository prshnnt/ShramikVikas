import { en } from "./locales/en-IN";
import { hi } from "./locales/hi-IN";
import { shellEn, shellHi } from "./locales/shell";
import { regional } from "./locales/regional";

export const localeKey = "kaushaliq.locale.v1";
export const defaultLocale = "en-IN";

export const locales = {
    "en-IN": { nativeLabel: "English", lang: "en", direction: "ltr" },
    "hi-IN": { nativeLabel: "हिन्दी", lang: "hi", direction: "ltr" },
    "bn-IN": { nativeLabel: "বাংলা", lang: "bn", direction: "ltr" },
    "ta-IN": { nativeLabel: "தமிழ்", lang: "ta", direction: "ltr" },
    "te-IN": { nativeLabel: "తెలుగు", lang: "te", direction: "ltr" },
    "mr-IN": { nativeLabel: "मराठी", lang: "mr", direction: "ltr" },
    "gu-IN": { nativeLabel: "ગુજરાતી", lang: "gu", direction: "ltr" },
    "kn-IN": { nativeLabel: "ಕನ್ನಡ", lang: "kn", direction: "ltr" },
};

export function parseLocale(value) {
    return Object.prototype.hasOwnProperty.call(locales, value) ? value : defaultLocale;
}

// Keys missing in a language fall back to English (see message()).
const messages = {
    "en-IN": { ...en, ...shellEn },
    "hi-IN": { ...hi, ...shellHi },
    ...regional,
};

const LATIN_STACK = '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const FONT_STACKS = {
    "hi-IN": '"Noto Sans Devanagari", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "mr-IN": '"Noto Sans Devanagari", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "bn-IN": '"Noto Sans Bengali", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "ta-IN": '"Noto Sans Tamil", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "te-IN": '"Noto Sans Telugu", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "gu-IN": '"Noto Sans Gujarati", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "kn-IN": '"Noto Sans Kannada", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};
export function fontStackFor(locale) {
    return FONT_STACKS[locale] ?? LATIN_STACK;
}

export function message(locale, key, values = {}) {
    if (!key) return "";
    const activeMessages = messages[locale] || messages["en-IN"] || {};
    const fallbackMessages = messages["en-IN"] || {};
    const template = activeMessages[key] ?? fallbackMessages[key] ?? key;
    if (typeof template !== "string") {
        return String(template ?? key ?? "");
    }
    return template.replace(/\{(\w+)\}/g, (placeholder, name) => String(values?.[name] ?? placeholder));
}
