import { en } from "./locales/en-IN";
import { hi } from "./locales/hi-IN";
export const localeKey = "kaushaliq.locale.v1";
export const locales = {
    "en-IN": { nativeLabel: "English", lang: "en", direction: "ltr" },
    "hi-IN": { nativeLabel: "हिन्दी", lang: "hi", direction: "ltr" },
};
export function parseLocale(value) { return value === "hi-IN" ? "hi-IN" : "en-IN"; }
const messages = { "en-IN": en, "hi-IN": hi };
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
