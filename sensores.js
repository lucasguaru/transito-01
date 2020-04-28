class Sensores {
    constructor(ctx, cenario, qtdePistas, x0, x1, y, activeColor, fillActiveColor, graficoVelocidadeMedia) {
        this.ctx = ctx;
        this.cenario = cenario;
        this.qtdePistas = qtdePistas;
        this.x0 = x0;
        this.x1 = x1;
        this.y = y;
        this.graficoVelocidadeMedia = graficoVelocidadeMedia;
        if (graficoVelocidadeMedia) {
            this.arrayVeloMedia = [];
        }
        this.velocidadeMedia = 0;
        this.framesVeloMedia = 0;
        this.contSensoresAtivos = 0;

        this.sensores = [];
        let espacoLateral = ESPACO_ENTRE_PISTAS + 10;
        let qtdeSensoresLaterais = Math.floor((x1 - x0) / espacoLateral);        
        for (let i = 0; i < qtdeSensoresLaterais; i++) {
            let newX = x0 + (espacoLateral * i)
            for (let j = 0; j < this.qtdePistas; j++) {
                let newY = y + (ESPACO_ENTRE_PISTAS * j) + 5;
                this.sensores.push(new Sensor(ctx, newX, newY, activeColor, fillActiveColor));
            }
        }
        console.log("this.sensores", this.sensores.length);
    }

    voltarEstado(qtde) {
        this.atualizar(true);
    }

    adiantarEstado(qtde) {
        this.atualizar(true);
    }

    salvarGraficoVelocidadeMedia(velocidadeMedia) {
        if (this.graficoVelocidadeMedia) {
            this.arrayVeloMedia.push(velocidadeMedia);
            if (this.arrayVeloMedia.length > 250) {
                this.arrayVeloMedia = this.arrayVeloMedia.slice(1);
            }
        }
    }

    calcularVelocidadeMedia(carros) {
        let carrosSpeed = carros.map(carro => carro.speed);
        let velocidadeSum = carrosSpeed.reduce((total, valor) => {
            return total + valor;
        });
        let velocidadeMedia = velocidadeSum / carros.length;
        velocidadeMedia = velocidadeMedia * 10; //para dar mais sensacao de velocidade
        return velocidadeMedia;
    }

    atualizar(calcularVelocidade) {
        let velocidadeMedia = this.velocidadeMedia;
        let sensores = [].concat(this.sensores); //novo array pois os sensores que ja ativaram, sao removidos da lista
        sensores.forEach(sensor => sensor.desativar());
        let carros = this.cenario.getCarros(this.x0, this.x1);
        if (carros.length > 0) {
            if (this.graficoVelocidadeMedia) {
                let velocidadeMedia = null;
                if (this.framesVeloMedia % 2 == 0) { // a cada 15 quadros
                    velocidadeMedia = this.calcularVelocidadeMedia(carros);
                    this.salvarGraficoVelocidadeMedia(velocidadeMedia);
                }
                if (calcularVelocidade || this.framesVeloMedia++ > (FPS / 2)) {
                    this.framesVeloMedia = 0;
                    this.velocidadeMedia = velocidadeMedia || this.calcularVelocidadeMedia(carros);
                }
            } else if (calcularVelocidade || this.framesVeloMedia++ > (FPS / 2)) {
                this.framesVeloMedia = 0;
                this.velocidadeMedia = this.calcularVelocidadeMedia(carros);
            }
        } else {
            this.velocidadeMedia = null;
        }
        let contSensoresAtivos = 0;
        carros.forEach(carro => {
            for (let i = 0; i < sensores.length; i++) {
                const sensor = sensores[i];
                if (temColisaoObj(carro, sensor)) {
                        contSensoresAtivos++;
                    sensor.ativar();
                    sensores.splice(i, 1);
                    i--;
                }
            }
        });
        if (this.framesVeloMedia == 0) {
            this.contSensoresAtivos = contSensoresAtivos;
        }

        this.sensores.forEach(sensor => sensor.atualizar());
    }

    desenhar() {
        this.sensores.forEach(sensor => sensor.desenhar());
        if (this.velocidadeMedia != null) {
            draw.drawText("Velocidade Média: " + this.trunc(this.velocidadeMedia + "", 3), (this.x0 + this.x1) / 2, this.y - 10);
        }
        draw.drawText("Ativos: " + this.contSensoresAtivos, ((this.x0 + this.x1) / 2) + 30, this.y + 20 + (this.qtdePistas * ESPACO_ENTRE_PISTAS));
        
        if (this.graficoVelocidadeMedia) {
            let x = 100;
            let y = this.y + 300;

            draw.drawText('Velocidade Média Faixa', x + 120, y - 80);
            draw.drawLine(x, y - 75, x, y + 2, 1, 'white'); // eixo y
            draw.drawLine(x, y + 2, x + 250, y, 1, 'white'); // eixo x

            if (this.arrayVeloMedia.length > 0) {
                for (let i = 0; i < this.arrayVeloMedia.length; i++) {
                    const vl = this.arrayVeloMedia[i];
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(x + i, y - (vl * 4), 1, 1);
                }
                let latest = this.arrayVeloMedia[this.arrayVeloMedia.length - 1] + "";
                if (latest.indexOf(".") > -1) {
                    latest = latest.substring(0, latest.indexOf("."));
                }
                draw.drawText(latest, x + this.arrayVeloMedia.length + 10, y - (latest * 4));
            }
        }
    }

    trunc(text, size) {
        if (!text || text.length <= size) {
            return text;
        }
        text = text.substring(0, size);
        if (text.substring(text.length - 1) == ".") {
            return text.substring(0, text.length - 1);
        }
        return text;
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