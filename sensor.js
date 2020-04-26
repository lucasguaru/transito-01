class Sensor {
    constructor(ctx, left, top, activeColor, fillActiveColor) {
        this.ctx = ctx;
        this.left = left;
        this.top = top;
        this.width = 20;
        this.height = 20;
        this.color = '#4d4d4d';
        this.fillColor = undefined;
        this.activeColor = activeColor || '#ff6666';
        this.fillActiveColor = fillActiveColor || '#553333';
    }

    desativar() {
        this.color = '#4d4d4d';
        this.fillColor = undefined;
    }

    ativar() {
        this.color = this.activeColor;
        this.fillColor = this.fillActiveColor;
    }

    atualizar() {
        // this.contFrames++;
    }

    desenhar() {
        draw.drawRect(this.left, this.top, this.width, this.height, 1, this.color, this.fillColor);
    }
}