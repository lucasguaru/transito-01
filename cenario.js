class Cenario {
    constructor(ctx) {
        this.ctx = ctx;
        let top = (ALTURA / 2 - 80);
        this.pista = new Pista(ctx, top);
        this.carros = [];
        this.carros.push(new Carro(ctx, 50, top + 7));
    }

    atualizar() {
        this.carros.forEach(carro => {
            carro.atualizar();
        });
    }

    desenhar() {
        this.pista.desenhar();
        this.carros.forEach(carro => {
            carro.desenhar();
        });
    }
}