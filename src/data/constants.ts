import { energy } from "./conversions/energy";
import { length } from "./conversions/length";
import { weight } from "./conversions/weight";

//CONVERSIONS
export const CONVERSIONS: ConversionRegistry = {

	length,
	weight,
	energy

} as const;



// Operations and Formulas
export type Op = 'x' | 'add' | 'subtract' | 'multiply' | 'divide' | 'pow';
export type Formula = (Op | number)[]


// Conversion breakdown
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
