import { useSyncExternalStore, useMemo, useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext, LocaleContext } from "./preferenceContexts";
import { createAppTheme } from "../../theme";

export function ThemeProvider({ children }) {
    const store = (window.shramikvikasTheme || window.kaushaliqTheme);
    const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
    const localeCtx = useContext(LocaleContext);
    const locale = localeCtx?.locale || "en-IN";

    const muiTheme = useMemo(
        () => createAppTheme(snapshot.resolved, locale),
        [snapshot.resolved, locale]
    );

    return (
        <ThemeContext.Provider value={{ ...snapshot, setPreference: store.setPreference }}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
