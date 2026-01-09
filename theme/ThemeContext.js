import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "./themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            const saved = await AsyncStorage.getItem("theme");
            if (saved === "light") {
                setIsDark(false);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const next = !isDark;
        setIsDark(next);
        await AsyncStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: isDark ? darkTheme : lightTheme,
                isDark,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
