import type { CategoryData } from "../constants.ts";

export const energy: CategoryData = {
    label: 'Energy',
    initialUnits: {
        from: 'joules', 
        to: 'wattHours'
    },
    unitGroups: [
        {
            label: 'Conventional Units',
            units: {
                joules: {
                    label: 'Joules',
                    toBase: 'x * 1',
                    fromBase: 'x * 1'
                },
                kilojoules: {
                    label: 'Kilojoules',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001'
                },
                calories: {
                    label: 'Calories',
                    toBase: 'x * 4184',
                    fromBase: 'x / 4184'
                },
                wattHours: {
                    label: 'Watt-hours', 
                    toBase: 'x * 3600',
                    fromBase: 'x / 3600'
                },
            }
        },
        {
            label: 'Informal Units',
            units: {
                bigMacs: {
                    label: 'Big Macs',
                    toBase: 'x * 563 * 4184',
                    fromBase: 'x / (563 * 4184)'
                },
                gallonsGas: {
                    label: 'Gallons of Gas',
                    toBase: 'x * (1.213 * (10 ^ 8))',
                    fromBase: 'x / (1.213 * (10 ^ 8))'
                },
                tonsTNT: {
                    label: 'Tons of TNT',
                    toBase: 'x * (4.184 * (10 ^ 9))',
                    fromBase: 'x / (4.184 * (10 ^ 9))'
                },
                hiroshimas: {
                    label: 'Hiroshimas',
                    toBase: 'x * (15000 * 4.184 * (10 ^ 9))',
                    fromBase: 'x / (15000 * 4.184 * (10 ^ 9))'
                }
            },
        }
    ]
}
