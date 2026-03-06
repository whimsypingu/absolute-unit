import type { CategoryData } from "../constants.ts";

export const weight: CategoryData = {
    label: 'Weight',
    unitGroups: [
        {
            label: "Conventional Units",
            units: {
                kilograms: { 
                    label: 'Kilograms', 
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                pounds: { 
                    label: 'Pounds', 
                    toBase: 'x * 0.453592',
                    fromBase: 'x * 2.20462'
                },
                ounces: { 
                    label: 'Ounces', 
                    toBase: 'x * 0.0625 * 0.453592',
                    fromBase: 'x * 2.20462 * 16'
                },
            }
        },
        {
            label: "Weird Units",
            units: {
                daniels: {
                    label: 'Daniels',
                    toBase: 'x * 100000',
                    fromBase: 'x / 100000'
                }
            }
        }
    ],
}
