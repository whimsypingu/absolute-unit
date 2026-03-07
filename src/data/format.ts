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

    const exponent = Math.floor(Math.log10(Math.abs(value)))

    const keys = Object.keys(BIG_DENOMINATIONS).map(Number).sort((a, b) => b - a);
    const foundKey = keys.find(k => (exponent >= 0 ? exponent >= k : exponent <= -k));

    if (foundKey !== undefined) {
        const divisor = Math.pow(10, foundKey);

        return `${(value / divisor).toFixed(2)} ${BIG_DENOMINATIONS[foundKey]}${exponent < 0 ? 'ths' : ''}`;
    }

    // Fallback for normal numbers
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 6,
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

