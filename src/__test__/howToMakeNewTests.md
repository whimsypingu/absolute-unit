# How to make new unit tests

For each valid generated set of units (see `/src/generated/`), there should be a matching file of the format `GENERATED_FILENAME.test.ts` in this test folder.

For example, `/src/generated/energy.ts` → `/src/__test__/energy.test.ts`.

### Unit test

Pick a unit, and then ensure that there is a block kind of like this. `const u` should be equal to the actual key of the unit name, so check the corresponding unit file (see `/src/data/categories/energy/metric/kilojoule.json`) for the field `unitName`.

Each unit test block should look kind of like this:

```ts
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
```

Basic linear conversions shouldn't require too much testing. Mainly this stuff is for weirder non-linear functions or functions that don't pass through the origin, and just to verify via manual testing that this actually works as intended.

### Run test

To run specifically any edited files, like `energy.test.ts`, do `run vitest energy`. 

For all test files in this project, do `npx vitest run`.

(If `/src/generated/` files are missing, run `python compile.py` first.)