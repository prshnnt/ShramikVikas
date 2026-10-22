import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/public.css";
import "./styles/auth.css";
import "./styles/chrome.css";
import "./styles/footer.css";
import "simplebar-react/dist/simplebar.min.css";
import "./styles/phase231.css";
import App from "./app/App";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { RootErrorFallback } from "./components/ui/RootErrorFallback";

// Global listeners for unhandled asynchronous errors
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
});
window.addEventListener("error", (event) => {
  console.error("Global window error:", event.error || event.message);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={(props) => <RootErrorFallback {...props} />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
import "./styles/phase23.css";
import "./styles/phase24.css";
import "./styles/phase25.css";
import "./styles/visualization.css";
import './styles/personal.css';
import './styles/demand.css';
import './styles/supply.css';
import './styles/gaps.css';
import './styles/forecast.css';
import './styles/phase5.css';
