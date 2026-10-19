import { createContext, useContext } from "react";
export const DataContext = createContext(null);
export function useIntelligenceData() { const value = useContext(DataContext); if (!value)
    throw new Error("Missing intelligence provider"); return value; }
