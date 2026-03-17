import type { CategoryData } from "../data/constants.ts";

export const temperature: CategoryData = {
    label: 'Temperature',
    initialUnits: {
        from: 'fahrenheit', 
        to: 'celsius'
    },
    unitGroups: [
        {
            label: 'Scales',
            units: {
                kelvin: {
                    singular: 'Kelvin',
                    plural: 'Kelvin',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'K',
                },
                celsius: {
                    singular: 'Celsius',
                    plural: 'Celsius',
                    toBase: 'x + 273.15',
                    fromBase: 'x - 273.15',
                    abbr: '°C',
                },
                fahrenheit: {
                    singular: 'Fahrenheit',
                    plural: 'Fahrenheit',
                    toBase: '((x - 32) * 5 / 9) + 273.15',
                    fromBase: '((x - 273.15) * 9 / 5) + 32',
                    abbr: '°F',
                }
            }
        }
    ]
};