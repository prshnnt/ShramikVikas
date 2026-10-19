import { useEffect, useRef, useState } from "react";
import { api, decodeHealth } from "../services/api";
export function useApiHealth() {
    const [state, setState] = useState({ status: "idle" });
    const pending = useRef(null);
    useEffect(() => () => { pending.current?.abort(); pending.current = null; }, []);
    async function check() {
        pending.current?.abort();
        const controller = new AbortController();
        pending.current = controller;
        setState({ status: "loading" });
        const timeout = window.setTimeout(() => controller.abort(), 8000);
        try {
            const data = await api.get("/health", decodeHealth, controller.signal);
            if (pending.current === controller)
                setState({ status: "success", data });
        }
        catch {
            if (pending.current === controller)
                setState({ status: "error" });
        }
        finally {
            window.clearTimeout(timeout);
        }
    }
    return { state, check };
}
