import type { CategoryData } from "../data/constants.ts";

export const weight: CategoryData = {
    label: 'Weight',
    initialUnits: {
        from: 'kilogram', 
        to: 'pound'
    },
    unitGroups: [
        {
            label: 'Metric',
            units: {
                gram: {
                    singular: 'Gram',
                    plural: 'Grams',
                    toBase: 'x * 0.001',
                    fromBase: 'x * 1000',
                    abbr: 'g',
                    desc: 'Originally defined as the mass of one cubic centimeter of water.',
                    lastCheck: '3/9/2026',
                },
                kilogram: {
                    singular: 'Kilogram',
                    plural: 'Kilograms',
                    toBase: 'x * 1',
                    fromBase: 'x * 1',
                    abbr: 'kg',
                    desc: 'A kilogram is the International System of Units (SI) base unit of mass, defined by taking the fixed numerical value of the Planck constant when expressed in the unit J * s (kg * m^2 * s^-1). Who the heck finds this?',
                    lastCheck: '3/9/2026',
                },
                tonne: {
                    singular: 'Tonne',
                    plural: 'Tonnes',
                    toBase: 'x * 1000',
                    fromBase: 'x / 1000',
                    abbr: 't',
                }
            }
        },
        {
            label: 'Imperial',
            units: {
                ounce: {
                    singular: 'Ounce',
                    plural: 'Ounces',
                    toBase: 'x * 0.0625 * 0.453592',
                    fromBase: 'x * 2.20462 * 16',
                    abbr: 'oz',
                    desc: 'Not to be confused with troy ounces (used for precious metals) and fluid ounces (volume), the regular ounce is used to measure the weight of standard everyday items, like paperclips.',
                    lastCheck: '3/9/2026',
                },
                pound: {
                    singular: 'Pound',
                    plural: 'Pounds',
                    toBase: 'x * 0.453592',
                    fromBase: 'x * 2.20462',
                    abbr: 'lb',
                }
            }
        },
        {
            label: 'Informal Units',
            units: {
                slug: {
                    singular: 'Slug',
                    plural: 'Slugs',
                    toBase: 'x * 14.5939',
                    fromBase: 'x / 14.5939',
                },
                bagCement: {
                    singular: 'Bag of Cement',
                    plural: 'Bags of Cement',
                    toBase: 'x * 43',
                    fromBase: 'x / 43',
                    desc: 'According to the American Concrete Institute, a bag of cement is 43 kg in the United States. There are other kinds of cement but I have no idea how much they weigh.',
                    source: 'https://www.concrete.org/frequentlyaskedquestions.aspx?faqid=866',
                    lastCheck: '3/9/2026',
                }
            }
        },
        {
            label: 'Absolute Units',
            units: {
                daniel: {
                    singular: 'Daniel',
                    plural: 'Daniels',
                    toBase: '( (2.71 ^ (x * 10)) - (2.71 ^ (-1 * x * 10)) ) * 0.5',
                    fromBase: '( 2.71 @ (x + ((x ^ 2 + 1) ^ 0.5)) ) * 0.1',
                    desc: 'One of my college roommates, fattest guy I've ever seen fr',
                    lastCheck: '3/9/2026',
                }
            }
        }
    ]
};