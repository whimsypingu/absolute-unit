export interface UnitData {
	label: string;
	factor: number;
}
export interface CategoryData {
	units: Record<string, UnitData>;
}
export type ConversionRegistry = Record<string, CategoryData>

//CONVERSIONS
export const CONVERSIONS: ConversionRegistry = {
	length: {
		units: {
			meters: { label: 'Meters', factor: 1 },
			feet: { label: 'Feet', factor: 3.28084 },
			inches: { label: 'Inches', factor: 39.3701 },
		}
	},
	weight: {
		units: {
			kilograms: { label: 'Kilograms', factor: 1 },
			pounds: { label: 'Pounds', factor: 2.20462 },
			ounces: { label: 'Ounces', factor: 35.274 },
		}
	}
} as const;

export type Category = keyof typeof CONVERSIONS;
export type UnitKey<C extends Category> = keyof typeof CONVERSIONS[C]['units'];


export const InitialCategory: Category = (Object.keys(CONVERSIONS) as Category[])[0];

export type ConversionEntry = {
	from: string;
	to: string;
}
export type ConversionHistory = {
    [K in Category]: ConversionEntry;
}

export const InitialHistory = (Object.keys(CONVERSIONS) as Category[]).reduce((acc, cat) => {
	const unitKeys = Object.keys(CONVERSIONS[cat].units);
    
	acc[cat] = { 
        from: unitKeys[0], 
        to: unitKeys[1] || unitKeys[0] 
    };
	return acc;
}, {} as ConversionHistory);
