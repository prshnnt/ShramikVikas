export function getAuthMode(value) {
    return value === "login" || value === "signup" || value === "reset" ? value : null;
}
export function authSearch(search, mode) {
    const params = new URLSearchParams(search);
    if (mode)
        params.set("auth", mode);
    else
        params.delete("auth");
    return params.size ? `?${params.toString()}` : "";
}
