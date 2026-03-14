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
                    desc: 'A second is the standard International System of Units (SI) base unit of time. It is defined as the duration of 9,192,631,770 periods of electromagnetic energy emitted or absorbed by a cesium-133 atom during a slight transition of its state. What the heck',
                    lastCheck: '3/9/2026',
                }
            }
        },
        {
            label: 'Standard',
            units: {
                minute: {
                    singular: 'Minute',
                    plural: 'Minutes',
                    toBase: 'x * 60',
                    fromBase: 'x / 60',
                    abbr: 'min',
                },
                hour: {
                    singular: 'Hour',
                    plural: 'Hours',
                    toBase: 'x * 60 * 60',
                    fromBase: 'x / (60 * 60)',
                    abbr: 'hr',
                },
                day: {
                    singular: 'Day',
                    plural: 'Days',
                    toBase: 'x * 24 * 60 * 60',
                    fromBase: 'x / (24 * 60 * 60)',
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
                jiffy: {
                    singular: 'Jiffy',
                    plural: 'Jiffies',
                    toBase: 'x * 0.01',
                    fromBase: 'x * 100',
                },
                dogYear: {
                    singular: 'Dog Year',
                    plural: 'Dog Years',
                    toBase: 'x * (365.25 * 24 * 60 * 60) / 7',
                    fromBase: 'x * 7 / (365.25 * 24 * 60 * 60)',
                }
            }
        },
        {
            label: 'Medieval Units',
            units: {
                moment: {
                    singular: 'Moment',
                    plural: 'Moments',
                    toBase: 'x * 90',
                    fromBase: 'x / 90',
                }
            }
        }
    ]
};