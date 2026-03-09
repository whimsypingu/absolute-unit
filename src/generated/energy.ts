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
                joule: {
                    singular: 'Joule',
                    plural: 'Joules',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'J',
                    desc: 'A joule is the standard International System of Units (SI) unit for measuring energy. It is defined as the energy transferred when a force of 1 newton moves an object over a distance of one meter.',
                    lastCheck: '3/9/2026',
                },
                kilojoule: {
                    singular: 'Kilojoule',
                    plural: 'Kilojoules',
                    toBase: 'x * 1000',
                    fromBase: 'x * 0.001',
                    abbr: 'kJ',
                },
                calorie: {
                    singular: 'Calorie',
                    plural: 'Calories',
                    toBase: 'x * 4184',
                    fromBase: 'x / 4184',
                    abbr: 'kcal',
                    desc: 'In daily diet and exercise, "calories", "Calories", and "kilocalories" are used interchangeably to mean the same thing, which is insanely confusing. The calories listed on food packaging are actually kilocalories (kcal). 1 kcal = 4.184 kJ',
                    lastCheck: '3/9/2026',
                },
                wattHour: {
                    singular: 'Watt-hour',
                    plural: 'Watt-hours',
                    toBase: 'x * 3600',
                    fromBase: 'x / 3600',
                    abbr: 'Wh',
                    desc: 'A watt-hour represents the amount of energy equivalent to a power of 1 watt sustained for 1 hour.',
                    lastCheck: '3/9/2026',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                bigmac: {
                    singular: 'Big Mac',
                    plural: 'Big Macs',
                    toBase: 'x * 580 * 4184',
                    fromBase: 'x / (580 * 4184)',
                    desc: 'A standard Big Mac contains 580 kcal. Including the fries and a drink would exceed 1000 kcal.',
                    source: 'https://www.mcdonalds.com/us/en-us/product/big-mac.html',
                    lastCheck: '3/9/2026',
                },
                gallonGas: {
                    singular: 'Gallon of Gas',
                    plural: 'Gallons of Gas',
                    toBase: 'x * (1.213 * (10 ^ 8))',
                    fromBase: 'x / (1.213 * (10 ^ 8))',
                },
                tonTNT: {
                    singular: 'Ton of TNT',
                    plural: 'Tons of TNT',
                    toBase: 'x * (4.184 * (10 ^ 9))',
                    fromBase: 'x / (4.184 * (10 ^ 9))',
                    desc: 'By convention, a ton of TNT represents the energy released by detonating one metric tonne of TNT, which is 4.184 gigajoules (9 zeros) or hilariously 1 gigacalorie.',
                    lastCheck: '3/9/2026',
                },
                hiroshima: {
                    singular: 'Hiroshima',
                    plural: 'Hiroshimas',
                    toBase: 'x * (15000 * 4.184 * (10 ^ 9))',
                    fromBase: 'x / (15000 * 4.184 * (10 ^ 9))',
                }
            }
        }
    ]
};