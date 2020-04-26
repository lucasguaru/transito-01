class Semaforo {
    constructor(ctx, tempoAberto, tempoFechado, iniciarAberto, lag, left, top) {
        this.ctx = ctx;
        this.left = left;
        this.top = top;
        this.width = 24;
        this.height = 64;
        this.tempoAberto = tempoAberto;
        this.tempoFechado = tempoFechado;
        this.tempoAmarelo = 2;
        this.iniciarAberto = iniciarAberto;
        let instancia = this;
        instancia.status = 'VERMELHO';

        this.FPS = 60;
        this.contTempoVermelho = lag * this.FPS - 1;
        this.contTempoAmarelo = this.tempoAmarelo * this.FPS - 1;
        this.contTempoVerde = this.tempoAberto * this.FPS - 1;
        // this.contTempoVermelho = this.tempoFechado * this.FPS;
        // this.contTempoAmarelo = this.tempoAmarelo * this.FPS;
        // this.contTempoVerde = this.tempoAberto * this.FPS;
        
        // setTimeout(() => {
        //     if (iniciarAberto === true) {
        //         instancia.status = 'VERDE';
        //         agendarFechar();
        //     } else {
        //         instancia.status = 'VERMELHO';
        //         agendarAbrir();
        //     }
        // }, (lag || 0) * 1000);

        // function agendarFechar() {
        //     setTimeout(() => {
        //         instancia.status = 'AMARELO';
        //         setTimeout(() => {
        //             instancia.status = 'VERMELHO';
        //             agendarAbrir();
        //         }, 2000);
        //     }, tempoAberto * 1000);
        // }

        // function agendarAbrir() {
        //     setTimeout(() => {
        //         instancia.status = 'VERDE';
        //         agendarFechar();
        //     }, tempoFechado * 1000);
        // }
    }

    atualizar() {
        if (this.status == 'VERMELHO') {
            if (--this.contTempoVermelho <= 0) {
                this.contTempoVermelho = this.tempoFechado * this.FPS - 1;
                this.status = 'VERDE';
            }
        } else if (this.status == 'AMARELO') {
            if (--this.contTempoAmarelo <= 0) {
                this.contTempoAmarelo = this.tempoAmarelo * this.FPS - 1;
                this.status = 'VERMELHO';
            }
        } else {
            if (--this.contTempoVerde <= 0) {
                this.contTempoVerde = this.tempoAberto * this.FPS - 1;
                this.status = 'AMARELO';
            }
        }
    }

    desenhar() {
        let left = this.left;
        let top = this.top;
        let width = this.width;
        let height = this.height;
        let semTextLeft = left + 11;
        let semTextTop = top - 12;
        let tempoRestante = 0;

        draw.drawRect(left, top, width, height, 1, 'white');
        
        if (this.status == 'VERMELHO') {
            draw.drawCircle(left + 12, top + 12, 7, 1, 'black', 'red');
            tempoRestante = parseInt(this.contTempoVermelho / this.FPS);
        } else if (this.status == 'AMARELO') {
            draw.drawCircle(left + 12, top + 32, 7, 1, 'black', 'yellow');
            tempoRestante = parseInt(this.contTempoAmarelo / this.FPS);
        } else {
            draw.drawCircle(left + 12, top + 52, 7, 1, 'black', 'green');
            tempoRestante = parseInt(this.contTempoVerde / this.FPS);
        }
        draw.drawText(tempoRestante + 1, semTextLeft, semTextTop);
    }
}