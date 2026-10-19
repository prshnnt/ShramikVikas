import { useLocale } from "../../hooks/usePreferences";
import { Link } from "react-router-dom";
import navLogo from "../../assets/logo_main.png";
import websiteLogo from "../../assets/logo.png";

export function Brand({ full = false }) {
    const { t } = useLocale();
    const activeLogo = full ? websiteLogo : navLogo;
    return <Link to="/" className={`brand asset-brand ${full ? "asset-brand-full" : ""}`} aria-label={t("common.home")}>
    <picture>
      <source media="(max-width: 1199px)" srcSet={activeLogo}/>
      <img src={activeLogo} alt="Shramik Vikas" className="brand-image"/>
    </picture>
  </Link>;
}
