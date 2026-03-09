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
                milliliter: {
                    singular: 'Milliliter',
                    plural: 'Milliliters',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000',
                    abbr: 'mL',
                },
                liter: {
                    singular: 'Liter',
                    plural: 'Liters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'L',
                    desc: 'A liter is a metric unit of volume commonly used for liquids. It is equivalent to the volume of one kilogram of water at its maximum density, which is at 4 degrees Celsius.',
                    lastCheck: '3/9/2026',
                },
                cubicMeter: {
                    singular: 'Cubic Meter',
                    plural: 'Cubic Meters',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001',
                    abbr: 'm³',
                }
            }
        },
        {
            label: 'US Customary',
            units: {
                fluidOunce: {
                    singular: 'Fluid Ounce',
                    plural: 'Fluid Ounces',
                    toBase: 'x / 33.814',
                    fromBase: 'x * 33.814',
                    abbr: 'fl oz',
                    desc: 'Not to be confused with ounces, a fluid ounce is a measure of volume mostly used for liquids.',
                    lastCheck: '3/9/2026',
                },
                cup: {
                    singular: 'Cup',
                    plural: 'Cups',
                    toBase: '(x / 33.814) * 8',
                    fromBase: '(x * 33.814) / 8',
                    abbr: 'c',
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
                shot: {
                    singular: 'Shot',
                    plural: 'Shots',
                    toBase: '(x * 0.001) * 40',
                    fromBase: '(x * 1000) / 40',
                },
                olympicSwimmingPool: {
                    singular: 'Olympic Swimming Pool',
                    plural: 'Olympic Swimming Pools',
                    toBase: 'x * (2.5 * (10 ^ 6))',
                    fromBase: 'x / (2.5 * (10 ^ 6))',
                },
                grandCanyon: {
                    singular: 'Grand Canyon',
                    plural: 'Grand Canyons',
                    toBase: '(x * 1000) * (4.17 * (10 ^ 12))',
                    fromBase: '(x * 0.001) / (4.17 * (10 ^ 12))',
                    abbr: '',
                    desc: 'An iconic geologic landscape with rocks dating back to 1.8 billion years ago located in northern Arizona.',
                    source: 'https://www.nps.gov/grca/learn/management/statistics.htm',
                    lastCheck: '3/9/2026',
                }
            }
        }
    ]
};