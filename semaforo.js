class Semaforo {
    constructor(ctx, tempoAberto, tempoFechado, iniciarAberto, lag) {
        this.ctx = ctx;
        this.tempoAberto = tempoAberto;
        this.tempoFechado = tempoFechado;
        this.iniciarAberto = iniciarAberto;
        let instancia = this;
        instancia.status = 'VERMELHO';
        
        setTimeout(() => {
            if (iniciarAberto === true) {
                instancia.status = 'VERDE';
                agendarFechar();
            } else {
                instancia.status = 'VERMELHO';
                agendarAbrir();
            }
        }, (lag || 0) * 1000);        

        function agendarFechar() {
            setTimeout(() => {
                instancia.status = 'AMARELO';
                setTimeout(() => {
                    instancia.status = 'VERMELHO';
                    agendarAbrir();
                }, 2000);
            }, tempoAberto * 1000);
        }

        function agendarAbrir() {
            setTimeout(() => {
                instancia.status = 'VERDE';
                agendarFechar();
            }, tempoFechado * 1000);
        }

        
    }

    desenhar(left, top) {
        draw.drawRect(left, top, 24, 64, 1, 'white');
        
        if (this.status == 'VERMELHO') {
            draw.drawCircle(left + 12, top + 12, 7, 1, 'black', 'red');
        } else if (this.status == 'AMARELO') {
            draw.drawCircle(left + 12, top + 32, 7, 1, 'black', 'yellow');
        } else {
            draw.drawCircle(left + 12, top + 52, 7, 1, 'black', 'green');
        }
    }
}