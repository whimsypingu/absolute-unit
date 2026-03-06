import type { CategoryData } from "../constants.ts";

export const energy: CategoryData = {
    label: 'Energy',
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
            label: 'Less Conventional Units',
            units: {
                bigMacs: {
                    label: 'Big Macs',
                    toBase: 'x * 563 * 4184',
                    fromBase: 'x / (563 * 4184)'
                },
            }
        }
    ]
}
