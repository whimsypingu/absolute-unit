import { type Op, type Formula, type CategoryData, type UnitData, CATEGORIES, CONVERSIONS} from "./constants.ts"

const mapOp = (op: string): Op => {
    const map: Record<string, Op> = { 
		'+': 'add', 
		'-': 'subtract', 
		'*': 'multiply', 
		'/': 'divide', 
		'^': 'pow', 
		'@': 'log'
	};
    return map[op];
};

const parseToRPN = (infix: string): Formula => {
    const output: Formula = [];
    const stack: string[] = [];
    
    // Tokens: numbers, 'x', operators, and parentheses
	const tokens = infix.match(/-?\d*\.?\d+|x|[+\-*/^()@]/g) || [];
    
	const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '@': 4 };

    for (const token of tokens) {
		if (/^-?\d*\.?\d+$/.test(token)) {
        	// Numbers and negative numbers are pushed directly to output
            output.push(parseFloat(token));
        } else if (token === 'x') {
			// input is pushed to the output
			output.push('x');
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(mapOp(stack.pop()!));
            }
            stack.pop(); // Remove '('
        } else {
            // Operator
            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
                output.push(mapOp(stack.pop()!));
            }
            stack.push(token);
        }
    }
    while (stack.length) output.push(mapOp(stack.pop()!));
    return output;
};

const evaluateRPN = (x: number, formula: Formula): number => {
	const stack: number[] = [];

	for (const token of formula) {
		if (typeof token === 'number') {
			stack.push(token);
		} else if (token === 'x') {
			stack.push(x);
		} else {
			const b = stack.pop()!;
			const a = stack.pop()!;

			//different Ops
			switch (token) {
				case 'add':
					stack.push(a + b); 
					break;
				case 'subtract':
					stack.push(a - b);
					break;
				case 'multiply': 
					stack.push(a * b);
					break;
				case 'divide':
					stack.push(a / b);
					break;
				case 'pow':
					stack.push(Math.pow(a, b));
					break;
				case 'log':
					stack.push(Math.log(b) / Math.log(a));
					break;
			}
		}
	}
	return stack.pop()!;
}

export const convert = (value: string, toBase: string, fromBase: string): number => {
	const numericValue = parseFloat(value);
	
	if (isNaN(numericValue)) return 0;
	
	const toBaseRPN = parseToRPN(toBase);

	const baseValue = evaluateRPN(numericValue, toBaseRPN);

	const fromBaseRPN = parseToRPN(fromBase);

	const targetValue = evaluateRPN(baseValue, fromBaseRPN);

	return targetValue;
}



//Helper functions to go through the nested stuff

export const getUnitData = (
    categoryData: CategoryData, 
    unitKey: string
): UnitData => {
    // Search through all groups to find the unit definition
    for (const group of categoryData.unitGroups) {
        if (group.units[unitKey]) {
            return group.units[unitKey];
        }
    }
    throw new Error(`Unit ${unitKey} not found in category ${categoryData.label}`);
};



const getFlattenedUnitKeys = (categoryData: CategoryData): string[] => {
	return categoryData.unitGroups.flatMap(group => Object.keys(group.units));
};

export const getRandomConversion = (currentCategory: string) => {
	let newCategory = currentCategory;
	while (newCategory === currentCategory) {
		newCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
	}

	const categoryData = CONVERSIONS[newCategory];
	const unitKeys = getFlattenedUnitKeys(categoryData);

	const newFrom: string = unitKeys[Math.floor(Math.random() * unitKeys.length)];
	let newTo: string = newFrom;
	while (newTo === newFrom) {
		newTo = unitKeys[Math.floor(Math.random() * unitKeys.length)];
	}

	return {
		category: newCategory,
		from: newFrom,
		to: newTo
	};
};