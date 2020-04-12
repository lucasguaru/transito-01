class Cenario {
    constructor(ctx) {
        this.ctx = ctx;
        let top = (ALTURA / 2 - 80);
        this.top = top;
        this.pista = new Pista(ctx, top);
        this.carros = [];
        this.maxSpeed = 2;
        this.contFrames = 0;
        this.maxFramesMinimo = 20;
        this.maxFramesMaximo = 30;
        this.maxFrames = this.maxFramesMinimo + Math.floor(Math.random() * this.maxFramesMaximo);
        this.pistas = [[], [], []];
    }

    removerCarro(carro, idPista) {
        let carros = this.pistas[idPista];
        carros.shift();
    }

    distProximoCarro(carro, idPista) {
        let carros = this.pistas[idPista];
        for (let i = 0; i < carros.length; i++) {
            if (carros[i] === carro) {
                if (i == 0) {
                    return 1000;
                }
                const carroAnterior = carros[i - 1];
                return carroAnterior.left - carro.left - carroAnterior.width;
            }
        }
    }

    atualizar() {
        this.contFrames++;
        if (this.contFrames > this.maxFrames) {
            this.maxSpeed += 0.1;
            this.maxFramesMinimo--;
            this.maxFramesMaximo--;
            if (this.maxFramesMinimo < 10) {
                this.maxFramesMinimo = 10
            }
            if (this.maxFramesMaximo < 10) {
                this.maxFramesMaximo = 10
            }
            this.contFrames = 0;
            let idPista = Math.floor(Math.random() * 3);
            while (idPista == this.lastIdPista) {
                idPista = Math.floor(Math.random() * 3);
            }
            this.lastIdPista = idPista;
            let distPista = 30;
            this.pistas[idPista].push(new Carro(this.ctx, this, idPista, 50, this.top + 7 + (distPista * idPista), this.maxSpeed));
            this.stopAddingCar = true;
            this.maxFrames = this.maxFramesMinimo + Math.floor(Math.random() * this.maxFramesMaximo);
        }
        this.pistas.forEach(carros => {
            carros.forEach(carro => {
                carro.atualizar();
            })
        });
    }

    desenhar() {
        this.pista.desenhar();
        this.pistas.forEach(carros => {
            carros.forEach(carro => {
                carro.desenhar();
            })
        });
    }
}