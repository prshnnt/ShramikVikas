import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthDialog } from "../components/auth/AuthDialog";
import { ThemeProvider } from "./providers/ThemeProvider";
import { I18nProvider } from "./providers/I18nProvider";
import { AuthProvider } from "./providers/AuthProvider";

export default function App() {
    return (
        <I18nProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <AppRoutes />
                        <AuthDialog />
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </I18nProvider>
    );
}
