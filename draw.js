var draw = {
    drawLine(x, y, xTo, yTo, lineWidth, color, lineDash) {
        ctx.beginPath();
        ctx.setLineDash(lineDash || [1, 0])
        ctx.lineWidth = lineWidth || 1;
        ctx.moveTo(x, y);
        ctx.lineTo(xTo, yTo);
        ctx.strokeStyle = color || 'black';
        ctx.stroke();
    },
    
    drawRect(x, y, xTo, yTo, lineWidth, strokeStyle, fillStyle, lineDash) {
        ctx.beginPath();
        ctx.setLineDash(lineDash || [1, 0])
        ctx.lineWidth = lineWidth || 1;
        ctx.rect(x, y, xTo, yTo);
        ctx.strokeStyle = strokeStyle || 'black';
        if (fillStyle) {
            ctx.fillStyle = fillStyle || 'white';
            ctx.fill();
        }
        ctx.stroke();
    },
    
    drawCircle(x, y, raio, lineWidth, strokeStyle, fillStyle, lineDash) {
        ctx.beginPath();
        ctx.setLineDash(lineDash || [1, 0])
        ctx.lineWidth = lineWidth || 1;
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = strokeStyle || 'black';
        if (fillStyle) {
            ctx.fillStyle = fillStyle || 'white';
            ctx.fill();
        }
        ctx.stroke();
    }
};