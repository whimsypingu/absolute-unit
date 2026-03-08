import type { CategoryData } from "../data/constants.ts";

export const length: CategoryData = {
    label: 'Energy',
    initialUnits: {
        from: 'meter', 
        to: 'foot'
    },
    unitGroups: [
        {
            label: 'Imperial',
            units: {
                foot: {
                    singular: 'Foot',
                    plural: 'Feet',
                    toBase: 'x * 0.3048',
                    fromBase: 'x / 3.28084',
                },
                inch: {
                    singular: 'Inch',
                    plural: 'Inches',
                    toBase: 'x * 0.0254',
                    fromBase: 'x / 3.28084 * 12',
                }
            }
        },
        {
            label: 'Metric',
            units: {
                kilometer: {
                    singular: 'Kilometer',
                    plural: 'Kilometers',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                },
                meter: {
                    singular: 'Meter',
                    plural: 'Meters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                }
            }
        }
    ]
};