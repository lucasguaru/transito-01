class Estado {
    constructor(voltarLeft) {
        this.estados = [];
        this.estadosFuturo = [];
        this.contFramesEstado = 0;
        this.voltarLeft = voltarLeft;
        this.propIgnored = ['ctx', 'estados', 'estadosFuturo', 'contFramesEstado', 'voltarLeft'];
    }

    manterEstado(qtdeFrames) {
        if (qtdeFrames > 0 && this.estadosFuturo.length > 0) {            
            this.estadosFuturo = [];
        }
        if (qtdeFrames == 0) {
            if (this.contFramesEstado > 0) {
                this.contFramesEstado = 0;
                this.salvarEstado(this);
                return true;
            }
            return false;
        }
        if (this.contFramesEstado++ > qtdeFrames) {
            this.contFramesEstado = 0;            
            this.salvarEstado(this);
        }
    }

    salvarEstado(estado) {
        let clone = {};
        for (let prop in estado) {
            if (this.propIgnored.indexOf(prop) == -1 && estado.hasOwnProperty(prop)) {
                clone[prop] = estado[prop];
            }
        }
        this.estados.push(clone);
    }

    voltarEstado(qtde) {
        this.manterEstado(0); //força salvar o estado atual
        if (qtde <= this.estados.length) {
            this.setEstado(this.estados[this.estados.length - qtde]);
            this.estadosFuturo = this.estados.slice(this.estados.length - qtde).concat(this.estadosFuturo);
            this.estados = this.estados.slice(0, this.estados.length - qtde);
        } else if (this.estados.length > 0) {
            this.setEstado(this.estados[this.estados.length]);
            this.estadosFuturo = this.estados.slice(this.estados.length - 1);
            this.estados = this.estados.slice(0, this.estados.length - 1);
        } else if (this.voltarLeft) {
            this.left = 50;
        }
    }

    adiantarEstado(qtde) {
        if (qtde <= this.estadosFuturo.length) {
            this.setEstado(this.estadosFuturo[qtde - 1]);
            this.manterEstado(-1); //força salvar o estado atual
            this.estadosFuturo = this.estadosFuturo.slice(qtde, this.estadosFuturo.length);
        }
    }

    setEstado(estado) {
        for (let prop in estado) {
            if (estado.hasOwnProperty(prop)) {
                this[prop] = estado[prop];
            }
        }
    }
}