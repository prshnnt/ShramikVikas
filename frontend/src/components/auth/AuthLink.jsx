import { Link, useLocation } from "react-router-dom";
import { authSearch } from "./authNavigation";
export function AuthLink({ mode, children, className = "", onClick }) {
    const location = useLocation();
    return <Link to={{ pathname: location.pathname, search: authSearch(location.search, mode), hash: location.hash }} state={{ authOverlay: true }} className={className} onClick={onClick} aria-haspopup="dialog">{children}</Link>;
}
