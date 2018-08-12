 //описать константы

var gameFieldHeight=300;
var gameFieldWidth=500;
var marginElem=15;
var bollSize=40;
var RacketWidth= 10;
var RacketHeight=80;
var RacketBeginPositionLeft=gameFieldHeight/2-RacketHeight/2;
var RacketBeginPositionRight=gameFieldHeight/2-RacketHeight/2;
var rightCount=0; //для  левого игрока
var leftCount=0; // для правого игрока

var centerX= gameFieldWidth/2-bollSize/2;
var centerY=gameFieldHeight/2-bollSize/2;
var currentState=1;
// currentState=1 -  можно нажимать на кнопку пуск,начинать игру
// currentState=2  -  мячик летает пополю. повторно пуск
// currentState=3 -  мячик коснулся стенки левой. 
// currentState=4 -  мячик коснулся стенки правой. 
var dopHeightBoll=bollSize/5;

 
 var mainArea=document.createElement('div');
 mainArea.id='mainArea';

var buttonStart=document.createElement('input');
buttonStart.type='button';
buttonStart.value='ПУСК';
buttonStart.style.marginLeft=marginElem+'px';
mainArea.appendChild(buttonStart);


var countElem=document.createElement('div');
countElem.style.display='inline-block';
countElem.style.width='400px';  // способ отцентрировать  
countElem.style.textAlign='center';
countElem.id='countElem';


var leftScore=document.createElement('span');
leftScore.id='leftScore';
leftScore.style.textAlign='center';

var rightScore=document.createElement('span');
rightScore.id='rightScore';


countElem.appendChild(leftScore);
var text=document.createTextNode(':');
countElem.appendChild(text);
countElem.appendChild(rightScore);
mainArea.appendChild(countElem);


var gameField=document.createElement('div');
gameField.id='gameField';
gameField.style.height=gameFieldHeight +'px';
gameField.style.width=gameFieldWidth+'px';
gameField.style.backgroundColor='aqua';
gameField.style.margin=marginElem+'px';
gameField.style.position='relative';
mainArea.appendChild(gameField);

var ball=document.createElement('div');
ball.id='ball';
ball.style.width=bollSize+'px';
ball.style.height=bollSize+'px';
ball.style.borderRadius='50%';
ball.style.borderColor='black';
ball.style.backgroundColor='magenta';
ball.style.position='absolute';
gameField.appendChild(ball);


var leftRacket=document.createElement('div');
leftRacket.id='leftRacket';
leftRacket.style.width=RacketWidth+'px';
leftRacket.style.height=RacketHeight+'px';
leftRacket.style.borderColor='black';
leftRacket.style.backgroundColor='yellow';
leftRacket.style.position='absolute';
gameField.appendChild(leftRacket);



var rightRacket=document.createElement('div');
rightRacket.id='rightRacket';
rightRacket.style.width=RacketWidth+'px';
rightRacket.style.height=RacketHeight+'px';
rightRacket.style.backgroundColor='green';
rightRacket.style.position='absolute';
gameField.appendChild(rightRacket);


document.body.appendChild(mainArea)


//движение мяча
var ballH={
    getSpeed : function() {
        
        this.speedX= Math.floor(Math.random()*(9-7+1))+7;  // высчитываю скорость по теореме Пифагора
        this.speedY= Math.sqrt(Math.pow(this.radius,2)- Math.pow(this.speedX,2));
       
       /*
       this.speedX= 8; // для отладки
       this.speedY=0;
        */
        this.signX=Math.floor(Math.random()*(1-0+1))+0;
        this.signY=Math.floor(Math.random()*(1-0+1))+0;
        if (this.signX==0){
            this.speedX=-this.speedX; 
        }
        if (this.signY==0){
            this.speedY=-this.speedY; 
        }
    },
    posX : centerX,
    posY : centerY,
    radius: 11, // оптимальное движение мяча. на таком расстоянии от центра будет мяч  в любом направлении
    width : bollSize,
    height: bollSize,

    update : function() {
        var ballElem=document.getElementById('ball');
        ballElem.style.left=Math.round(this.posX)+"px";
        ballElem.style.top=Math.round(this.posY)+"px";
    }
}


//-------------------- движение левой ракетки
var leftRacketObj={
    posX : 0,
    posY : gameFieldHeight/2-RacketHeight/2,
    speedY : 0,

    update : function() {
        leftRacket.style.top=Math.round(this.posY)+"px";
        leftRacket.style.left=Math.round(this.posX)+"px";

    }
}

var rightRacketObj={
    posX : gameFieldWidth-RacketWidth,
    posY : gameFieldHeight/2-RacketHeight/2,
    speedY : 0,

    update : function() {
        rightRacket.style.top=Math.round(this.posY)+"px";
        rightRacket.style.left=Math.round(this.posX)+"px";
    }
}

