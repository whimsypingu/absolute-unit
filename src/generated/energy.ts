import type { CategoryData } from "../data/constants.ts";

export const energy: CategoryData = {
    label: 'Energy',
    initialUnits: {
        from: 'joule', 
        to: 'calorie'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                calorie: {
                    singular: 'Calorie',
                    plural: 'Calories',
                    toBase: 'x * 4184',
                    fromBase: 'x / 4184',
                },
                joule: {
                    singular: 'Joule',
                    plural: 'Joules',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                },
                kilojoule: {
                    singular: 'Kilojoule',
                    plural: 'Kilojoules',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001',
                },
                wattHour: {
                    singular: 'Watt-hour',
                    plural: 'Watt-hours',
                    toBase: 'x * 3600',
                    fromBase: 'x / 3600',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                bigmac: {
                    singular: 'Big Mac',
                    plural: 'Big Macs',
                    toBase: 'x * 563 * 4184',
                    fromBase: 'x / (563 * 4184)',
                },
                gallonGas: {
                    singular: 'Gallon of Gas',
                    plural: 'Gallons of Gas',
                    toBase: 'x * (1.213 * (10 ^ 8))',
                    fromBase: 'x / (1.213 * (10 ^ 8))',
                },
                hiroshima: {
                    singular: 'Hiroshima',
                    plural: 'Hiroshimas',
                    toBase: 'x * (15000 * 4.184 * (10 ^ 9))',
                    fromBase: 'x / (15000 * 4.184 * (10 ^ 9))',
                },
                tonTNT: {
                    singular: 'Ton of TNT',
                    plural: 'Tons of TNT',
                    toBase: 'x * (4.184 * (10 ^ 9))',
                    fromBase: 'x / (4.184 * (10 ^ 9))',
                }
            }
        }
    ]
};