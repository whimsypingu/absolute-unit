import { useEffect, useRef } from "react"

interface NativeCanvasCompareProps {
    conversionCategory: 'length' | 'weight';
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!container || !canvas || !ctx) return;
    
        // 1. Prepare images (Consider caching these outside useEffect if you want perfection)
        const loadImages = async () => {
            const [img1, img2] = await Promise.all([
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src1; }),
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src2; })
            ]);
            
            // 2. Define the draw function locally so it has access to images
            const draw = () => {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (conversionCategory === 'length') {
                    for (let i = 0; i < cnt1; i++) ctx.drawImage(img1, 0, i * 50, 50, 50);
                    for (let i = 0; i < cnt2; i++) ctx.drawImage(img2, 100, i * 50, 50, 50);
                }
            };

            // 3. Resize handler that also triggers a draw
            const handleResize = () => {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                draw();
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial draw

            return () => window.removeEventListener('resize', handleResize);
        };

        const cleanup = loadImages();
        return () => { cleanup.then(fn => fn && fn()); };
    }, [src1, cnt1, src2, cnt2, conversionCategory, backgroundColor]);
    
    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '0.5rem' }} />
        </div>
    );
}

