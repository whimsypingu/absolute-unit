import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useState,
} from 'react';

interface BunniesProps {
    count: number
}
export function Bunnies(
    { count }: BunniesProps
) {
const [texture, setTexture] = useState<Texture | null>(null);
    // Load once
    useEffect(() => {
        Assets.load('../../public/apple-touch-icon.png').then(setTexture);
    }, []);

    if (!texture) return null;

    return (
        <>
        {Array.from({ length: count }).map((_, i) => (
            <pixiSprite
                key={i}
                texture={texture}
                anchor={0.5}
                x={(i % 10) * 40} // Simple grid layout
                y={Math.floor(i / 10) * 40}
            />
        ))}
        </>
    );
}
