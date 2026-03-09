import type { CategoryData } from "../data/constants.ts";

export const volume: CategoryData = {
    label: 'Volume',
    initialUnits: {
        from: 'fluidOunce', 
        to: 'milliliter'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                cubicMeter: {
                    singular: 'Cubic Meter',
                    plural: 'Cubic Meters',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001',
                    abbr: 'm³',
                },
                liter: {
                    singular: 'Liter',
                    plural: 'Liters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'L',
                },
                milliliter: {
                    singular: 'Milliliter',
                    plural: 'Milliliters',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000',
                    abbr: 'mL',
                }
            }
        },
        {
            label: 'US Customary',
            units: {
                cup: {
                    singular: 'Cup',
                    plural: 'Cups',
                    toBase: '(x / 33.814) * 8',
                    fromBase: '(x * 33.814) / 8',
                    abbr: 'c',
                },
                fluidOunce: {
                    singular: 'Fluid Ounce',
                    plural: 'Fluid Ounces',
                    toBase: 'x / 33.814',
                    fromBase: 'x * 33.814',
                    abbr: 'fl oz',
                },
                pint: {
                    singular: 'Pint',
                    plural: 'Pints',
                    toBase: '(x / 33.814) * 16',
                    fromBase: '(x * 33.814) / 16',
                    abbr: 'pt',
                },
                quart: {
                    singular: 'Quart',
                    plural: 'Quarts',
                    toBase: '(x / 33.814) * 32',
                    fromBase: '(x * 33.814) / 32',
                    abbr: 'qt',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                grandCanyon: {
                    singular: 'Grand Canyon',
                    plural: 'Grand Canyons',
                    toBase: '(x * 1000) * (4.17 * (10 ^ 12))',
                    fromBase: '(x * 0.001) / (4.17 * (10 ^ 12))',
                    abbr: '',
                },
                olympicSwimmingPool: {
                    singular: 'Olympic Swimming Pool',
                    plural: 'Olympic Swimming Pools',
                    toBase: 'x * (2.5 * (10 ^ 6))',
                    fromBase: 'x / (2.5 * (10 ^ 6))',
                },
                shot: {
                    singular: 'Shot',
                    plural: 'Shots',
                    toBase: '(x * 0.001) * 40',
                    fromBase: '(x * 1000) / 40',
                }
            }
        }
    ]
};