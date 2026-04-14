let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// GATO
let gatox=0;
let gatoy=0;
let puntosGato=0;
let tiempo=10;
let temporizador;

const ANCHOGATO=50;
const ALTURAGATO=50;
const VELOCIDAD=15;

// COMIDA
let comidax=50;
let comiday=50;
const ANCHOCOMIDA=30;
const ALTURACOMIDA=30;

//ctx.fillStyle = "#be2222";

// FUNCION PRINCIPAL PARA GRAFICAR EL GATO Y LA COMIDA
function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}

// FUNCION PARA GRAFICAR GATO
function graficarGato(){    
    graficarRectangulo(gatox,gatoy,ANCHOGATO,ALTURAGATO,"#000000");
}

// FUNCION PARA GRAFICAR COMIDA
function graficarComida(){
    graficarRectangulo(comidax,comiday,ANCHOCOMIDA,ALTURACOMIDA,"#ff0000");
}

// LIMPIAR EL CANVAS "PANTALLA DE 500X500"
function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


// FUNCION INICIAR JUEGO
function iniciarJuego(){
    // gato al centro del rectangulo
    gatox = (canvas.width / 2) - (ANCHOGATO / 2);     
    gatoy = (canvas.height / 2) - (ALTURAGATO / 2);

    //COMIDA EN UNA COORDENADA   ALEATORIA
    comidax=generarAleatorio(0,canvas.width - ANCHOCOMIDA);
    comiday=generarAleatorio(0,canvas.height - ALTURACOMIDA);
    
    graficarGato();
    graficarComida();
    //incrementarPuntos();
    //restarTiempo();
}

const LIMITE_X = canvas.width - ANCHOGATO; 
const LIMITE_Y = canvas.height - ALTURAGATO;

function moverIzquierda(){
    if(gatox>0){
        gatox-=10;
        cargarGraficos();
    }
}

function moverDerecha(){
    if (gatox<LIMITE_X){
        gatox += 10;
       cargarGraficos();
    }
}

function moverArriba(){
    if(gatoy>0){
        gatoy -= 10;
        cargarGraficos();
    }
}

function moverAbajo(){
    if(gatoy<LIMITE_Y){
        gatoy += 10;
        cargarGraficos();
    }
}

document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();
document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();

function detectarColision(){
    if(comidax+ANCHOCOMIDA > gatox &&
       comidax <  gatox+ANCHOGATO && 
       comiday+ALTURACOMIDA > gatoy &&
       comiday < gatoy+ALTURAGATO){
            alert("++++ TE ATRAPÉ ++++");
            // aparecer en otro lado 
            limpiarCanva(); 
            graficarGato();

            comidax=generarAleatorio(0,canvas.width - ANCHOCOMIDA);
            comiday=generarAleatorio(0,canvas.height - ALTURACOMIDA);
            graficarComida();
            incrementarPuntos();
            tiempo=10;
    }
}

function cargarGraficos(){
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function incrementarPuntos(){
    puntosGato+=1;
    mostrarEnSpan("puntos",puntosGato);
    if(puntosGato>=6){
        alert("+++GANASTE+++");
        clearInterval(temporizador);
    }    
}

function restarTiempo(){
    tiempo-=1;
    mostrarEnSpan("tiempo",tiempo);
    if(tiempo<=0){
        alert("+++GAME OVER+++");
        clearInterval(temporizador);
    }
}

temporizador=setInterval(function(){
    restarTiempo();
},1000);

function reiniciarJuego(){    
    puntosGato=0;
    tiempo=10;
    cargarGraficos();
    mostrarEnSpan("puntos",puntosGato);
    mostrarEnSpan("tiempo",tiempo);
}