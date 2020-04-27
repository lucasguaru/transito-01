var canvas, ctx, ALTURA, LARGURA, frames = 0;
ALTURA = window.innerHeight - 20;
LARGURA = window.innerWidth;
var FPS = 60;
if (LARGURA > 1500) {
    LARGURA = 1500;
}
// ALTURA = 800;
var cenario = undefined;
var pause = false;
var left = 0;
var right = 0;

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
    if (!pause) {
        atualiza();
        desenha();
    } else {
        if (left > 0) {
            cenario.voltarEstado(left);
            left = 0;
            desenha();
        }
        
        if (right > 0) {
            cenario.adiantarEstado(right);
            right = 0;
            desenha();
        }
        draw.drawText('PAUSED', (LARGURA / 2 - 80), (ALTURA / 2 - 150), undefined, undefined, "30px Arial");
    }
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

document.body.addEventListener("mousedown", function(e) {
    var event = window.event || e;
    if (event.ctrlKey === true) {
        cenario.fecharSemaforo(0);
        pause = false;
    } else {
        pause = !pause;
    }
});

document.body.addEventListener("keydown", function(e) {
    var event = window.event || e;
    switch(event.keyCode) {
        case 37:
            left++;
            pause = true;
            break;
        case 39:
            right++;
            pause = true;
            break;
        default:
            break;            
    }
});