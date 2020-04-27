class Semaforo extends Estado {
    constructor(ctx, tempoAberto, tempoFechado, iniciarAberto, lag, left, top) {
        super(false); //nao voltar o left do semaforo se nao tiver "estado"
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

        this.contTempoVermelho = lag * FPS - 1;
        this.contTempoAmarelo = this.tempoAmarelo * FPS - 1;
        this.contTempoVerde = this.tempoAberto * FPS - 1;
    }

    fechar() {
        if (this.status == 'VERMELHO') {
            this.contTempoVermelho += FPS; //Adiciona 1 segundo
        } else if (this.status == 'VERDE') {
            this.contTempoVerde = this.tempoAberto * FPS - 1;
            this.status = 'AMARELO';
        }
    }

    atualizar() {
        if (this.status == 'VERMELHO') {
            if (--this.contTempoVermelho <= 0) {
                this.contTempoVermelho = this.tempoFechado * FPS - 1;
                this.status = 'VERDE';
            }
        } else if (this.status == 'AMARELO') {
            if (--this.contTempoAmarelo <= 0) {
                this.contTempoAmarelo = this.tempoAmarelo * FPS - 1;
                this.status = 'VERMELHO';
            }
        } else {
            if (--this.contTempoVerde <= 0) {
                this.contTempoVerde = this.tempoAberto * FPS - 1;
                this.status = 'AMARELO';
            }
        }
        this.manterEstado(FPS);
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
            tempoRestante = parseInt(this.contTempoVermelho / FPS);
        } else if (this.status == 'AMARELO') {
            draw.drawCircle(left + 12, top + 32, 7, 1, 'black', 'yellow');
            tempoRestante = parseInt(this.contTempoAmarelo / FPS);
        } else {
            draw.drawCircle(left + 12, top + 52, 7, 1, 'black', 'green');
            tempoRestante = parseInt(this.contTempoVerde / FPS);
        }
        draw.drawText(tempoRestante + 1, semTextLeft, semTextTop);
    }
}