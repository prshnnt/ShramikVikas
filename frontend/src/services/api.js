const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api";
export const api = {
    async get(path, decode, signal) {
        const response = await fetch(`${baseUrl}${path}`, { signal, headers: { Accept: "application/json" } });
        if (!response.ok)
            throw new Error(`API request failed (${response.status})`);
        const value = await response.json();
        return decode(value);
    },
    async post(path, body, decode, signal) {
        const response = await fetch(`${baseUrl}${path}`, { method: "POST", signal, headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!response.ok)
            throw new Error(`API request failed (${response.status})`);
        const value = await response.json();
        return decode(value);
    },
};
export function decodeHealth(value) {
    if (typeof value !== "object" || value === null || !("status" in value) || !("app" in value) || !("version" in value)
        || typeof value.status !== "string" || typeof value.app !== "string" || typeof value.version !== "string"
        || value.status !== "ok")
        throw new Error("Unexpected health response");
    return { status: value.status, app: value.app, version: value.version };
}
