/* 
2C = Two of Clubs 
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/

let deck = [];
const tipos = ['C','D','H','S'];
const esoeciales = ['A','J','Q','K'];


let puntosJugador = 0;
    puntosComputadora = 0;
//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

//Esta función crea un nuevo deck
const crearDeck = () =>{

    for( let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }

    for(let tipo of tipos){
        for(let esp of esoeciales){
            deck.push(esp + tipo)
        }
    }
    deck = _.shuffle(deck);
    return deck;
}
crearDeck()

//Esta función me permite tomar una carta

const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor) ) ?
            (valor === 'A' ) ? 11: 10
            : valor * 1;
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21 ){
            break; 
        }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );

    setTimeout(() => {

        if(puntosComputadora === puntosMinimos){
            alert('¡¡GAME OVER 👎🏼!!');
        }else if (puntosMinimos > 21){
            alert('¡¡COMPUTADORA GANA 💻🚀✨!!');
        }else if(puntosComputadora > 21){
            alert('¡¡YOU WIN 👩🏽🚀✨!!');
        }else{
            alert('¡¡COMPUTADORA GANA 💻🚀✨!!');
        }

    }, 100 );
}

// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }else if(puntosJugador === 21){

        setTimeout(() => {
            alert('¡¡YOU WIN 👩🏽🚀✨!!');
        }, 100 );

        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});




