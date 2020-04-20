class Cenario {
    constructor(ctx) {
        this.ctx = ctx;
        let top = (ALTURA / 2 - 80);
        this.top = top;
        this.qtdePistas = 3;
        this.pista = new Pista(ctx, top, this.qtdePistas, [390, 1000, 1320]);
        this.pista.semaforos
        this.carros = [];
        this.maxSpeed = 2;
        this.contFrames = 0;
        this.maxFramesMinimo = 15;
        this.maxFramesMaximo = 15;
        this.maxFrames = this.maxFramesMinimo + Math.floor(Math.random() * this.maxFramesMaximo);
        this.pistas = [];
        for (let i = 0; i < this.qtdePistas; i++) {
            this.pistas.push([]);
        }
    }

    removerCarro(carro, idPista) {
        let carros = this.pistas[idPista];
        carros.shift();
    }

    getProximoSemaforo(carro, dist) {
        dist = dist || 50;
        let semaforos = this.pista.semaforos;
        let semaforo = null;
        for (let i = 0; i < semaforos.length; i++) {
            let semaforoTemp = semaforos[i];
            let distCalc = semaforoTemp.left + semaforoTemp.width - (carro.left + carro.width);
            let temDist = distCalc > 0 && distCalc <= dist;
            if (temDist && (!semaforo || semaforoTemp.left < semaforo.left)) {
                semaforo = semaforoTemp;
            }
        }
        return semaforo;
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
            // this.maxSpeed += 0.1;
            // this.maxFramesMinimo--;
            // this.maxFramesMaximo--;
            if (this.maxFramesMinimo < 10) {
                this.maxFramesMinimo = 10
            }
            if (this.maxFramesMaximo < 10) {
                this.maxFramesMaximo = 10
            }
            this.contFrames = 0;
            let idPista = Math.floor(Math.random() * this.qtdePistas);
            while (idPista == this.lastIdPista) {
                idPista = Math.floor(Math.random() * this.qtdePistas);
            }
            this.lastIdPista = idPista;
            let distPista = 30;
            this.pistas[idPista].push(new Carro(this.ctx, this, idPista, 50, this.top + 4 + (distPista * idPista), this.maxSpeed));
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