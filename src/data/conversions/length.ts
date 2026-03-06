import type { CategoryData } from "../constants.ts";

export const length: CategoryData = {
    label: 'Length',
    units: {
        meters: { 
            label: 'Meters', 
            toBase: 'x * 1',
            fromBase: 'x * 1'
        },
        feet: {
            label: 'Feet', 
            toBase: 'x * 0.3048',
            fromBase: 'x * 3.28084'
        },
        inches: { 
            label: 'Inches',
            toBase: 'x * 0.0254',
            fromBase: 'x * 3.28084 * 12'
        },        
    }
}