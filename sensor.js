class Sensor {
    constructor(ctx, left, top) {
        this.ctx = ctx;
        this.left = left;
        this.top = top;
        this.width = 20;
        this.height = 20;
        this.cor = '#4d4d4d';
    }

    desativar() {
        this.cor = '#4d4d4d';
    }

    ativar() {
        this.cor = '#ff6666';
    }

    atualizar() {
        // this.contFrames++;
    }

    desenhar() {
        draw.drawRect(this.left, this.top, this.width, this.height, 1, this.cor);
    }
}