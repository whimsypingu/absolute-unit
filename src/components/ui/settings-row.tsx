import type { AppSettings } from "@/data/settings"
import { Switch } from "./switch";

interface SettingsRowProps {
    id: keyof AppSettings;
    label: string;
    description: string;
    checked: boolean;
    onToggle: (checked: boolean) => void;
}

export const SettingsRow = ({ id, label, description, checked, onToggle }: SettingsRowProps) => (
    <div 
        className="w-full flex items-center justify-between space-x-4"
        onClick={() => onToggle(!checked)}    
    >
        <div className="flex flex-col gap-1">
            <h3 
                className="text-md font-semibold"
            >
                {label}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>

        <Switch
            id={id}
            checked={checked}
        />
    </div>
);