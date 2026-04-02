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

Basic linear conversions shouldn't require too much testing. Mainly this stuff is for weirder non-linear functions or functions that don't pass through the origin, and just to verify via manual testing that this actually works as intended. Toss in some negatives in there to make sure it behaves properly.

### Under the hood

The unit tests are a test harness to ensure that the conversions listed are more or less accurate. 

Every conversion category (energy, length, etc.) have a `base unit` (joule, meter, etc.) which is used as a middle conversion to go between two other units. Correctness for all conversions are basically guaranteed as long as the conversions from the base and to the base are correct.

Some examples:

`Unit A` → `base unit` → `Unit B`

`cm` → `m` → `giraffes`

If there is a mistake, then you can see the conversion formula by navigating to `/src/data/categories/`, then finding the category, class of unit, and then the actual file. 

Inside the json file, there are two fields `toBase` and `fromBase`. For a successful build, `/compile.py` runs, and converts the json into typescript modules which can be found in `/src/generated/`. The conversions are then handed off to the Reverse Polish Notation engine inside `/src/data/utils.ts` (this should probably be in another file, but too lazy). The supported conversion operations and special characters are found here, and will be listed in this md file as well:

| Op | Desc | Usage | Notes | 
| -- | ---- | ----- | ----- |
| + | Add | a + b |
| - | Subtract | a - b |
| * | Multiply | a * b |
| / | Divide | a / b |
| ^ | Power | a ^ b |
| @ | Log | a @ b | Change of base. `a` is the base term. Equivalent to `ln(b) / ln(a)`.

| Char | Desc | Notes |
| ---- | ---- | ----- |
| x | User input | Can be used multiple times in an expression.
| e | Euler's number | ~`2.71828183`
| () | Parentheses | Left parentheses must have matching right parentheses, or the RPN evaluator could fail.

### Run test

To run specifically any edited files, like `energy.test.ts`, do `run vitest energy`. 

For all test files in this project, do `npx vitest run`.

(If `/src/generated/` files are missing, run `python compile.py` first.)