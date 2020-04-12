class Carro {
    constructor(ctx, cenario, idPista, left, top, maxSpeed) {
        this.ctx = ctx;
        this.cenario = cenario;
        this.idPista = idPista;
        this.left = left;
        this.top = top;
        this.CAR_COLORS = ['white', 'red', 'green', 'blue', 'lightblue', 'lightgreen'];
        this.cor = this.getRandom(this.CAR_COLORS);
        this.contFrames = 0;
        this.maxFrames = 50;
        this.width = 40;
        this.height = 15

        this.speed = 0;
        this.aceleration = 0.02;
        this.maxSpeed = maxSpeed + (maxSpeed * Math.random());
    }

    atualizar() {
        // if (this.contFrames++ > this.maxFrames) {
            let dist = this.cenario.distProximoCarro(this, this.idPista);
            // console.log(dist);
            this.contFrames = 0;
            if (dist < 20) {
                this.muitoPerto = true;
                this.speed -= this.aceleration * 2;
                if (this.speed < 0) {
                    this.speed = 0;
                }
                // this.maxSpeed = this.maxSpeed * 0.995;
            } else {
                this.muitoPerto = false;
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
        draw.drawRect(this.left, this.top, this.width, this.height, 1, this.cor, this.cor);
    }

    getRandom(array) {
        let i = Math.floor(Math.random() * array.length);
        return array[i];
    }
}