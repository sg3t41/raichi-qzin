"use client"

import React, { useState, createContext, type ReactNode } from "react";

interface FavoriteContextType {
    likedJobIds: string[];
    setLikedJobIds: (likedJobIds: string[]) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
    likedJobIds: [],
    setLikedJobIds: () => { },
});

interface FavoriteProviderProps {
    children: ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
    const [likedJobIds, setLikedJobIds] = useState<string[]>([]);

    return (
        <FavoriteContext.Provider value={{ likedJobIds, setLikedJobIds }}>
            {children}
        </FavoriteContext.Provider>
    );
};
