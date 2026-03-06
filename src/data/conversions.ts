export interface UnitData {
	label: string;
	factor: number;
}
export interface CategoryData {
	label: string;
	units: Record<string, UnitData>;
}
export type ConversionRegistry = Record<string, CategoryData>

//CONVERSIONS
export const CONVERSIONS: ConversionRegistry = {
	length: {
		label: 'Length',
		units: {
			meters: { label: 'Meters', factor: 1 },
			feet: { label: 'Feet', factor: 3.28084 },
			inches: { label: 'Inches', factor: 39.3701 },
		}
	},
	weight: {
		label: 'Weight',
		units: {
			kilograms: { label: 'Kilograms', factor: 1 },
			pounds: { label: 'Pounds', factor: 2.20462 },
			ounces: { label: 'Ounces', factor: 35.274 },
		}
	},
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

		}
	},
	time: {
		label: 'Time',
		units: {

		}
	}

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
