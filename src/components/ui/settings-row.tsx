import type { AppSettings } from "@/data/settings"
import { Label } from "./label";
import { Switch } from "./switch";

interface SettingsRowProps {
    id: keyof AppSettings;
    label: string;
    description: string;
    checked: boolean;
    onToggle: (checekd: boolean) => void;
}

export const SettingsRow = ({ id, label, description, checked, onToggle }: SettingsRowProps) => (
    <div className="flex items-center space-x-4">
        <div>
            <Label htmlFor={id}>
                {label}
            </Label>

            <p>
                {description}
            </p>
        </div>

        <Switch
            id={id}
            checked={checked}
            onCheckedChange={onToggle}
        />
    </div>
);