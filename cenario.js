class Cenario {
    constructor(ctx) {
        this.ctx = ctx;
        let top = (ALTURA / 2 - 80);
        this.top = top;
        this.qtdePistas = 3;
        this.pista = new Pista(ctx, top, this.qtdePistas, [390, 1000, 1320]);
        this.carros = [];
        this.maxSpeed = 1;
        this.contFrames = 0;
        this.maxFramesMinimo = 15;
        this.maxFramesMaximo = 15;
        this.maxFrames = this.maxFramesMinimo + Math.floor(Math.random() * this.maxFramesMaximo);
        this.pistas = [];
        for (let i = 0; i < this.qtdePistas; i++) {
            this.pistas.push([]);
        }
        this.sensores1 = new Sensores(ctx, this, this.qtdePistas, 420, 540, top, 'yellow', '#555533', true);
        this.sensores2 = new Sensores(ctx, this, this.qtdePistas, 530, 1060, top);
    }

    fecharSemaforo(index) {
        this.pista.fecharSemaforo(index);
    }

    voltarEstado(qtde) {
        this.pistas.forEach(pista => {
            pista.forEach(carro => carro.voltarEstado(qtde));
        });
        this.pista.voltarEstado(qtde);
        this.sensores1.voltarEstado(qtde);
        this.sensores2.voltarEstado(qtde);
    }

    adiantarEstado(qtde) {
        this.pistas.forEach(pista => {
            pista.forEach(carro => carro.adiantarEstado(qtde));
        });
        this.pista.adiantarEstado(qtde);
        this.sensores1.adiantarEstado(qtde);
        this.sensores2.adiantarEstado(qtde);
    }

    getCarros(x0, x1) {
        let carros = [];
        this.pistas.forEach(pista => {
            let carrosTemp = pista.filter(carro => temColisaoX(carro, x0, x1));
            carros = carros.concat(carrosTemp);
        });

        return carros;
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

    podeAdicionarCarro(idPista) {
        if (this.pistas[idPista].length <= 5) {
            return true;
        }
        if (this.getCarro(idPista, -3).left > 50) {
            return true;
        }
    }

    getCarro(idPista, pos) {
        return this.pistas[idPista][this.pistas[idPista].length + pos];
    }

    atualizar() {
        this.pista.atualizar();
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
            if (idPista == this.lastIdPista) {
                idPista = (idPista + 1) % this.qtdePistas;
            }
            this.lastIdPista = idPista;
            let distPista = 30;
            if (this.podeAdicionarCarro(idPista)) {
                this.pistas[idPista].push(new Carro(this.ctx, this, idPista, 50, this.top + 4 + (distPista * idPista), this.maxSpeed));
            } else {
                //Tenta na próxima pista
                idPista = (idPista + 1) % this.qtdePistas;
                if (this.podeAdicionarCarro(idPista)) {
                    this.pistas[idPista].push(new Carro(this.ctx, this, idPista, 50, this.top + 4 + (distPista * idPista), this.maxSpeed));
                }
            }
            this.stopAddingCar = true;
            this.maxFrames = this.maxFramesMinimo + Math.floor(Math.random() * this.maxFramesMaximo);
        }
        this.pistas.forEach(carros => {
            carros.forEach(carro => {
                carro.atualizar();
            })
        });
        this.sensores1.atualizar();
        this.sensores2.atualizar();
    }

    desenhar() {
        this.pista.desenhar();
        this.sensores1.desenhar();
        this.sensores2.desenhar();
        this.pistas.forEach(carros => {
            carros.forEach(carro => {
                carro.desenhar();
            })
        });
    }
}