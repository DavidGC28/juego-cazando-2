const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

let gatox = 225;
let gatoy = 225;
let comidax = 100;
let comiday = 100;
let puntosGato = 0;
let tiempo = 15;
let temporizador = null;

const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const VELOCIDAD = 20;

// 2. Esta función se activa por el <body onload="iniciarJuego()">
function iniciarJuego() {
    resetJuego();
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar a Theo (Negro)
    ctx.fillStyle = "black";
    ctx.fillRect(gatox, gatoy, ANCHO_GATO, ALTO_GATO);

    // Dibujar Comida (Rojo)
    ctx.fillStyle = "red";
    ctx.fillRect(comidax, comiday, 30, 30);

    detectarColision();
}

// 3. Esta función se activa por los botones onclick="mover('...')"
function mover(direccion) {
    if (direccion === 'arriba' && gatoy > 0) gatoy -= VELOCIDAD;
    if (direccion === 'abajo' && gatoy < canvas.height - ALTO_GATO) gatoy += VELOCIDAD;
    if (direccion === 'izquierda' && gatox > 0) gatox -= VELOCIDAD;
    if (direccion === 'derecha' && gatox < canvas.width - ANCHO_GATO) gatox += VELOCIDAD;
    
    dibujar();
}

function detectarColision() {
    if (gatox < comidax + 30 &&
        gatox + ANCHO_GATO > comidax &&
        gatoy < comiday + 30 &&
        gatoy + ALTO_GATO > comiday) {
        
        puntosGato++;
        document.getElementById("puntos").innerText = puntosGato;
       
        tiempo =15; // Reiniciar el tiempo cada vez que se come la comida
        document.getElementById("tiempo").innerText = tiempo;
      
        comidax = Math.floor(Math.random() * (canvas.width - 30));
        comiday = Math.floor(Math.random() * (canvas.height - 30));
        
        if (puntosGato >= 6) {
            alert("¡Theo ganó! Puntos totales: " + puntosGato);
            resetJuego();
        }
    }
}

function resetJuego() {
    puntosGato = 0;
    tiempo = 15;
    gatox = 225;
    gatoy = 225;
    comidax = Math.floor(Math.random() * 400);
    comiday = Math.floor(Math.random() * 400);

    document.getElementById("puntos").innerText = "0";
    document.getElementById("tiempo").innerText = "15";

    if (temporizador) clearInterval(temporizador);
    
    temporizador = setInterval(() => {
        tiempo--;
        document.getElementById("tiempo").innerText = tiempo;
        if (tiempo <= 0) {
            clearInterval(temporizador);
            alert("¡GAME OVER!");
            resetJuego();
        }
    }, 1000);

    dibujar();
}



// Conectar el botón de reiniciar del HTML
document.getElementById("btnReiniciar").onclick = resetJuego;