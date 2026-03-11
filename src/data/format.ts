const BIG_DENOMINATIONS: Record<number, string> = {
    30: "brazilian",
    27: "gazillion",
    24: "septillion",
    21: "sextillion",
    18: "quintillion",
    15: "quadrillion",
    12: "trillion",
    9: "billion",
    6: "million",
};
function decimalToFraction(val: number, tolerance: number = 0.003, denomLimit: number = 8): string | false {
    let frac = val;
    let num1 = 0, den1 = 1; //previous best guess
    let num2 = 1, den2 = 0; //best convergent guess so far

    while (true) {
        let a = Math.floor(frac); //whole number part

        let num3 = a * num2 + num1;
        let den3 = a * den2 + den1; //set current guess

        if (den3 > denomLimit) { //break out early if fraction is too precise
            return false;
        }

        if (Math.abs(val - (num3 / den3)) < tolerance) { //check accurate
            return `${num3}/${den3}`;
        }

        num1 = num2; den1 = den2; //previous guess is the current failed guess
        num2 = num3; den2 = den3; //best guess so far is previous guess

        frac = 1 / (frac - a); //reciprocal with whole part removed
    }
}
export const formatHumanReadable = (value: number): string => {
    if (value === 0) return "0";

    const absValue = Math.abs(value)

    const upperFormatBound = 1_000_000; //at which point use suffixes
    if (absValue >= upperFormatBound) {
        const exponent = Math.floor(Math.log10(absValue))
    
        const keys = Object.keys(BIG_DENOMINATIONS).map(Number).sort((a, b) => b - a);

        //check against the biggest denomination, if it's too big then go scientific
        if (exponent >= (keys[0] + 3)) {
            return value.toExponential(2);
        }

        const foundKey = keys.find(k => exponent >= k);

        if (foundKey) {
            const formatted = value / Math.pow(10, foundKey);
            return `${Number.parseFloat(formatted.toPrecision(3))} ${BIG_DENOMINATIONS[foundKey]}`;
        }
    }
    
    const lowerExpBound = 0.000_01; //at which point use exponential form
    if (absValue < lowerExpBound) {
        return value.toExponential(2);
    }

    //handle pretty fractions, up to x/8
    if (absValue < 1) {
        const fraction = decimalToFraction(value);

        if (fraction) {
            return fraction;
        }
    }

    //fallback pretty print
    const maxFracDigits = Math.abs(Math.floor(Math.log10(lowerExpBound))); //number of digits in lowerExpBound

    const wholeDigits = Math.max(0, Math.floor(Math.log10(absValue)) + 1); //take the number of whole number digits
    const precision = Math.max(0, maxFracDigits - wholeDigits); //calculate maximum precision digits

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: precision,
        minimumFractionDigits: 0,
        useGrouping: true,
    }).format(value);
};


export const formatScientific = (value: number): string => {
    const absValue = Math.abs(value);
    if (absValue >= 100_000_000 || (absValue > 0 && absValue < 0.000_001)) {
        return value.toExponential(4);
    }

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 6,
        useGrouping: true,
    }).format(value);
}




//helper function to check for clean input
export const sanitizeInput = (input: string): string => {
    return input.replace(/\s+/g, '');
}
export const isInputValid = (input: string): boolean => {
    const trimmed = sanitizeInput(input);

    return (trimmed === "" || trimmed === "-" || /^-?\d*\.?\d*$/.test(trimmed));
}

