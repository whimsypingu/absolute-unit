// import { energy } from "./categories/energy";
// import { length } from "./categories/length";
// import { time } from "./categories/time";
// import { volume } from "./categories/volume";
// import { weight } from "./categories/weight";

import { energy } from "../generated/energy.ts";
import { length } from "../generated/length.ts";
import { weight } from "../generated/weight.ts";

//CONVERSIONS
export const CONVERSIONS: ConversionRegistry = {

	length,
	energy,
	weight,

} as const;



// Operations and Formulas
export type Op = 'x' | 'add' | 'subtract' | 'multiply' | 'divide' | 'pow' | 'log';
export type Formula = (Op | number)[]


// Conversion breakdown
export interface UnitData {
	singular: string;
	plural: string;
	toBase: string;
	fromBase: string;
	abbr?: string;
	info?: string;
}
export interface UnitGroup {
	label: string;
	units: Record<string, UnitData>;
}
export interface CategoryData {
	label: string;
	initialUnits: ConversionEntry;
	unitGroups: UnitGroup[];
}
export type ConversionRegistry = Record<string, CategoryData>


export type Category = keyof typeof CONVERSIONS;
export type UnitKey<C extends Category> = keyof (
	typeof CONVERSIONS[C]['unitGroups'][number]['units']
);


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

export const INITIAL_HISTORY: ConversionHistory = (Object.keys(CONVERSIONS) as Category[]).reduce((acc, cat) => {
	//grab first group
	const { from, to } = CONVERSIONS[cat].initialUnits;

	acc[cat] = { from, to };

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
