import type { CategoryData } from "../data/constants.ts";

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
                kilometer: {
                    singular: 'Kilometer',
                    plural: 'Kilometers',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                    abbr: 'km',
                },
                meter: {
                    singular: 'Meter',
                    plural: 'Meters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'm',
                }
            }
        },
        {
            label: 'Imperial',
            units: {
                foot: {
                    singular: 'Foot',
                    plural: 'Feet',
                    toBase: 'x * 0.3048',
                    fromBase: 'x / 0.3048',
                    abbr: 'ft',
                },
                inch: {
                    singular: 'Inch',
                    plural: 'Inches',
                    toBase: 'x * 0.0254',
                    fromBase: 'x * 39.3701',
                    abbr: 'in',
                },
                mile: {
                    singular: 'Mile',
                    plural: 'Miles',
                    toBase: 'x * 1609.34',
                    fromBase: 'x / 1609.34',
                    abbr: 'mi',
                },
                yard: {
                    singular: 'Yard',
                    plural: 'Yards',
                    toBase: 'x * 0.9144',
                    fromBase: 'x / 0.9144',
                    abbr: 'yd',
                }
            }
        },
        {
            label: 'Standard Giraffe Units',
            units: {
                africanElephant: {
                    singular: 'African Elephant',
                    plural: 'African Elephants',
                    toBase: 'x * 6.99',
                    fromBase: 'x / 6.99',
                },
                corgi: {
                    singular: 'Corgi',
                    plural: 'Corgis',
                    toBase: 'x * 0.3',
                    fromBase: 'x / 0.3',
                },
                giraffe: {
                    singular: 'Giraffe',
                    plural: 'Giraffes',
                    toBase: 'x * 5.5',
                    fromBase: 'x / 5.5',
                    abbr: 'SGU',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                footballField: {
                    singular: 'Football Field',
                    plural: 'Football Fields',
                    toBase: 'x * 100 * 0.9144',
                    fromBase: 'x / 91.44',
                },
                greatWallOfChina: {
                    singular: 'Great Wall of China',
                    plural: 'Great Walls of China',
                    toBase: 'x * 21196.18 * 1000',
                    fromBase: 'x / (21196.18 * 1000)',
                },
                hand: {
                    singular: 'Hand',
                    plural: 'Hands',
                    toBase: 'x * 4 * 0.0254',
                    fromBase: 'x / (4 * 0.0254)',
                },
                lunarDistance: {
                    singular: 'Lunar Distance',
                    plural: 'Lunar Distances',
                    toBase: 'x * 384400 * 1000',
                    fromBase: 'x / (384400 * 1000)',
                    abbr: 'LD',
                }
            }
        }
    ]
};