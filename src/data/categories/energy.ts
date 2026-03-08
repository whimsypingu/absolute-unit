import type { CategoryData } from "../constants.ts";

export const energy: CategoryData = {
    label: 'Energy',
    initialUnits: {
        from: 'joule', 
        to: 'wattHour'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                joule: {
                    label: 'Joules',
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                kilojoule: {
                    label: 'Kilojoules',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001'
                },
                calorie: {
                    label: 'Calories',
                    toBase: 'x * 4184',
                    fromBase: 'x / 4184'
                },
                wattHour: {
                    label: 'Watt-hours', 
                    toBase: 'x * 3600',
                    fromBase: 'x / 3600'
                },
            }
        },
        {
            label: 'Informal Units',
            units: {
                bigMac: {
                    label: 'Big Macs',
                    toBase: 'x * 563 * 4184',
                    fromBase: 'x / (563 * 4184)'
                },
                gallonGas: {
                    label: 'Gallons of Gas',
                    toBase: 'x * (1.213 * (10 ^ 8))',
                    fromBase: 'x / (1.213 * (10 ^ 8))'
                },
                tonTNT: {
                    label: 'Tons of TNT',
                    toBase: 'x * (4.184 * (10 ^ 9))',
                    fromBase: 'x / (4.184 * (10 ^ 9))'
                },
                hiroshima: {
                    label: 'Hiroshimas',
                    toBase: 'x * (15000 * 4.184 * (10 ^ 9))',
                    fromBase: 'x / (15000 * 4.184 * (10 ^ 9))'
                }
            },
        }
    ]
}
