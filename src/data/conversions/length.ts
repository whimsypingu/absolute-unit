import type { CategoryData } from "../constants.ts";

export const length: CategoryData = {
    label: 'Length',
    initialUnits: {
        from: 'meter', 
        to: 'foot'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                meter: { 
                    label: 'Meters', 
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                kilometer: {
                    label: 'Kilometers',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000'
                },
            }
        },
        {
            label: 'Imperial',
            units: {
                inche: { 
                    label: 'Inches',
                    toBase: 'x * 0.0254',
                    fromBase: 'x * 3.28084 * 12'
                },
                foot: {
                    label: 'Feet', 
                    toBase: 'x * 0.3048',
                    fromBase: 'x * 3.28084'
                },
                yard: {
                    label: 'Yards',
                    toBase: 'x * 0.9144',
                    fromBase: 'x / 0.9144'
                },
                mile: {
                    label: 'Miles',
                    toBase: 'x * 1609.34',
                    fromBase: 'x / 1609.34'
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                hand: {
                    label: 'Hands',
                    toBase: 'x * 4 * 0.0254',
                    fromBase: 'x / (4 * 0.0254)'
                },
                footballField: {
                    label: 'Football Fields',
                    toBase: 'x * 100 * 0.9144',
                    fromBase: 'x / 91.44'
                },
                lunarDistance: {
                    label: 'Lunar Distances',
                    toBase: 'x * 384400 * 1000',
                    fromBase: 'x / (384400 * 1000)'
                }
            }
        }
    ]
}