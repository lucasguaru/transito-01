class Sensor extends Estado {
    constructor(ctx, left, top, activeColor, fillActiveColor) {
        super();
        this.ctx = ctx;
        this.left = left;
        this.top = top;
        this.width = 20;
        this.height = 20;
        this.activeColor = activeColor || '#ff6666';
        this.fillActiveColor = fillActiveColor || '#553333';
        this.ativo = false;
    }

    desativar() {
        this.ativo = false;
    }

    ativar() {
        this.ativo = true;
    }

    atualizar() {       
        this.manterEstado();
    }

    desenhar() {
        if (this.ativo) {
            draw.drawRect(this.left, this.top, this.width, this.height, 1, this.activeColor, this.fillActiveColor);
        } else {
            draw.drawRect(this.left, this.top, this.width, this.height, 1, '#4d4d4d');
        }
    }
}