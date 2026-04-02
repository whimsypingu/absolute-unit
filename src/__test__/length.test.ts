import { describe, it, expect } from "vitest";
import { convert } from "../data/utils";
import { length } from "../generated/length";

//flatten units
const allUnits = Object.fromEntries(
    length.unitGroups.flatMap(group => Object.entries(group.units))
);
const toBase = (unit: string) => {
    return allUnits[unit].toBase;
};
const fromBase = (unit: string) => {
    return allUnits[unit].fromBase;
};

// Ensures convert utility converts between base units and target units correctly
describe('Length conversion manual tests', () => {
    //meters
    it('converts Meters correctly', () => {
        const u = 'meter';

        //to base units
        const t1 = convert('123', toBase(u), 'x');
        expect(t1).toBe(123);

        const t2 = convert('0.123', toBase(u), 'x');
        expect(t2).toBe(0.123);

        const t3 = convert('-1.23', toBase(u), 'x');
        expect(t3).toBe(-1.23);

        //from base units
        const t4 = convert('123', 'x', fromBase(u));
        expect(t4).toBe(123);

        const t5 = convert('0.123', 'x', fromBase(u));
        expect(t5).toBe(0.123);

        const t6 = convert('-1.23', 'x', fromBase(u));
        expect(t6).toBe(-1.23);
    });

    //kilometer
    it('converts Kilometers correctly', () => {
        const u = 'kilometer';

        //to base units
        const t1 = convert('123', toBase(u), 'x');
        expect(t1).toBe(123000);

        const t2 = convert('0.123', toBase(u), 'x');
        expect(t2).toBe(123);

        const t3 = convert('-1.23', toBase(u), 'x');
        expect(t3).toBe(-1230);

        //from base units
        const t4 = convert('123', 'x', fromBase(u));
        expect(t4).toBe(0.123);

        const t5 = convert('0.123', 'x', fromBase(u));
        expect(t5).toBe(0.000123);

        const t6 = convert('-1.23', 'x', fromBase(u));
        expect(t6).toBe(-0.00123);
    });
});