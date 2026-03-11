import { describe, it, expect } from "vitest";
import { BIG_DENOMINATIONS, SORTED_DENOMINATION_KEYS, formatHumanReadable } from "../data/format";


describe('Human readable format with default parameters', () => {
    it('Formats large numbers correctly (1e+33,)', () => {
        const minLargeExp = SORTED_DENOMINATION_KEYS[0] + 3;

        const minLargeVal = 1 * Math.pow(10, minLargeExp);

        const t1 = formatHumanReadable(minLargeVal);
        expect(t1).toBe(`1.00e+${minLargeExp}`);

        //test 3 random exponents between the minimum largest and ++100
        for (let i = 0; i < 3; i++) {
            const randomLargeExp = Math.floor(
                Math.random() * (100) + minLargeExp + 1
            );

            const randomLargeVal = 1 * Math.pow(10, randomLargeExp);

            const t2 = formatHumanReadable(randomLargeVal);
            expect(t2).toBe(`1.00e+${randomLargeExp}`);
        }
    });

    it('Formats suffixed numbers correctly (1e+6, 1e+33)', () => {
        Object.entries(BIG_DENOMINATIONS).forEach(([power, suffix]) => {
            const p = Number(power);
            const powVal = Math.pow(10, p);
            
            //decimals place
            const t1 = 1 * powVal;
            expect(formatHumanReadable(t1)).toBe(`1 ${suffix}`);

            const t2 = 1.2 * powVal;
            expect(formatHumanReadable(t2)).toBe(`1.2 ${suffix}`);

            const t3 = -1.23 * powVal;
            expect(formatHumanReadable(t3)).toBe(`-1.23 ${suffix}`);

            //cutoffs
            const t4 = -1.234 * powVal;
            expect(formatHumanReadable(t4)).toBe(`-1.23 ${suffix}`);

            const t5 = -12.345 * powVal;
            expect(formatHumanReadable(t5)).toBe(`-12.3 ${suffix}`);

            const t6 = 123.456 * powVal;
            expect(formatHumanReadable(t6)).toBe(`123 ${suffix}`);

            //rounding
            const t7 = 1.099 * powVal;
            expect(formatHumanReadable(t7)).toBe(`1.1 ${suffix}`);

            const t8 = -1.0951 * powVal;
            expect(formatHumanReadable(t8)).toBe(`-1.1 ${suffix}`);            

            const t9 = 10.951 * powVal;
            expect(formatHumanReadable(t9)).toBe(`11 ${suffix}`);            
        });
    });

    it('Formats displayable numbers correctly (1,100000)', () => {
        const t1 = 100000;
        expect(formatHumanReadable(t1)).toBe('100,000');

        const t2 = -123456.123;
        expect(formatHumanReadable(t2)).toBe('-123,456');

        //cutoff at 5 digits on default settings
        const t3 = 10000.123;
        expect(formatHumanReadable(t3)).toBe('10,000');

        //rounding
        const t4 = 10000.56789;
        expect(formatHumanReadable(t4)).toBe('10,001');
        
        const t5 = -1000.56789;
        expect(formatHumanReadable(t5)).toBe('-1,000.6');

        const t6 = -100.56789;
        expect(formatHumanReadable(t6)).toBe('-100.57');
        
        const t7 = 10.56789;
        expect(formatHumanReadable(t7)).toBe('10.568');
        
        const t8 = -1.56789;
        expect(formatHumanReadable(t8)).toBe('-1.5679');

        //lots of rounding
        const t9 = -149.995;
        expect(formatHumanReadable(t9)).toBe('-150');

        const t10 = 149.955;
        expect(formatHumanReadable(t10)).toBe('149.96');
    });

    it('Formats fractional simplifications correctly (0,1)', () => {
        //valid fractions
        const t1 = 0.5;
        expect(formatHumanReadable(t1)).toBe('1/2');

        const t2 = 2 * 0.333;
        expect(formatHumanReadable(t2)).toBe('2/3');

        const t3 = 5 * 0.1428;
        expect(formatHumanReadable(t3)).toBe('5/7');

        const t4 = 3 * 0.125;
        expect(formatHumanReadable(t4)).toBe('3/8');

        //error tolerance default set to 0.002
        const t5 = 0.4 + 0.00123;
        expect(formatHumanReadable(t5)).toBe('2/5');

        const t6 = 0.4 - 0.00123;
        expect(formatHumanReadable(t6)).toBe('2/5');

        //invalid fractions
        const t7 = 0.456123;
        expect(formatHumanReadable(t7)).toBe('0.45612');
    });
        
    it('Formats small numbers correctly (1e-6,0)', () => {
        const maxSmallExp = -6; 

        const maxSmallVal = 1 * Math.pow(10, maxSmallExp);

        const t1 = formatHumanReadable(maxSmallVal);
        expect(t1).toBe(`1.00e${maxSmallExp}`);

        //test 3 random exponents between -7 and -107
        for (let i = 0; i < 3; i++) {
            const randomSmallExp = Math.floor(
                Math.random() * (-100) + maxSmallExp - 1
            );

            const randomSmallVal = 1 * Math.pow(10, randomSmallExp);

            const t2 = formatHumanReadable(randomSmallVal);
            expect(t2).toBe(`1.00e${randomSmallExp}`);
        }
    });
   
    it('Edge cases', () => {
        //zero
        const t1 = 0.00;
        expect(formatHumanReadable(t1)).toBe('0');
        
        //rounding
        const t2 = 0.000009;
        expect(formatHumanReadable(t2)).toBe('9.00e-6');

        const t3 = 0.000009999;
        expect(formatHumanReadable(t3)).toBe('0.00001');
    });
});
