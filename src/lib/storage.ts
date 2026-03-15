export const storage = {
    save: <T>(key: string, data: T): void => {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (err) {
            console.error(`Error saving to localStorage [${key}]:`, err);
        }
    },

    load: <T>(key: string, defaultValue: T): T => {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;

        try {
            return JSON.parse(item) as T;
        } catch (err) {
            console.error(`Error parsing localStorage key [${key}]:`, err);
            return defaultValue;
        }
    }
};