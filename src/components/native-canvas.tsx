import { useEffect, useRef } from "react"

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
            const [img1, img2] = await Promise.all([
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src1; }),
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src2; })
            ]);
            
            // 2. Define a render function that calls a specific drawing strategy if available
            const render = () => {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const strategy = drawStrategies[conversionCategory as keyof typeof drawStrategies];
                if (strategy) strategy(ctx, img1, img2, cnt1, cnt2);
            };

            // 3. Resize handler that also triggers a draw
            const handleResize = () => {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
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
    length: (ctx: CanvasRenderingContext2D, img1: HTMLImageElement, img2: HTMLImageElement, cnt1: number, cnt2: number) => {
        const totalWidth = ctx.canvas.width;
        const totalHeight = ctx.canvas.height;

        const h1 = totalHeight / cnt1;
        const w1 = h1 * (img1.width / img1.height);
        const x1 = (totalWidth / 3) - (w1 * 0.5);

        const h2 = totalHeight / cnt2;
        const w2 = h2 * (img2.width / img2.height);
        const x2 = (totalWidth / 3 * 2) - (w2 * 0.5);

        for (let i = 0; i < cnt1; i++) {
            ctx.drawImage(img1, x1, i * h1, w1, h1);
        }
        for (let i = 0; i < cnt2; i++) {
            ctx.drawImage(img2, x2, i * h2, w2, h2);
        }
    },
    weight: ( ctx: CanvasRenderingContext2D, img1: HTMLImageElement, img2: HTMLImageElement, cnt1: number, cnt2: number) => {
        for (let i = 0; i < cnt1; i++) ctx.drawImage(img1, 0, i * 30, 30, 30);
        for (let i = 0; i < cnt2; i++) ctx.drawImage(img2, 100, i * 30, 30, 30);        
    }
}