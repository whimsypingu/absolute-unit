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
                meter: {
                    singular: 'Meter',
                    plural: 'Meters',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'm',
                    desc: 'A meter is the standard International System of Units (SI) base unit of length. It is defined as the distance light travels in a vacuum in 1/299,792,458 of a second for some reason.',
                    lastCheck: '3/9/2026',
                },
                kilometer: {
                    singular: 'Kilometer',
                    plural: 'Kilometers',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                    abbr: 'km',
                }
            }
        },
        {
            label: 'Imperial',
            units: {
                inch: {
                    singular: 'Inch',
                    plural: 'Inches',
                    toBase: 'x * 0.0254',
                    fromBase: 'x * 39.3701',
                    abbr: 'in',
                },
                foot: {
                    singular: 'Foot',
                    plural: 'Feet',
                    toBase: 'x * 0.3048',
                    fromBase: 'x / 0.3048',
                    abbr: 'ft',
                },
                yard: {
                    singular: 'Yard',
                    plural: 'Yards',
                    toBase: 'x * 0.9144',
                    fromBase: 'x / 0.9144',
                    abbr: 'yd',
                },
                mile: {
                    singular: 'Mile',
                    plural: 'Miles',
                    toBase: 'x * 1609.34',
                    fromBase: 'x / 1609.34',
                    abbr: 'mi',
                }
            }
        },
        {
            label: 'Standard Giraffe Units',
            units: {
                corgi: {
                    singular: 'Corgi',
                    plural: 'Corgis',
                    toBase: 'x * 0.3',
                    fromBase: 'x / 0.3',
                    customImg: true,
                },
                giraffe: {
                    singular: 'Giraffe',
                    plural: 'Giraffes',
                    toBase: 'x * 5.5',
                    fromBase: 'x / 5.5',
                    abbr: 'SGU',
                    customImg: true,
                    desc: 'The standardized giraffe unit was proposed by the European Space Agency\'s Near-Earth Object Coordination Centre as a standardized unit for animal size reference, based on journalist records.',
                    source: 'https://neo.ssa.esa.int/documents/d/guest/newsletter-april-2024',
                    lastCheck: '3/9/2026',
                },
                africanElephant: {
                    singular: 'African Elephant',
                    plural: 'African Elephants',
                    toBase: 'x * 6.99',
                    fromBase: 'x / 6.99',
                    customImg: true,
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                hand: {
                    singular: 'Hand',
                    plural: 'Hands',
                    toBase: 'x * 4 * 0.0254',
                    fromBase: 'x / (4 * 0.0254)',
                    customImg: true,
                },
                footballField: {
                    singular: 'Football Field',
                    plural: 'Football Fields',
                    toBase: 'x * 100 * 0.9144',
                    fromBase: 'x / 91.44',
                    customImg: true,
                    desc: 'An American football field is 100 yards long (not including the endzones).',
                    lastCheck: '3/9/2026',
                },
                greatWallOfChina: {
                    singular: 'The Great Wall of China',
                    plural: 'Great Walls of China',
                    toBase: 'x * 21196.18 * 1000',
                    fromBase: 'x / (21196.18 * 1000)',
                    customImg: true,
                    desc: 'A series of fortifications in China, The Great Wall of China was used as protection against invasions from the north. It is the world\'s largest military structure.',
                    source: 'https://whc.unesco.org/en/list/438/',
                    lastCheck: '3/9/2026',
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