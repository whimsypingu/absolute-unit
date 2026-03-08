import type { CategoryData } from "../constants.ts";

export const volume: CategoryData = {
    label: 'Volume',
    initialUnits: {
        from: 'fluidOunce', 
        to: 'milliliter'
    },
    unitGroups: [
        {
            label: "Metric",
            units: {
                milliliter: {
                    label: 'Milliliters',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000'
                },
                liter: {
                    label: 'Liters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                cubicMeter: {
                    label: 'Cubic Meters',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001'
                },
            }
        },
        {
            label: 'US Customary',
            units: {
                fluidOunce: {
                    label: 'Fluid Ounces', 
                    toBase: 'x / 33.814',
                    fromBase: 'x * 33.814'
                },
                cup: { 
                    label: 'Cups', 
                    toBase: '(x / 33.814) * 8',
                    fromBase: '(x * 33.814) / 8'
                },
                pint: {
                    label: 'Pints',
                    toBase: '(x / 33.814) * 16',
                    fromBase: '(x * 33.814) / 16'
                },
                quart: {
                    label: 'Quarts',
                    toBase: '(x / 33.814) * 32',
                    fromBase: '(x * 33.814) / 32'
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                shot: {
                    label: 'Shots',
                    toBase: '(x * 0.001) * 40',
                    fromBase: '(x * 1000) / 40'
                },
                olympicSwimmingPool: {
                    label: 'Olympic Swimming Pools',
                    toBase: 'x * (2.5 * (10 ^ 6))',
                    fromBase: 'x / (2.5 * (10 ^ 6))'
                },
                grandCanyon: {
                    label: 'Grand Canyons',
                    toBase: '(x * 1000) * (4.17 * (10 ^ 12))',
                    fromBase: '(x * 0.001) * (4.17 * (10 ^ 12))',
                }
            }
        }
    ],
}
