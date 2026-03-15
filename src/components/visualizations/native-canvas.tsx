import { useEffect, useRef } from "react"
import { drawLengthVerticalComparison } from "./length.ts";

const svgMap: Record<string, string> = import.meta.glob('../../src/assets/*.svg', { eager: true, query: '?url', import: 'default' });
console.log(svgMap);

const getPath = (filename: string) => svgMap[`../assets/${filename}.svg`];

interface NativeCanvasCompareProps {
    conversionCategory: string;
    src1: string;
    cnt1: number;
    src2: string;
    cnt2: number;
    backgroundColor?: string;
};

export const NativeCanvasCompare = ({ 
    conversionCategory, 
    src1, 
    cnt1, 
    src2, 
    cnt2,
    backgroundColor = '#ffffff'
}: NativeCanvasCompareProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null); //canvas
    const containerRef = useRef<HTMLDivElement>(null); //canvas parent element
    
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!container || !canvas || !ctx) return; //safety check
    
        // 1. Prepare images (Consider caching these outside useEffect if you want perfection)
        const loadImages = async () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //likely need a try block here
            let img1: HTMLImageElement;
            let img2: HTMLImageElement;
            try {
                [img1, img2] = await Promise.all([
                    new Promise<HTMLImageElement>((resolve, reject) => { 
                        const i = new Image(); 
                        i.onload = () => resolve(i);
                        i.onerror = () => reject(new Error(`Failed to load: ${src1}`));
                        
                        const path = getPath(src1);
                        if (!path) reject(new Error(`Path not found: ${src1}`));
                        i.src = path; 
                    }),
                    new Promise<HTMLImageElement>((resolve, reject) => { 
                        const i = new Image(); 
                        i.onload = () => resolve(i);
                        i.onerror = () => reject(new Error(`Failed to load: ${src2}`));
                        
                        const path = getPath(src2);
                        if (!path) reject(new Error(`Path not found: ${src2}`));
                        i.src = path; 
                     })
                ]);
            } catch (error) {
                console.error("Render aborted:", error);
                return;
            }
            
            // 2. Define a render function that calls a specific drawing strategy if available
            const render = async () => {
                if (isNaN(cnt1) || isNaN(cnt2)) return;

                const strategy = drawStrategies[conversionCategory as keyof typeof drawStrategies];

                if (strategy) {
                    await strategy(ctx, img1, cnt1, img2, cnt2);
                }
            };

            // 3. Resize handler that also triggers a draw
            const handleResize = () => {
                const dpr = window.devicePixelRatio || 1; //on mobile screens, dpr can be non-zero which leads to anti-aliasing
                canvas.width = container.clientWidth * dpr;
                canvas.height = container.clientHeight * dpr;

                canvas.style.width = `${container.clientWidth}px`; //set the element width correctly
                canvas.style.height = `${container.clientHeight}px`; 
                render();
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial draw

            return () => window.removeEventListener('resize', handleResize);
        };

        const cleanup = loadImages(); //return a cleanup to ensure removing event listener if one was attached
        return () => { cleanup.then(fn => fn && fn()); };
    }, [src1, cnt1, src2, cnt2, conversionCategory, backgroundColor]);
    
    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '0.5rem' }} />
        </div>
    );
}

const drawStrategies = {
    length: drawLengthVerticalComparison,
    weight: (ctx: CanvasRenderingContext2D, img1: HTMLImageElement, cnt1: number, img2: HTMLImageElement, cnt2: number) => {
        for (let i = 0; i < cnt1; i++) ctx.drawImage(img1, 0, i * 30, 30, 30);
        for (let i = 0; i < cnt2; i++) ctx.drawImage(img2, 100, i * 30, 30, 30);
        return;  
    }
}