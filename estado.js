class Estado {
    constructor(voltarLeft) {
        this.estados = [];
        this.contFramesEstado = 0;
        this.voltarLeft = voltarLeft;
    }

    manterEstado(qtdeFrames) {
        if (this.contFramesEstado++ > qtdeFrames) {
            this.contFramesEstado = 0;
            let clone = {};
            for (let prop in this) {
                if (this.hasOwnProperty(prop) && prop != 'estados' && prop != 'ctx') {
                    clone[prop] = this[prop];
                }
            }
            this.estados.push(clone);
        }
    }

    voltarEstado(qtde) {
        if (qtde <= this.estados.length) {
            this.setEstado(this.estados[this.estados.length - qtde]);
            this.estados = this.estados.slice(0, this.estados.length - qtde);
        } else if (this.estados.length > 0) {
            this.setEstado(this.estados[this.estados.length]);
            this.estados = this.estados.slice(0, this.estados.length - 1);
        } else if (this.voltarLeft) {
            this.left = 50;
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