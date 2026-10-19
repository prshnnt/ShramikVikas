import { useLocale } from "../../hooks/usePreferences";
import { AlertCircle, Database } from "lucide-react";
import { SecondaryButton } from "./Buttons";
import { Skeleton } from './Skeleton';
import { Loader } from './Loader';
export function EmptyState({ title, description, icon: Icon = Database, action, compact = false }) {
    return <div className={`empty-state ${compact ? "empty-compact" : ""}`}>
    <span className="empty-icon"><Icon size={24} aria-hidden="true"/></span>
    <h3>{title}</h3><p>{description}</p>{action}
  </div>;
}
export function LoadingState({ label }) {
    const { t } = useLocale();
    return <div className="loading-state" role="status" aria-live="polite">
    <span className="progress-label"><Loader />{label ?? t("states.loading")}</span><Skeleton /><Skeleton className="skeleton-short"/>
  </div>;
}
export function ErrorState({ title, description, onRetry }) {
    const { t } = useLocale();
    return <div className="error-state" role="alert">
    <AlertCircle size={20} aria-hidden="true"/><div><h3>{title ?? t("states.error")}</h3><p>{description}</p>
      <SecondaryButton onClick={onRetry}>{t("states.retry")}</SecondaryButton></div>
  </div>;
}
