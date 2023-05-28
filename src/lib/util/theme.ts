export function updateTheme(theme: string) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    window.localStorage.setItem('color-theme', theme);

    return theme;
}

export function getTheme() {
    
    const persistedColorPreference = window.localStorage.getItem('color-theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    if (hasPersistedPreference) {
        return persistedColorPreference;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
    }

    return 'light';
}

export function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    updateTheme(newTheme);
    return newTheme;
}