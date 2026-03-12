import { Application, extend } from '@pixi/react';
import { useRef } from 'react';
import { Bunnies } from './bunny';

import {
    Container,
    Graphics,
    Sprite
} from 'pixi.js';
extend({
    Container,
    Graphics,
    Sprite
})

interface PixiGraphProps {
    count: number;
}
export const PixiGraph = (
    { count }: PixiGraphProps
) => {
    const parentRef = useRef(null);

    return (
        <div ref={parentRef}>
            <Application 
                resizeTo={parentRef}
                backgroundColor={0x828282}
                //backgroundAlpha={0}
            >
                <Bunnies 
                    count={count}
                />
            </Application>
        </div>
    );
};