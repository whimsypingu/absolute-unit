import type { CategoryData } from "../constants.ts";

export const weight: CategoryData = {
    label: 'Weight',
    units: {
        kilograms: { 
            label: 'Kilograms', 
            toBase: 'x * 1',
            fromBase: 'x * 1'
        },
        pounds: { 
            label: 'Pounds', 
            toBase: 'x * 0.453592',
            fromBase: 'x * 2.20462'
        },
        ounces: { 
            label: 'Ounces', 
            toBase: 'x * 0.0625 * 0.453592',
            fromBase: 'x * 2.20462 * 16'
        },
    }
}
