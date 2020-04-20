class Pista {
    constructor(ctx, top, qtdeFaixas, arrSemaforos) {
        this.ctx = ctx;
        this.top = top;
        this.qtdeFaixas = qtdeFaixas;
        this.faixas = [];
        this.semaforos = [];

        let tempoSemaforo = [[10, 4, 5], [10, 4, 2], [8, 4, 0]];

        //arrSemaroforos tem os X's de onde os semaforos serao colorados
        for (let i = 0; i < arrSemaforos.length; i++) {
            const semaforoCfg = arrSemaforos[i];
            this.semaforos.push(new Semaforo(ctx, tempoSemaforo[i][0], tempoSemaforo[i][1], true, tempoSemaforo[i][2], semaforoCfg, 196));
            this.faixas.push(new Faixa(ctx, semaforoCfg + 40, top, top + 90));
        }
    }

    desenhar() {
        var ESPACO_ENTRE_PISTAS = 30;
        let top = this.top;
        let height = top + ESPACO_ENTRE_PISTAS * this.qtdeFaixas;
        let linhaLat1 = top;
        let linhaLat2 = height;
        draw.drawLine(50, linhaLat1, LARGURA - 60, linhaLat1, 3, 'white');
        draw.drawLine(50, linhaLat2, LARGURA - 60, linhaLat2, 3, 'white');

        if (this.semaforos.length == 0) {
            desenharFaixaEntrePistas(this.qtdeFaixas, top, 50, LARGURA);
        } else {
            let faixaEntrePistasX = 50;
            for (let i = 0; i < this.semaforos.length; i++) {
                let faixa = this.faixas[i];              
                desenharFaixaEntrePistas(this.qtdeFaixas, top, faixaEntrePistasX, faixa.left - 10);
                this.semaforos[i].desenhar();
                this.faixas[i].desenhar();              
                faixaEntrePistasX = faixa.left + 100;  
            }
        }

        function desenharFaixaEntrePistas(qtde, topPista, x0, x1) {
            for (let i = 1; i <= qtde; i++) {
                let topFaixa = topPista + i * ESPACO_ENTRE_PISTAS;
                draw.drawLine(x0, topFaixa, x1, topFaixa, 2, 'white', [40, 25]);
            }
        }

    }
}