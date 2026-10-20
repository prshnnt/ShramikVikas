import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { PublicLayout } from "../../components/layout/PublicLayout";
import { NotFoundPage } from "../../pages/CapabilityPage";
import { HomePage } from "../../pages/HomePage";
import { ProductPage } from "../../pages/ProductPage";
import { HowItWorksPage } from "../../pages/HowItWorksPage";
import { PublicInfoPage } from "../../pages/PublicInfoPage";
import { useLocale } from "../../hooks/usePreferences";
import { AuthGuard } from "../providers/AuthProvider";
import { AuthPage } from "../../pages/AuthPage";
import { HelpPage } from "../../pages/AccountPages";
import { VerifyEmailPage } from "../../pages/VerifyEmailPage";

const PersonalProfilePage = lazy(() =>
  import("../../pages/PersonalProfilePage").then((module) => ({ default: module.PersonalProfilePage }))
);
const PersonalSettingsPage = lazy(() =>
  import("../../pages/PersonalSettingsPage").then((module) => ({ default: module.PersonalSettingsPage }))
);
const MyIntelligencePage = lazy(() =>
  import("../../pages/MyIntelligencePage").then((module) => ({ default: module.MyIntelligencePage }))
);
const OnboardingPage = lazy(() =>
  import("../../pages/OnboardingPage").then((module) => ({ default: module.OnboardingPage }))
);

const OverviewPage = lazy(() =>
  import("../../pages/OverviewPage").then((module) => ({ default: module.OverviewPage }))
);
const SkillsIntelligencePage = lazy(() =>
  import("../../pages/workspace/EntityIntelligencePages").then((module) => ({
    default: module.SkillsIntelligencePage,
  }))
);
const RegionsIntelligencePage = lazy(() =>
  import("../../pages/workspace/EntityIntelligencePages").then((module) => ({
    default: module.RegionsIntelligencePage,
  }))
);
const IndustriesIntelligencePage = lazy(() =>
  import("../../pages/workspace/EntityIntelligencePages").then((module) => ({
    default: module.IndustriesIntelligencePage,
  }))
);
const OccupationsIntelligencePage = lazy(() =>
  import("../../pages/workspace/EntityIntelligencePages").then((module) => ({
    default: module.OccupationsIntelligencePage,
  }))
);
const DemandIntelligencePage = lazy(() =>
  import("../../pages/workspace/DemandForecastReports").then((module) => ({
    default: module.DemandIntelligencePage,
  }))
);
const ForecastIntelligencePage = lazy(() =>
  import("../../pages/workspace/DemandForecastReports").then((module) => ({
    default: module.ForecastIntelligencePage,
  }))
);
const IntelligenceReportsPage = lazy(() =>
  import("../../pages/workspace/DemandForecastReports").then((module) => ({
    default: module.IntelligenceReportsPage,
  }))
);
const SupplyIntelligencePage = lazy(() =>
  import("../../features/supply/SupplyIntelligence").then((module) => ({
    default: module.SupplyIntelligence,
  }))
);
const GapIntelligencePage = lazy(() =>
  import("../../features/skill-gap/GapIntelligence").then((module) => ({
    default: module.GapIntelligence,
  }))
);
const EarlyWarningPage = lazy(() =>
  import("../../features/early-warning/EarlyWarningIntelligence").then((module) => ({
    default: module.EarlyWarningIntelligence,
  }))
);
const ScenarioPage = lazy(() =>
  import("../../features/scenarios/ScenarioIntelligence").then((module) => ({
    default: module.ScenarioIntelligence,
  }))
);
const SpatialIntelligencePage = lazy(() =>
  import("../../pages/workspace/SpatialIntelligencePage").then((module) => ({
    default: module.SpatialIntelligencePage,
  }))
);

const infoRoutes = ["about", "contact", "documentation", "privacy", "terms"];

export function AppRoutes() {
  const { t } = useLocale();

  const LoadingFallback = () => (
    <div className="route-loading" role="status" style={{ padding: '32px', textAlign: 'center' }}>
      {t("workspace.loading") || "Loading intelligence..."}
    </div>
  );

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        {infoRoutes.map((kind) => (
          <Route key={kind} path={`/${kind}`} element={<PublicInfoPage kind={kind} />} />
        ))}
      </Route>

      {/* Auth Pages */}
      <Route path="/auth/signin" element={<AuthPage />} />
      <Route path="/auth/signup" element={<AuthPage />} />
      <Route path="/auth/reset" element={<AuthPage />} />
      <Route path="/auth/verify" element={<VerifyEmailPage />} />

      {/* Workspace Pages */}
      <Route element={<AppShell />}>
        <Route path="/workspace" element={<Navigate to="/intelligence" replace />} />

        {/* Authenticated Account Pages */}
        <Route
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </Suspense>
            </AuthGuard>
          }
        >
          <Route path="/profile" element={<PersonalProfilePage />} />
          <Route path="/settings" element={<PersonalSettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/my-intelligence" element={<MyIntelligencePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* Intelligence Pages */}
        <Route
          path="/intelligence"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <OverviewPage />
            </Suspense>
          }
        />
        <Route
          path="/skills"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SkillsIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/regions"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <RegionsIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/occupations"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <OccupationsIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/industries"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <IndustriesIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/demand"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DemandIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/supply"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SupplyIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/skill-gaps"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <GapIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/early-warning"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <EarlyWarningPage />
            </Suspense>
          }
        />
        <Route
          path="/scenarios"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ScenarioPage />
            </Suspense>
          }
        />
        <Route
          path="/forecast"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ForecastIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/spatial"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SpatialIntelligencePage />
            </Suspense>
          }
        />
        <Route
          path="/reports"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <IntelligenceReportsPage />
            </Suspense>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
