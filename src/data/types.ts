import { length } from "./conversions/length";
import { weight } from "./conversions/weight";

export type Op = 'x' | 'add' | 'subtract' | 'multiply' | 'divide' | 'pow';
export type Formula = (Op | number)[]


export interface UnitData {
	label: string;
	toBase: string;
	fromBase: string;
}
export interface CategoryData {
	label: string;
	units: Record<string, UnitData>;
}
export type ConversionRegistry = Record<string, CategoryData>



//CONVERSIONS
export const CONVERSIONS: ConversionRegistry = {

	length,
	weight

	/*
    energy: {
		label: 'Energy',
        units: {
            joules: { label: 'Joules', factor: 1 },
            kilojoules: { label: 'Kilojoules', factor: 0.001 },
            calories: { label: 'Calories', factor: 0.000239006 },
            wattHours: { label: 'Watt-hours', factor: 0.000277778 },
			bigmacs: { label: 'Big Macs', factor: 1/2426720 },
        }
	},
	temperature: {
		label: 'Temperature',
		units: {
			celsius: { label: 'Celsius (°C)', factor: 1 },
			fahrenheit: { label: 'Fahrenheit (°F)', factor: 1 }, // Logic: (C * 9/5) + 32
			kelvin: { label: 'Kelvin (K)', factor: 1 },        // Logic: C + 273.15
			rankine: { label: 'Rankine (°Ra)', factor: 1 },    // Logic: (C + 273.15) * 9/5			
		}
	},
	time: {
		label: 'Time',
		units: {
			seconds: { label: 'Seconds', factor: 1 },
			minutes: { label: 'Minutes', factor: 1/60 },
			hours: { label: 'Hours', factor: 1/3600 },
			days: { label: 'Days', factor: 1/86400 },
			weeks: { label: 'Weeks', factor: 1/604800 },
		}
	}
		*/

} as const;

export type Category = keyof typeof CONVERSIONS;
export type UnitKey<C extends Category> = keyof typeof CONVERSIONS[C]['units'];


// Categories and initial state
export const CATEGORIES: Category[] = Object.keys(CONVERSIONS);
export const INITIAL_CATEGORY: Category = CATEGORIES[0];


// History for each category
export type ConversionEntry = {
	from: string;
	to: string;
}
export type ConversionHistory = {
    [K in Category]: ConversionEntry;
}

export const INITIAL_HISTORY = (Object.keys(CONVERSIONS) as Category[]).reduce((acc, cat) => {
	const unitKeys = Object.keys(CONVERSIONS[cat].units);
    
	acc[cat] = { 
        from: unitKeys[0], 
        to: unitKeys[1] || unitKeys[0] 
    };
	return acc;
}, {} as ConversionHistory);


// Mappings from Category -> Label
export type CategoryItem = {
	id: string;
	label: string;
}
export const CATEGORY_ITEMS = Object.entries(CONVERSIONS).map(([key, data]) => ({
	id: key, //technical key 'energy'
	label: data.label
}));
