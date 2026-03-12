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

            //likely need a try block here
            const [img1, img2] = await Promise.all([
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src1; }),
                new Promise<HTMLImageElement>((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = src2; })
            ]);
            
            // 2. Define a render function that calls a specific drawing strategy if available
            const render = async () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (isNaN(cnt1) || isNaN(cnt2)) return;

                const strategy = drawStrategies[conversionCategory as keyof typeof drawStrategies];

                if (strategy) {
                    await strategy(ctx, img1, img2, cnt1, cnt2);
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
    length: async (ctx: CanvasRenderingContext2D, img1: HTMLImageElement, img2: HTMLImageElement, cnt1: number, cnt2: number) => {
        const canvasW = ctx.canvas.width;
        const canvasH = ctx.canvas.height;

        const MIN_PIXEL_HEIGHT = 2.0; //lod threshold

        // identify image anchor, the img with fewer items which means larger scale
        const isImg1Anchor = cnt1 <= cnt2;
        const anchorImg = isImg1Anchor ? img1 : img2;
        const anchorCnt = isImg1Anchor ? cnt1 : cnt2;

        const targetImg = isImg1Anchor ? img2 : img1;
        const targetCnt = isImg1Anchor ? cnt2 : cnt1;

        //define anchor dimensions capped by width
        const maxAnchorW = canvasW / 3;
        const anchorRatio = anchorImg.width / anchorImg.height;

        const anchorW = Math.min(maxAnchorW, canvasH / anchorCnt * anchorRatio);
        const anchorH = anchorW / anchorRatio;

        //scale target item relative to anchor
        const targetH = anchorH * (anchorCnt / targetCnt);
        const targetW = targetH * (targetImg.width / targetImg.height);

        //lod
        const useAnchorRect = anchorH <= MIN_PIXEL_HEIGHT;
        const useTargetRect = targetH <= MIN_PIXEL_HEIGHT;
        const maxAlpha = 0.4; //shading for density, higher density = less shading
        const minAlpha = 0.1;
        const saturation = 1000; //hit minAlpha in 1000items

        //mask to cut off any extra parts from Math.ceil() overshooting
        const cutoffY = canvasH - (anchorCnt * anchorH);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, cutoffY, canvasW, canvasH);
        ctx.clip(); //everything drawn after this is masked to keep stuff within the rect

        //draw
        const midPoint = canvasW * 0.5;
        const anchorCenter = midPoint - (anchorW * 0.5); //center the imgs on the axis
        const targetCenter = midPoint - (targetW * 0.5); 
        const midOffset = canvasW * 0.25;

        const anchorX = Math.round(isImg1Anchor ? anchorCenter - midOffset : anchorCenter + midOffset);
        const targetX = Math.round(isImg1Anchor ? targetCenter + midOffset : targetCenter - midOffset);

        //BENCHMARKING
        // const anchorStart = performance.now();

        //draw either low level lod or full images
        if (useAnchorRect) {
            let alpha = maxAlpha - (anchorCnt / saturation) * (maxAlpha - minAlpha);
            alpha = Math.max(minAlpha, alpha);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'black';
            ctx.fillRect(anchorX - 0.5, 0, 1, canvasH);

            ctx.globalAlpha = 1.0;
        } else {
            for (let i = 0; i < Math.ceil(anchorCnt); i++) {
                const anchorY = canvasH - ((i + 1) * anchorH);
                //ctx.drawImage(bitmap, anchorX, anchorY);
                ctx.drawImage(anchorImg, anchorX, anchorY, anchorW, anchorH);
            }
        }

        //BENCHMARKING
        // const anchorEnd = performance.now();

        if (useTargetRect) {
            let alpha = maxAlpha - (targetCnt / saturation) * (maxAlpha - minAlpha);
            alpha = Math.max(minAlpha, alpha);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'black';
            ctx.fillRect(targetX - 0.5, 0, 1, canvasH);
    
            ctx.globalAlpha = 1.0;
        } else {
            for (let i = 0; i < Math.ceil(targetCnt); i++) {
                const targetY = canvasH - ((i + 1) * targetH);
                //ctx.drawImage(bitmap, targetX, targetY);
                ctx.drawImage(targetImg, targetX, targetY, targetW, targetH);
            }
        }

        //BENCHMARKING
        // const targetEnd = performance.now();

        // console.table({
        //     "Total Time (ms)": (targetEnd - anchorStart).toFixed(2),
        //     "Anchor Prep/Draw (ms)": (anchorEnd - anchorStart).toFixed(2),
        //     "Target Prep/Draw (ms)": (targetEnd - anchorEnd).toFixed(2),
        // });

        ctx.restore(); //restore context so clip doesnt affect anything else
        return;
    },
    weight: (ctx: CanvasRenderingContext2D, img1: HTMLImageElement, img2: HTMLImageElement, cnt1: number, cnt2: number) => {
        for (let i = 0; i < cnt1; i++) ctx.drawImage(img1, 0, i * 30, 30, 30);
        for (let i = 0; i < cnt2; i++) ctx.drawImage(img2, 100, i * 30, 30, 30);
        return;  
    }
}