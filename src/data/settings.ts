export interface AppSettings {
    darkMode: boolean;
    showPhysicsWarnings: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
    darkMode: false,
    showPhysicsWarnings: false,
};

export type SettingsUpdate = Partial<AppSettings>;