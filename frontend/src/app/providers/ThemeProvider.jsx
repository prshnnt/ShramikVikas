import { useSyncExternalStore } from "react";
import { ThemeContext } from "./preferenceContexts";
export function ThemeProvider({ children }) {
    const store = (window.shramikvikasTheme || window.kaushaliqTheme);
    const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return <ThemeContext.Provider value={{ ...snapshot, setPreference: store.setPreference }}>{children}</ThemeContext.Provider>;
}
