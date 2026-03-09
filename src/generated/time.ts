import type { CategoryData } from "../data/constants.ts";

export const time: CategoryData = {
    label: 'Time',
    initialUnits: {
        from: 'second', 
        to: 'hour'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                moment: {
                    singular: 'Moment',
                    plural: 'Moments',
                    toBase: 'x * 90',
                    fromBase: 'x / 90',
                }
            }
        },
        {
            label: 'Standard',
            units: {
                day: {
                    singular: 'Day',
                    plural: 'Days',
                    toBase: 'x * 24 * 60 * 60',
                    fromBase: 'x / (24 * 60 * 60)',
                },
                hour: {
                    singular: 'Hour',
                    plural: 'Hours',
                    toBase: 'x * 60 * 60',
                    fromBase: 'x / (60 * 60)',
                    abbr: 'hr',
                },
                minute: {
                    singular: 'Minute',
                    plural: 'Minutes',
                    toBase: 'x * 60',
                    fromBase: 'x / 60',
                    abbr: 'min',
                },
                year: {
                    singular: 'Year',
                    plural: 'Years',
                    toBase: 'x * 365.25 * 24 * 60 * 60',
                    fromBase: 'x / (365.25 * 24 * 60 * 60)',
                    abbr: 'a',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                dogYear: {
                    singular: 'Dog Year',
                    plural: 'Dog Years',
                    toBase: 'x * (365.25 * 24 * 60 * 60) / 7',
                    fromBase: 'x * 7 / (365.25 * 24 * 60 * 60)',
                },
                jiffy: {
                    singular: 'Jiffy',
                    plural: 'Jiffies',
                    toBase: 'x * 0.01',
                    fromBase: 'x * 100',
                }
            }
        },
        {
            label: 'Medieval Units',
            units: {
                millisecond: {
                    singular: 'Millisecond',
                    plural: 'Milliseconds',
                    toBase: 'x / 1000',
                    fromBase: 'x * 1000',
                    abbr: 'ms',
                },
                second: {
                    singular: 'Second',
                    plural: 'Seconds',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 's',
                }
            }
        }
    ]
};