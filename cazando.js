const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// Variables de posición y estado
let gatox = 225;
let gatoy = 225;
let comidax = 100;
let comiday = 100;
let puntosGato = 0;
let tiempo = 15;
let temporizador = null;
let mirandoDerecha = true;
let rotacion = 0;

// Constantes de configuración
const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const VELOCIDAD = 20;
const pz = 3; // Tamaño del píxel para el ratón

// Carga de imagen de Theo
const imagenTheo = new Image();
imagenTheo.src = "teoboca.png"; 

function iniciarJuego() {
    resetJuego();
}

function dibujar() {
    // 1. Limpiar el área de juego
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Fondo de cuadrícula sutil
    ctx.strokeStyle = "#f0f0f0";
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // 3. Dibujar a Theo con rotación y dirección
    if (imagenTheo.complete) {
        ctx.save(); 
        // Movemos el origen al centro de Theo
        ctx.translate(gatox + ANCHO_GATO / 2, gatoy + ALTO_GATO / 2);
        ctx.rotate(rotacion * Math.PI / 180);
        
        if (!mirandoDerecha) {
            ctx.scale(-1, 1);
        }
        
        // Dibujamos centrado en el nuevo origen
        ctx.drawImage(imagenTheo, -ANCHO_GATO / 2, -ALTO_GATO / 2, ANCHO_GATO, ALTO_GATO);
        ctx.restore(); 
    } else {
        // Cuadro negro de respaldo
        ctx.fillStyle = "black";
        ctx.fillRect(gatox, gatoy, ANCHO_GATO, ALTO_GATO);
    }

    // 4. Dibujar Ratón Pixel Art (Comida)
    // Cuerpo
    ctx.fillStyle = "#8e8e8e"; 
    ctx.fillRect(comidax + 2*pz, comiday + 3*pz, 6*pz, 5*pz); 
    ctx.fillRect(comidax + 3*pz, comiday + 2*pz, 4*pz, 1*pz); 

    // Orejas
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(comidax + 1*pz, comiday + 1*pz, 2*pz, 2*pz); 
    ctx.fillRect(comidax + 7*pz, comiday + 1*pz, 2*pz, 2*pz); 

    // Detalle Rosa orejas
    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(comidax + 2*pz, comiday + 2*pz, 1*pz, 1*pz); 
    ctx.fillRect(comidax + 7*pz, comiday + 2*pz, 1*pz, 1*pz); 

    // Ojos
    ctx.fillStyle = "#000000";
    ctx.fillRect(comidax + 3*pz, comiday + 4*pz, 1*pz, 1*pz); 
    ctx.fillRect(comidax + 6*pz, comiday + 4*pz, 1*pz, 1*pz); 

    // Nariz
    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(comidax + 4*pz, comiday + 7*pz, 2*pz, 1*pz); 

    // Cola
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(comidax + 8*pz, comiday + 5*pz, 2*pz, 1*pz); 
    ctx.fillRect(comidax + 9*pz, comiday + 4*pz, 1*pz, 1*pz); 

    detectarColision(); 
}

function mover(direccion) {
    rotacion = 0; // Resetear inclinación

    if (direccion === 'arriba' && gatoy > 0) {
        gatoy -= VELOCIDAD;
        rotacion = -10;
    }
    if (direccion === 'abajo' && gatoy < canvas.height - ALTO_GATO) {
        gatoy += VELOCIDAD;
        rotacion = 10;
    }
    if (direccion === 'izquierda' && gatox > 0) {
        gatox -= VELOCIDAD;
        mirandoDerecha = false;
        rotacion = -5;
    }
    if (direccion === 'derecha' && gatox < canvas.width - ANCHO_GATO) {
        gatox += VELOCIDAD;
        mirandoDerecha = true;
        rotacion = 5;
    }
    
    dibujar();
}

function detectarColision() {
    if (gatox < comidax + 30 &&
        gatox + ANCHO_GATO > comidax &&
        gatoy < comiday + 30 &&
        gatoy + ALTO_GATO > comiday) {
        
        puntosGato++;
        document.getElementById("puntos").innerText = puntosGato;
        
        tiempo = 15; // Reiniciar el tiempo
        document.getElementById("tiempo").innerText = tiempo;

        // Nueva posición para el ratón
        comidax = Math.floor(Math.random() * (canvas.width - 30));
        comiday = Math.floor(Math.random() * (canvas.height - 30));
        
        if (puntosGato >= 10) {
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
    mirandoDerecha = true;
    rotacion = 0;
    comidax = Math.floor(Math.random() * (canvas.width - 30));
    comiday = Math.floor(Math.random() * (canvas.height - 30));

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