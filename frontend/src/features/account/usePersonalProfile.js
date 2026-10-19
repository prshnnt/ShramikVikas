import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../app/providers/authContext';
import { accountRequest } from './api';
export function usePersonalProfile() {
    const { csrf } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(false);
    const reload = useCallback(async () => { const result = await accountRequest('/v1/me/profile', csrf); setProfile(result); setError(false); }, [csrf]);
    useEffect(() => { let active = true; accountRequest('/v1/me/profile', csrf).then(result => { if (active)
        setProfile(result); }).catch(() => { if (active)
        setError(true); }); return () => { active = false; }; }, [csrf]);
    return { profile, error, reload, csrf };
}
