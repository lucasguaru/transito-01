class Carro {
    constructor(ctx, left, top) {
        this.ctx = ctx;
        this.left = left;
        this.top = top;
        this.CAR_COLORS = ['white', 'red', 'green', 'blue', 'lightblue', 'lightgreen'];
        this.cor = this.getRandom(this.CAR_COLORS);
    }

    atualizar() {

    }

    desenhar() {
        draw.drawRect(this.left, this.top, 40, 15, 1, this.cor, this.cor);
    }

    getRandom(array) {
        let i = Math.floor(Math.random() * array.length);
        return array[i];
    }
}