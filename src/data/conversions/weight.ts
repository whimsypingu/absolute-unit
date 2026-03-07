import type { CategoryData } from "../constants.ts";

export const weight: CategoryData = {
    label: 'Weight',
    initialUnits: {
        from: 'kilogram', 
        to: 'pound'
    },
    unitGroups: [
        {
            label: "Metric",
            units: {
                kilogram: { 
                    label: 'Kilograms', 
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
            }
        },
        {
            label: 'Imperial',
            units: {
                pound: { 
                    label: 'Pounds', 
                    toBase: 'x * 0.453592',
                    fromBase: 'x * 2.20462'
                },
                ounce: { 
                    label: 'Ounces', 
                    toBase: 'x * 0.0625 * 0.453592',
                    fromBase: 'x * 2.20462 * 16'
                },
            }
        },
        {
            label: 'Informal Units',
            units: {
                bagCement: {
                    label: 'Bags of Cement',
                    toBase: 'x * 43',
                    fromBase: 'x / 43'
                }
            }
        },
        {
            label: "Absolute Units",
            units: {
                daniel: {
                    label: 'Daniels',
                    toBase: '1 / -0.00001 * (2.71 @ ((0.99 - x) / (x + 0.99)))',
                    fromBase: '(1.98 / (1 + (2.71 ^ (x * -0.00001)))) - 0.99'
                }
            }
        }
    ],
}
