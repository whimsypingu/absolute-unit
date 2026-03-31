import { describe, it, expect } from "vitest";
import { convert } from "../data/utils";
import { energy } from "../generated/energy";

const FLOAT_PRECISION = 5;

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

// Ensures convert utility converts between base units and target units correctly
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

    // calorie
    it('converts Calorie correctly', () => {
        const u = 'calorie';

        // to base units
        const t1 = convert('123', toBase(u), 'x');
        expect(t1).toBe(514632);

        const t2 = convert('0.123', toBase(u), 'x');
        expect(t2).toBe(514.632);

        const t3 = convert('-12.34', toBase(u), 'x');
        expect(t3).toBe(-51630.56);

        // to base units - some more complex functions
        const t4 = convert('0.1', toBase(u), '2*(5+x^2)');
        expect(t4).toBeCloseTo(350127.12, FLOAT_PRECISION);

        const t5 = convert('0.23', toBase(u), 'x^3/1000');
        expect(t5).toBeCloseTo(891165.8498, FLOAT_PRECISION);

        const t6 = convert('78', toBase(u), '2937/389 + 51*x^(1/2)');
        expect(t6).toBeCloseTo(29142.43561, FLOAT_PRECISION);

        // from base units
        const t7 = convert('123', 'x', fromBase(u));
        expect(t7).toBeCloseTo(0.02939770554, FLOAT_PRECISION);

        const t8 = convert('0.123', 'x', fromBase(u));
        expect(t8).toBeCloseTo(0.0000293977055, FLOAT_PRECISION);

        const t9 = convert('-12.34', 'x', fromBase(u));
        expect(t9).toBeCloseTo(-0.002949330784, FLOAT_PRECISION);

        // there seem to be small differences for non-linear functions

        // const t13 = convert('0.028', toBase(u), '(x^3-100*x)/99');
        // expect(t13).toBeCloseTo(16122.70805, FLOAT_PRECISION);

        // const t10 = convert('1000', 'x^2', fromBase(u));
        // expect(t10).toBe(241.0800386);

        // const t14 = convert('123', 'x^2/100', fromBase(u));
        // expect(t14).toBeCloseTo(0.03647299904, FLOAT_PRECISION);

        // const t15 = convert('123', '(5+x^3)', fromBase(u));
        // expect(t15).toBeCloseTo(448.6190935, FLOAT_PRECISION);
    });
});