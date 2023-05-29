import { tick } from "svelte";
import { rand } from "./util";

export type CachedImage = {
    w: number,
    h: number,
    data: ImageData
}

export type Context = CanvasRenderingContext2D;


export async function drawCircles(context: Context, width: number, height: number, radius: number, spacing: number): Promise<CachedImage> {
    
    context.strokeStyle = '#123abc';

    for (let i = 0; i < width; i += spacing) {
        drawCircle(context, i, rand(0, height / spacing) * spacing, rand(radius-1, radius+5), "turquoise");
        drawCircle(context, i, rand(0, height / spacing) * spacing, rand(radius-1, radius+5), "teal");
        drawCircle(context, i, rand(0, height / spacing) * spacing, rand(radius-1, radius+5), "salmon");
        drawCircle(context, i, rand(0, height / spacing) * spacing, rand(radius-1, radius+5), "gold");
        drawCircle(context, i, rand(0, height / spacing) * spacing, rand(radius-1, radius+5), "cornflowerblue");
    }

    await tick();

    const data = context.getImageData(0, 0, width, width);

    return { w: width, h: height, data };
}

function drawCircle(context: Context, x: number, y: number, r: number, color: string) {
    context.fillStyle = color;
    context.beginPath();
    context.ellipse(x, y, r, r, 0, 0, 2 * Math.PI, );
    context.fill();
    context.closePath();
}