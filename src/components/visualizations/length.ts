export const drawLengthVerticalComparison = async (
    ctx: CanvasRenderingContext2D, 
    img1: HTMLImageElement, 
    cnt1: number, 
    img2: HTMLImageElement, 
    cnt2: number
): Promise<void> => {
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
    let anchorW = anchorImg.width
    let anchorH = anchorImg.height

    let targetH = anchorH * (anchorCnt / targetCnt); //targetH * targetCnt = anchorH * anchorCnt
    let targetW = targetH * (targetImg.width / targetImg.height);

    // console.table({
    //     anchor_orig: {width: anchorImg.width, height: anchorImg.height },
    //     anchor_pre: { width: anchorW, height: anchorH },
    //     target_orig: {width: targetImg.width, height: targetImg.height },
    //     target_pre: { width: targetW, height: targetH }
    // });

    const maxW = canvasW * 0.4;
    const maxH = canvasH * 0.75;

    const scaleW = maxW / Math.max(anchorW, targetW); //max(anchorW, targetW) * scaleW = maxW
    const scaleH = maxH / Math.max(anchorH, targetH);

    const scaleFit = canvasH / (anchorH * anchorCnt); //totalH * scaleFit = canvasH

    const globalScale = Math.min(scaleW, scaleH, scaleFit);

    anchorW *= globalScale;
    anchorH *= globalScale;
    targetW *= globalScale;
    targetH *= globalScale;

    // console.log(`globalScale: ${globalScale}`);
    // console.table({
    //     max: { width: maxW, height: maxH },
    //     scale: { width: scaleW, height: scaleH },
    //     anchor: { width: anchorW, height: anchorH },
    //     target: { width: targetW, height: targetH }
    // });

    //lod
    const useAnchorRect = anchorH <= MIN_PIXEL_HEIGHT;
    const useTargetRect = targetH <= MIN_PIXEL_HEIGHT;
    const maxAlpha = 0.4; //shading for density, higher density = less shading
    const minAlpha = 0.1;
    const saturation = 1000; //hit minAlpha in 1000items

    //mask to cut off any extra parts from Math.ceil() overshooting
    const cutoffY = Math.max(canvasH - (anchorCnt * anchorH), 0);

    console.log(`cutoffY: ${cutoffY}`);
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
}
