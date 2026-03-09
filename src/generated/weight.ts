import type { CategoryData } from "../data/constants.ts";

export const weight: CategoryData = {
    label: 'Weight',
    initialUnits: {
        from: 'kilogram', 
        to: 'pound'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                gram: {
                    singular: 'Gram',
                    plural: 'Grams',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000',
                    abbr: 'g',
                },
                kilogram: {
                    singular: 'Kilogram',
                    plural: 'Kilograms',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'kg',
                },
                tonne: {
                    singular: 'Tonne',
                    plural: 'Tonnes',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                    abbr: 't',
                }
            }
        },
        {
            label: 'Imperial',
            units: {
                ounce: {
                    singular: 'Ounce',
                    plural: 'Ounces',
                    toBase: 'x * 0.0625 * 0.453592',
                    fromBase: 'x * 2.20462 * 16',
                    abbr: 'oz',
                },
                pound: {
                    singular: 'Pound',
                    plural: 'Pounds',
                    toBase: 'x * 0.453592',
                    fromBase: 'x * 2.20462',
                    abbr: 'lb',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                bagCement: {
                    singular: 'Bag of Cement',
                    plural: 'Bags of Cement',
                    toBase: 'x * 43',
                    fromBase: 'x / 43',
                },
                slug: {
                    singular: 'Slug',
                    plural: 'Slugs',
                    toBase: 'x * 14.5939',
                    fromBase: 'x / 14.5939',
                }
            }
        },
        {
            label: 'Absolute Units',
            units: {
                daniel: {
                    singular: 'Daniel',
                    plural: 'Daniels',
                    toBase: '((2.71 ^ (x * 10)) - (2.71 ^ (-1 * x * 10))) * 0.5',
                    fromBase: '2.71 @ (x + ((x ^ 0.5) + 1)) / 10',
                }
            }
        }
    ]
};