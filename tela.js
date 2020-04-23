var canvas, ctx, ALTURA, LARGURA, frames = 0;
ALTURA = window.innerHeight - 20;
LARGURA = window.innerWidth;
if (LARGURA > 1500) {
    LARGURA = 1500;
}
// ALTURA = 800;
var cenario = undefined;

function main() {
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";
    ctx = canvas.getContext("2d");
    // ctx.scale(0.7,0.7);
    document.body.appendChild(canvas);
    // ctx.scale(2,2);

    cenario = new Cenario(ctx);

    roda();
}
function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}
function atualiza() {
    frames++;
    cenario.atualizar();
    // personagem.atualiza();
    // obstaculos.atualiza();
}
function desenha() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, LARGURA, ALTURA);
    cenario.desenhar();
    // chao.desenha();
    // obstaculos.desenha();
    // personagem.desenha();
    // desafio.desenha();
}

main();