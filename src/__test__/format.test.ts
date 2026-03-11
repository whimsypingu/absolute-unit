import { describe, it, expect } from "vitest";
import { BIG_DENOMINATIONS, SORTED_DENOMINATION_KEYS, formatHumanReadable } from "../data/format";


describe('Human readable format', () => {
    it('Formats large numbers correctly', () => {
        const minLargeExp = SORTED_DENOMINATION_KEYS[0] + 3;

        const minLargeVal = 1 * Math.pow(10, minLargeExp);

        const t1 = formatHumanReadable(minLargeVal);
        expect(t1).toBe(`1.00e+${minLargeExp}`);

        for (let i = 0; i < 3; i++) {
            const randomLargeExp = Math.floor(
                Math.random() * (200 - minLargeExp + 1) + minLargeExp
            );

            const randomLargeVal = 1 * Math.pow(10, randomLargeExp);

            const t2 = formatHumanReadable(randomLargeVal);
            expect(t2).toBe(`1.00e+${randomLargeExp}`);
        }
    });

    it('Formats suffixed numbers correctly', () => {
        Object.entries(BIG_DENOMINATIONS).forEach(([power, suffix]) => {
            const p = Number(power);
            const powVal = Math.pow(10, p);
            
            //decimals place
            const t1 = 1 * powVal;
            expect(formatHumanReadable(t1)).toBe(`1 ${suffix}`);

            const t2 = 1.2 * powVal;
            expect(formatHumanReadable(t2)).toBe(`1.2 ${suffix}`);

            const t3 = 1.23 * powVal;
            expect(formatHumanReadable(t3)).toBe(`1.23 ${suffix}`);

            //cutoffs
            const t4 = 1.234 * powVal;
            expect(formatHumanReadable(t4)).toBe(`1.23 ${suffix}`);

            const t5 = 12.345 * powVal;
            expect(formatHumanReadable(t5)).toBe(`12.3 ${suffix}`);

            const t6 = 123.456 * powVal;
            expect(formatHumanReadable(t6)).toBe(`123 ${suffix}`);

            //rounding
            const t7 = 1.099 * powVal;
            expect(formatHumanReadable(t7)).toBe(`1.1 ${suffix}`);

            const t8 = 1.0951 * powVal;
            expect(formatHumanReadable(t8)).toBe(`1.1 ${suffix}`);            

            const t9 = 10.951 * powVal;
            expect(formatHumanReadable(t9)).toBe(`11 ${suffix}`);            
        });
    })
});
