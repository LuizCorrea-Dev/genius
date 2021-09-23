let order = [];
let clickedOrder = [];
let score = 0;
let scoreLocal = localStorage.getItem("score");
let scoreMemo = document.getElementById("score").innerHTML = scoreLocal;
let scoreNow = 0;
let pointRecords = 0;
let winnerLocal = localStorage.getItem("winner");
let winnerName = document.getElementById("name").innerHTML = winnerLocal;
let message = "";

    
//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        console.log(order)
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, time) => {
    time = time * 500;

    setTimeout(() => {
        element.classList.add('selected');        
    }, time - 198);

    setTimeout(() => {
        element.classList.remove('selected');
    }, time -2);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) { 
        if(clickedOrder[i] != order[i]) {
            gameOver();  
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        
        if(clickedOrder.length == order.length) {

            message = (`Pontuação: ${score} \nVocê acertou! Iniciando próximo nível!`);
            var msg = document.querySelector("#message");
    
            if(msg.style.display === "none") {
                msg.style.display = "block";
                console.log("next Level")
        
                document.getElementById("message").innerHTML = message;
                var nextLevelMsg = document.querySelector("#message"); 
                setTimeout(function(){ nextLevelMsg.style.display = 'none';}, 2000);
        
            } else {msg.style.display = "none";}
        }
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    scoreNow = score -1;
    document.getElementById("scoreNow").innerHTML = scoreNow;

    shuffleOrder();
}

let winner = () => {  
    document.getElementById("score").innerHTML = scoreNow;
      
    var person = prompt("Novo Recorde, coloque seu nome: ");
    winnerName = person
    // Salva dados na sessão
    localStorage.setItem("winner", winnerName);

    return winnerName
}


//guarda o recorde e ganhador
let records = () => {
    if(pointRecords <= score){
        winner();
        pointRecords = score -1
        
        // Salva dados na sessão
        localStorage.setItem("score", pointRecords);

        return pointRecords
       
 
    } else {
       return pointRecords;
    }
}

function msnGameOver() {
    message = (`GAME OVER`);
    var msg = document.querySelector("#message");
    
    if(msg.style.display === "none") {
        msg.style.display = "block";
        console.log("game over")

        document.getElementById("message").innerHTML = message;
        var gameOverMsg = document.querySelector("#message"); 
        setTimeout(function(){ gameOverMsg.style.display = 'none';}, 2000);

    } else {
        msg.style.display = "none";
    }
}

//funcao para game over
let gameOver = () => { 
    setTimeout(function(){        
        document.getElementById("score").innerHTML = pointRecords;
        msnGameOver()     
    }, 2000);

    setTimeout(function(){  
        order = [];
        records();

        document.getElementById("name").innerHTML = winnerLocal;
        console.log(`records = ${pointRecords} , ${winnerName}`);
        clickedOrder = [];
    
        playGame();
    }, 4000);  
}

//funcao de inicio do jogo
let playGame = () => {

    document.getElementById("name").innerHTML = localStorage.getItem("winner");
    document.getElementById("score").innerHTML = localStorage.getItem("score");


       
    message = ('Bem vindo ao Genius! Iniciando novo jogo!');
    document.getElementById("message").innerHTML = message;

    var msg = document.querySelector("#message");
    setTimeout(function(){ msg.style.display = 'none';}, 3000);

    setTimeout(function(){
        var msgNone = document.querySelector("#message");

        if(msgNone.style.display === "none") {
            msgNone.style.display = "block";
            console.log("começou");
            
            var go = ('COMEÇOU !');
            document.getElementById("message").innerHTML = go;
            var msg2 = document.querySelector("#message"); 
            setTimeout(function(){ msg2.style.display = 'none';}, 1000);
        } 
    }, 3100);   
    
    score = 0;
    setTimeout(function(){ nextLevel(); }, 5000);
  
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);



//inicio do jogo
setTimeout(function () {

    winnerLocal ? document.getElementById("name").innerHTML = winnerLocal : document.getElementById("name").innerHTML = "...";
    scoreLocal ? document.getElementById("score").innerHTML = scoreLocal : document.getElementById("score").innerHTML = 0 ;

    playGame();
    
}, 1000);
