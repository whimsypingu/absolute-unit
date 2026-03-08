import type { CategoryData } from "../../constants.ts";

export const time: CategoryData = {
    label: 'Time',
    initialUnits: {
        from: 'second', 
        to: 'hour'
    },
    unitGroups: [
        {
            label: "Metric",
            units: {
                second: {
                    label: 'Seconds',
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                millisecond: {
                    label: 'Milliseconds',
                    toBase: 'x / 1000',
                    fromBase: 'x * 1000',
                }
            }
        },
        {
            label: 'Standard',
            units: {
                minute: { 
                    label: 'Minutes', 
                    toBase: 'x * 60',
                    fromBase: 'x / 60'
                },
                hour: { 
                    label: 'Hours', 
                    toBase: 'x * 60 * 60',
                    fromBase: 'x / (60 * 60)'
                },
                day: {
                    label: 'Days',
                    toBase: 'x * 24 * 60 * 60',
                    fromBase: 'x / (24 * 60 * 60)'
                },
                year: {
                    label: 'Years',
                    toBase: 'x * 365.25 * 24 * 60 * 60',
                    fromBase: 'x / (365.25 * 24 * 60 * 60)',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                jiffy: {
                    label: 'Jiffies',
                    toBase: 'x * 0.01',
                    fromBase: 'x * 100'
                },
                dogYear: {
                    label: 'Dog Years',
                    toBase: 'x * (365.25 * 24 * 60 * 60) / 7',
                    fromBase: 'x * 7 / (365.25 * 24 * 60 * 60)'
                }
            }
        },
        {
            label: 'Medieval Units',
            units: {
                moment: {
                    label: 'Moments',
                    toBase: 'x * 90',
                    fromBase: 'x / 90'
                }
            }
        }
    ],
}
