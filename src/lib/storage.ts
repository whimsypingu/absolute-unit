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
            const parsed = JSON.parse(item) as T;

            //helper function to check if this is a dictionary type object
            const isObject = (val: any): val is Record<string, any> => typeof val === 'object';

            //merge missing fields from the new version into the old saved data
            if (isObject(parsed) && isObject(defaultValue)) {
                const merged = { ...defaultValue };

                Object.keys(defaultValue).forEach((key) => {
                    const k = key as keyof T;
                    if (parsed[k]) {
                        merged[k] = parsed[k];
                    }
                });

                return merged;
            }

            return parsed;

        } catch (err) {
            console.error(`Error parsing localStorage key [${key}]:`, err);
            return defaultValue;
        }
    }
};