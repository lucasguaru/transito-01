class Faixa {
    constructor(ctx) {
        this.ctx = ctx;
    }

    desenhar(left, top, height) {
        draw.drawLine(left, top + 5, left, height - 5, 8, 'white');
        let faixaLeft = left + 12;
        let faixaRight = left + 80;
        let topFaixa = top + 15;
        let contFaixa = 0;
        let espacoFaixa = 20;
        draw.drawLine(faixaLeft, topFaixa + (espacoFaixa * contFaixa), faixaRight, topFaixa + (espacoFaixa * contFaixa), 12, 'white');
        contFaixa++;
        draw.drawLine(faixaLeft, topFaixa + (espacoFaixa * contFaixa), faixaRight, topFaixa + (espacoFaixa * contFaixa), 12, 'white');
        contFaixa++;
        draw.drawLine(faixaLeft, topFaixa + (espacoFaixa * contFaixa), faixaRight, topFaixa + (espacoFaixa * contFaixa), 12, 'white');
        contFaixa++;
        draw.drawLine(faixaLeft, topFaixa + (espacoFaixa * contFaixa), faixaRight, topFaixa + (espacoFaixa * contFaixa), 12, 'white');
    }
}