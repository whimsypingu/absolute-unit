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

    const maxFracDigits = Math.abs(Math.floor(Math.log10(lowerExpBound))); //number of digits in lowerExpBound

    const precisionValue = Number.parseFloat(value.toPrecision(maxFracDigits));

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: maxFracDigits,
        useGrouping: true,
    }).format(precisionValue);
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

