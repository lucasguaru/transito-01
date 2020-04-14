class Pista {
    constructor(ctx, top) {
        this.ctx = ctx;
        this.top = top;
        this.faixa1 = new Faixa(ctx, 630, top, top + 90);
        this.faixa2 = new Faixa(ctx, 1040, top, top + 90);
        this.faixa3 = new Faixa(ctx, 1360, top, top + 90);
        this.semaforo1 = new Semaforo(ctx, 10, 4, true, 5, 590, 196);
        this.semaforo2 = new Semaforo(ctx, 10, 4, true, 2, 1000, 196);
        this.semaforo3 = new Semaforo(ctx, 8, 4, true, 0, 1320, 196);
        this.semaforos = [this.semaforo1, this.semaforo2, this.semaforo3];
    }

    desenhar() {
        let top = this.top;
        let height = top + 90;
        let linhaLat1 = top;
        let linhaLat2 = height;
        draw.drawLine(50, linhaLat1, LARGURA - 60, linhaLat1, 3, 'white');
        draw.drawLine(50, linhaLat2, LARGURA - 60, linhaLat2, 3, 'white');

        let linhaFaixa1 = linhaLat1 + 30;
        let linhaFaixa2 = linhaFaixa1 + 30;
        
        draw.drawLine(50, linhaFaixa1, 420, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(50, linhaFaixa2, 420, linhaFaixa2, 2, 'white', [40, 25]);
        this.faixa1.desenhar();
        // this.faixa.desenhar(430, top, height);
        this.semaforo1.desenhar();
        // this.semaforo1.desenhar(390, top - 75);

        draw.drawLine(530, linhaFaixa1, 1050, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(530, linhaFaixa2, 1050, linhaFaixa2, 2, 'white', [40, 25]);
        this.faixa2.desenhar();
        // this.faixa.desenhar(1040, top, height);
        this.semaforo2.desenhar();
        // this.semaforo2.desenhar(1000, top - 75);

        this.faixa3.desenhar();
        this.semaforo3.desenhar();

        draw.drawLine(1140, linhaFaixa1, LARGURA - 150, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(1140, linhaFaixa2, LARGURA - 150, linhaFaixa2, 2, 'white', [40, 25]);

    }
}