//----------------------повторный запуск-----
buttonStart.addEventListener('click',againPlayGame);

 function againPlayGame(EO){
     EO=EO||window.event;
     //EO.stopImmediatePropagation();
   //  EO.stopPropagation();
    if(currentState==3){
        
 
        // для мяча начальные параметры
        ballH.posX = centerX;
        ballH.posY =centerY;
        leftRacketObj.posY=gameFieldHeight/2-RacketHeight/2;
        rightRacketObj.posY=gameFieldHeight/2-RacketHeight/2;
       ballH.getSpeed(); // запустить случайное начальное направление
       console.log(ballH.speedX);
    }
 }



 buttonStart.addEventListener('click',start); // обработчик на window для запуска таймера

function start() {
        if(currentState==1){
             // плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
        setInterval(tick,40);
        console.log('ha=ha timer');

        }
}


function tick() {
    currentState=2; // не нажимать повторно пуск кнопку
   
    ballH.posX+=ballH.speedX;
    ballH.posY+=ballH.speedY;

    // вылетел ли мяч ниже пола?
    if ( ballH.posY+ballH.height>gameFieldHeight ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=gameFieldHeight-ballH.height;
    }

    //мяч выше потолка
    
    if ( ballH.posY<0 ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=0;
    }
    

    // если коснулся ракетки левой
    if ( ballH.posX<=RacketWidth &&
      ballH.posY+bollSize/2>= leftRacketObj.posY-dopHeightBoll &&   
      ballH.posY<= leftRacketObj.posY+ RacketHeight+dopHeightBoll &&  ballH.speedX!=0      ) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=RacketWidth;
    }

    
    //  если мяч коснулся правой ракетки
    
    if(ballH.posX>=gameFieldWidth-RacketWidth-bollSize  &&
        ballH.posY+bollSize/2>=rightRacketObj.posY-dopHeightBoll &&
        ballH.posY<=rightRacketObj.posY+ RacketHeight+dopHeightBoll  && ballH.speedX!=0    ){

        ballH.speedX=-ballH.speedX;
        ballH.posX=gameFieldWidth-RacketWidth-bollSize;

    }
 
     // если коснулось стенки левой
     if ( ballH.posX<0 ) {
        ballH.speedX=0;
       ballH.speedY=0;
       rightCount++;
        rightScore.innerHTML=rightCount;
        ballH.posX=0;
       }
       
       if(ballH.posX==0){
        currentState=3; 
       }

            // если коснулось правой стенки
     if ( ballH.posX>gameFieldWidth-bollSize) {
        ballH.speedX=0;
       ballH.speedY=0;
       ballH.posX=gameFieldWidth-bollSize;
       leftCount++;
       leftScore.innerHTML=leftCount;
       }
       
       if(ballH.posX==gameFieldWidth-bollSize){
        currentState=3; // мячик коснулся стенки правой
       }
    
    
    ballH.update();


//------перемещения ракеток

//-------------для ракетки левой
    if(leftRacketObj.posY>=(gameFieldHeight-RacketHeight)) {
        leftRacketObj.posY=gameFieldHeight-RacketHeight;
    }

// поднимаем в верх

   // выскакивает кончик. подправить
    if(leftRacketObj.posY<=0) {
        leftRacketObj.posY=0;
    
    }

// ------------------------------- для ракетки    правой
//ограничение для низа
if(rightRacketObj.posY>=(gameFieldHeight-RacketHeight)) {
    rightRacketObj.posY=gameFieldHeight-RacketHeight;
}


// выскакивает кончик. подправить
if(rightRacketObj.posY<=0) {
    rightRacketObj.posY=0;

}
    // ракетки не движется, когда мячик коснулся стенки
    if(currentState==3){ // поставить 3
        leftRacketObj.speedY=0;
        rightRacketObj.speedY=0;

    }


leftRacketObj.posY+=leftRacketObj.speedY;
rightRacketObj.posY+=rightRacketObj.speedY;

leftRacketObj.update();
rightRacketObj.update();

}

// сразу спозиционировать
rightRacketObj.update();
leftRacketObj.update(); 
ballH.update();
ballH.getSpeed(); // запустить случайное начальное направление


//движение  боковых панелей
window.addEventListener('keydown', RacketMove)
window.addEventListener('keyup', RacketStop)


//скорость перемещение левой ракетки
function RacketMove(EO){
    EO=EO||window.event;
    EO.preventDefault();
    // опускать в низ
    if(EO.keyCode==17){
        leftRacketObj.speedY=4;
    }
    if(EO.keyCode==16){
        leftRacketObj.speedY=-4;
    }
    if(EO.keyCode==40){
        rightRacketObj.speedY=4;
    }
    if(EO.keyCode==38){
        rightRacketObj.speedY=-4;
    }
    

}
 function RacketStop(EO){
    EO=EO||window.event;
    EO.preventDefault();
    leftRacketObj.speedY=0;
    rightRacketObj.speedY=0;

 }
