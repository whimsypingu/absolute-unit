import { describe, it, expect } from 'vitest';

import * as AllGeneratedConversions from '../generated/index';

import { convert } from '../data/utils';


describe('Automatic registry round-trip tests', () => {
    Object.entries(AllGeneratedConversions).forEach(([moduleName, categoryData]) => {

        //flatten units
        const allUnits = categoryData.unitGroups.flatMap(group => 
            Object.entries(group.units)
        );

        allUnits.forEach(([unitKey, unitDef]) => {
            it(`[${moduleName}] ${unitKey} should round-trip correctly`, () => {
                const testValue = '1';

                //test that it can go from 1 unit to the base unit, then back, and equal 1
                const roundTripValue = convert(testValue, unitDef.toBase, unitDef.fromBase);

                expect(roundTripValue).toBeCloseTo(1, 5);
            });
        });
    });
});