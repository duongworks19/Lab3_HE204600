import { createContext, useContext, useState, useMemo, useCallback } from "react";

export const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

    const theme = useMemo(() => ({
        isDark,
        toggleTheme,
        styles: {
            app: {
                minHeight: "100vh",
                backgroundColor: isDark ? "#1e1e2e" : "#f5f5f5",
                color: isDark ? "#cdd6f4" : "#1e1e2e",
                padding: "24px",
                fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
                transition: "background-color 0.3s, color 0.3s",
            },
            button: {
                backgroundColor: isDark ? "#89b4fa" : "#1e66f5",
                color: isDark ? "#1e1e2e" : "#ffffff",
                border: "none",
                padding: "6px 14px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "6px",
            },
            input: {
                backgroundColor: isDark ? "#313244" : "#ffffff",
                color: isDark ? "#cdd6f4" : "#1e1e2e",
                border: isDark ? "1px solid #585b70" : "1px solid #ccc",
                padding: "4px 8px",
                borderRadius: "4px",
            },
            table: {
                borderCollapse: "collapse",
                width: "100%",
                backgroundColor: isDark ? "#181825" : "#ffffff",
                color: isDark ? "#cdd6f4" : "#1e1e2e",
            },
            th: {
                backgroundColor: isDark ? "#313244" : "#d0d0d0",
                padding: "8px",
                border: isDark ? "1px solid #585b70" : "1px solid #aaa",
            },
            td: {
                padding: "8px",
                border: isDark ? "1px solid #585b70" : "1px solid #aaa",
            },
        },
    }), [isDark, toggleTheme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function ThemeToggleButton() {
    const { isDark, toggleTheme, styles } = useTheme();

    return (
        <button style={styles.button} onClick={toggleTheme}>
            {isDark ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
