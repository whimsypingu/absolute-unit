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
                gram: {
                    label: 'Grams',
                    abbr: 'g',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000',
                },
                kilogram: {
                    label: 'Kilograms', 
                    abbr: 'kg',
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                tonne: {
                    label: 'Tonnes',
                    abbr: 't',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                },
            }
        },
        {
            label: 'Imperial',
            units: {
                pound: {
                    label: 'Pounds', 
                    abbr: 'lb',
                    toBase: 'x * 0.453592',
                    fromBase: 'x * 2.20462'
                },
                ounce: { 
                    label: 'Ounces', 
                    abbr: 'oz',
                    toBase: 'x * 0.0625 * 0.453592',
                    fromBase: 'x * 2.20462 * 16'
                },
            }
        },
        {
            label: 'Informal Units',
            units: {
                slug: {
                    label: 'Slugs',
                    toBase: 'x * 14.5939',
                    fromBase: 'x / 14.5939'
                },
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
                    toBase: '((2.71 ^ (x * 10)) - (2.71 ^ (-1 * x * 10))) * 0.5',
                    fromBase: '2.71 @ (x + ((x ^ 0.5) + 1)) / 10'
                    //toBase: '1 / -0.00001 * (2.71 @ ((0.99 - x) / (x + 0.99)))',
                    //fromBase: '(1.98 / (1 + (2.71 ^ (x * -0.00001)))) - 0.99'
                }
            }
        }
    ],
}
