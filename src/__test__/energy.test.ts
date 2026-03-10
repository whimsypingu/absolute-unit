import { describe, it, expect } from "vitest";
import { convert } from "../data/utils";
import { energy } from "../generated/energy";

//flatten units
const allUnits = Object.fromEntries(
    energy.unitGroups.flatMap(group => Object.entries(group.units))
);
const toBase = (unit: string) => {
    return allUnits[unit].toBase;
};
const fromBase = (unit: string) => {
    return allUnits[unit].fromBase;
};

describe('Energy conversion manual tests', () => {
    //joule
    it('converts Joules correctly', () => {
        const u = 'joule';

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

    //kilojoule
    it('converts Kilojoules correctly', () => {
        const u = 'kilojoule';

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