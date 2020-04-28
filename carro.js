class Carro extends Estado {
    constructor(ctx, cenario, idPista, left, top, maxSpeed) {
        super();
        this.ctx = ctx;
        this.cenario = cenario;
        this.idPista = idPista;
        this.left = left;
        this.top = top;
        // this.CAR_COLORS = ['white', 'red', 'green', 'blue', 'lightblue', 'lightgreen'];
        this.CAR_COLORS = ['white', 'red', 'yellow', 'brown', 'orange'];
        this.cor = this.getRandom(this.CAR_COLORS);
        this.contFrames = 0;
        this.maxFrames = 50;
        this.width = 50;
        this.height = 20

        this.speed = 0;
        this.aceleration = 0.06;
        this.maxSpeed = maxSpeed + (maxSpeed * Math.random());
    }

    atualizar() {
        // if (this.contFrames++ > this.maxFrames) {
            let dist = this.cenario.distProximoCarro(this, this.idPista);
            this.dist = dist;
            const DIST_BREAK_SEMAFORO = 40;
            const DIST_BREAK = 30;
            this.sinalFechado = false;
            if (dist > DIST_BREAK) {
                this.muitoPerto = false;
                
                let semaforo = this.cenario.getProximoSemaforo(this, DIST_BREAK_SEMAFORO);
                if (semaforo) {
                    let semafDist = semaforo.left + semaforo.width - (this.left + this.width);
                    if (semafDist < this.dist) {
                        this.dist = semafDist;
                    }
                    if (semafDist < DIST_BREAK_SEMAFORO) {
                        if (semaforo.status == 'VERMELHO') {
                            this.sinalFechado = true;
                            if (this.speed > 0) {
                                let mult = (DIST_BREAK_SEMAFORO - semafDist) / 3;
                                let desaceleracao = this.aceleration * mult;
                                this.speed -= desaceleracao;
                            }
                        }
                    }
                }
            } else {
                this.muitoPerto = true;
                if (dist <= 2) {
                    this.speed = 0;
                } else {
                    let mult = (DIST_BREAK - dist) / 3;
                    this.speed -= this.aceleration * mult;
                    if (this.speed < 0) {
                        this.speed = 0;
                    }
                }
            
            }
            
            if (this.speed < 0) {
                this.speed = 0;
            }
        // }
        if (!this.muitoPerto  && !this.sinalFechado) {
            this.speed += this.aceleration;
        }
        // this.speed = 0.3;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        this.left += this.speed;
        if (this.left > LARGURA + 300) {
            this.cenario.removerCarro(this, this.idPista);
        }
        this.manterEstado();
    }

    desenhar() {
        if (this.left < LARGURA - 70) {
            draw.drawCar(this.left, this.top, this.width, this.height, this.cor, this.speed, this.dist);
        }
        // draw.drawRect(this.left, this.top, this.width, this.height, 1, this.cor, this.cor);
    }

    getRandom(array) {
        let i = Math.floor(Math.random() * array.length);
        return array[i];
    }
}