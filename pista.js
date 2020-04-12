class Pista {
    constructor(ctx) {
        this.ctx = ctx;
        this.faixa = new Faixa(ctx);
        this.semaforo1 = new Semaforo(ctx, 5, 10, false, 3);
        this.semaforo2 = new Semaforo(ctx, 5, 10, false);
    }

    desenhar() {
        let top = (ALTURA / 2 - 80);
        let height = top + 90;
        let linhaLat1 = top;
        let linhaLat2 = height;
        draw.drawLine(50, linhaLat1, LARGURA - 60, linhaLat1, 3, 'white');
        draw.drawLine(50, linhaLat2, LARGURA - 60, linhaLat2, 3, 'white');

        let linhaFaixa1 = linhaLat1 + 30;
        let linhaFaixa2 = linhaFaixa1 + 30;
        
        draw.drawLine(50, linhaFaixa1, 420, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(50, linhaFaixa2, 420, linhaFaixa2, 2, 'white', [40, 25]);
        this.faixa.desenhar(430, top, height);
        this.semaforo1.desenhar(390, top - 75);

        draw.drawLine(530, linhaFaixa1, 1050, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(530, linhaFaixa2, 1050, linhaFaixa2, 2, 'white', [40, 25]);
        this.faixa.desenhar(1040, top, height);
        this.semaforo2.desenhar(1000, top - 75);

        draw.drawLine(1140, linhaFaixa1, LARGURA - 60, linhaFaixa1, 2, 'white', [40, 25]);
        draw.drawLine(1140, linhaFaixa2, LARGURA - 60, linhaFaixa2, 2, 'white', [40, 25]);

    }
}