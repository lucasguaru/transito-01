class Carro {
    constructor(ctx, cenario, idPista, left, top, maxSpeed) {
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
        this.width = 40;
        this.height = 15

        this.speed = 0;
        this.aceleration = 0.06;
        this.maxSpeed = maxSpeed + (maxSpeed * Math.random());
    }

    atualizar() {
        // if (this.contFrames++ > this.maxFrames) {
            let dist = this.cenario.distProximoCarro(this, this.idPista);
            // console.log(dist);
            this.contFrames = 0;
            const DIST_BREAK_SEMAFORO = 40;
            const DIST_BREAK = 30;
            if (dist > DIST_BREAK) {
                this.muitoPerto = false;
                
                let semaforo = this.cenario.getProximoSemaforo(this, DIST_BREAK_SEMAFORO);
                if (semaforo) {
                    let semafDist = semaforo.left + semaforo.width - (this.left + this.width);
                    if (semafDist < DIST_BREAK_SEMAFORO && this.speed > 0) {
                        if (semaforo.status == 'VERMELHO') {                    
                            let mult = (DIST_BREAK_SEMAFORO - semafDist) / 3;
                            this.speed -= this.aceleration * mult;
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
        if (!this.muitoPerto) {
            this.speed += this.aceleration;
        }
        // this.speed = 0.3;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        this.left += this.speed;
        if (this.left > LARGURA - 70) {
            this.cenario.removerCarro(this, this.idPista);
        }
    }

    desenhar() {
        draw.drawImage(this.left, this.top, this.width, this.height, this.cor);
        // draw.drawRect(this.left, this.top, this.width, this.height, 1, this.cor, this.cor);
    }

    getRandom(array) {
        let i = Math.floor(Math.random() * array.length);
        return array[i];
    }
}