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
    },

    drawImage(let, top, width, height, color) {
        const imgs = new Image();
        imgs.src = './assets/cars.png'

        switch (color) {
            case "red":
                ctx.drawImage(
                    imgs,
                    4, 0,
                    52, 25,
                    let , top,
                    width, height
                )
                break;
            case "white":
                ctx.drawImage(
                    imgs,
                    0, 32,
                    68, 26,
                    let , top,
                    width, height
                )
                break;
            case "orange":
                ctx.drawImage(
                    imgs,
                    0, 72,
                    82, 31,
                    let , top,
                    width, height
                )
                break;
            case "brown":
                ctx.drawImage(
                    imgs,
                    0, 116,
                    72, 38,
                    let , top,
                    width, height
                )
                break;
            case "yellow":
                ctx.drawImage(
                    imgs,
                    0, 170,
                    72, 37,
                    let , top,
                    width, height
                )
                break;
            default:
                break;
        }
    },
    

    drawCar(left, top, width, height, color, speed, dist) {
        const imgs = new Image();
        imgs.src = './assets/cars.png'

        let cars = {
            "red": [4, 0, 52, 25],
            "white": [0, 32, 68, 26],
            "orange": [0, 72, 82, 31],
            "brown": [0, 116, 72, 38],
            "yellow": [0, 170, 72, 37]
        };

        let car = cars[color];

        ctx.drawImage(
            imgs,
            car[0], car[1], car[2], car[3],
            left, top, width, height
        )

        ctx.font = "12px Arial";
        ctx.fillStyle = 'white';
        let speedText = speed + "";
        if (speedText.length > 5) {
            speedText = speedText.substr(0, 5);
        }
        
        let distText = (dist || "") + "";
        if (distText.length > 5) {
            distText = distText.substr(0, 5);
        }
        speedText += " | " + distText;
        // ctx.fillText(speedText, left, top + 10);
    }
};