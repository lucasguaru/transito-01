class Sensores {
    constructor(ctx, cenario, qtdePistas, x0, x1, y) {
        this.ctx = ctx;
        this.cenario = cenario;
        this.qtdePistas = qtdePistas;
        this.x0 = x0;
        this.x1 = x1;
        this.y = y;

        this.sensores = [];
        let espacoLateral = ESPACO_ENTRE_PISTAS + 10;
        let qtdeSensoresLaterais = Math.floor((x1 - x0) / espacoLateral);        
        for (let i = 0; i < qtdeSensoresLaterais; i++) {
            let newX = x0 + (espacoLateral * i)
            for (let j = 0; j < this.qtdePistas; j++) {
                let newY = y + (ESPACO_ENTRE_PISTAS * j) + 5;
                this.sensores.push(new Sensor(ctx, newX, newY));
            }
        }
        console.log("this.sensores", this.sensores.length);
    }

    atualizar() {
        let sensores = [].concat(this.sensores);
        sensores.forEach(sensor => sensor.desativar());
        let carros = this.cenario.getCarros(this.x0, this.x1);
        carros.forEach(carro => {
            for (let i = 0; i < sensores.length; i++) {
                const sensor = sensores[i];
                if (temColisaoObj(carro, sensor)) {
                    sensor.ativar();
                    sensores.splice(i, 1);
                    i--;
                }
            }
        });

        this.sensores.forEach(sensor => sensor.atualizar());
    }

    desenhar() {
        this.sensores.forEach(sensor => sensor.desenhar());
    }
}

function temColisaoObj(obj1, obj2) {
    return temColisaoObjX(obj1, obj2) && temColisaoObjY(obj1, obj2);
}

function temColisaoObjX(obj1, obj2) {
    let x0 = obj1.left;
    let x1 = x0 + obj1.width;
    let xx0 = obj2.left;
    let xx1 = xx0 + obj2.width;
    return ((x0 >= xx0 && x0 <= xx1) || (x1 >= xx0 && x1 <= xx1) || (x0 <= xx1 && x1 >= xx0));
    // return ((x0 >= xx0 && x0 <= xx1) || (x1 >= xx0 && x1 <= xx1));
}

function temColisaoObjY(obj1, obj2) {
    let y0 = obj1.top;
    let y1 = y0 + obj1.height;
    let yy0 = obj2.top;
    let yy1 = yy0 + obj2.width;
    return ((y0 >= yy0 && y0 <= yy1) || (y1 >= yy0 && y1 <= yy1) || y0 <= yy1 && y1 >= yy0);
    // return ((y0 >= yy0 && y0 <= yy1) || (y1 >= yy0 && y1 <= yy1));
}

function temColisaoX(obj1, xx0, xx1) {
    let x0 = obj1.left;
    let x1 = x0 + obj1.width;
    return ((x0 >= xx0 && x0 <= xx1) || (x1 >= xx0 && x1 <= xx1));
}