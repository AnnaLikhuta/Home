 //описать константы

var gameFieldHeight=300;
var gameFieldWidth=500;
var marginElem=15;
var bollSize=40;
var RacketWidth= 10;
var RacketHeight=80;

 
 var mainArea=document.createElement('div');

var buttonStart=document.createElement('input');
buttonStart.type='button'
buttonStart.value='ПУСК';
buttonStart.style.marginLeft=marginElem+'px';
buttonStart.onclick=start;
mainArea.appendChild(buttonStart);


 function abc() {
     alert('dff')
 }

var countElem=document.createElement('div');
countElem.style.display='inline-block';
//countElem.style.marginLeft=marginElem;
countElem.style.width='400px';  // другой способ отцентрировать  нужен
countElem.style.textAlign='center';


var leftScore=document.createElement('span');
leftScore.id='leftScore';
leftScore.style.textAlign='center';

var rightScore=document.createElement('span');
rightScore.id='rightScore';


countElem.appendChild(leftScore);
var text=document.createTextNode('text node');
countElem.appendChild(text);
countElem.appendChild(rightScore);
mainArea.appendChild(countElem)


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
ball.style.left=gameFieldWidth/2-bollSize/2+'px';
ball.style.bottom=gameFieldHeight/2-bollSize/2+'px';
gameField.appendChild(ball);


var leftRacket=document.createElement('div');
leftRacket.id='leftRacket';
leftRacket.style.width=RacketWidth+'px';
leftRacket.style.height=RacketHeight+'px';
leftRacket.style.borderColor='black';
leftRacket.style.backgroundColor='yellow';
leftRacket.style.position='absolute';
leftRacket.style.left='0%'
leftRacket.style.bottom='50%'
gameField.appendChild(leftRacket);

var rightRacket=document.createElement('div');
rightRacket.id='rightRacket';
rightRacket.style.width=RacketWidth+'px';
rightRacket.style.height=RacketHeight+'px';
rightRacket.style.backgroundColor='green';
rightRacket.style.position='absolute';
rightRacket.style.right='0%'
rightRacket.style.bottom='50%'
gameField.appendChild(rightRacket);


document.body.appendChild(mainArea)


//движение мяча
var ballH={
    posX : gameFieldWidth/2-bollSize/2,
    posY : gameFieldHeight/2-bollSize/2,
    speedX : 8,
    speedY : 2,
    accelX : 0.5,
    accelY :0.5,
    width : bollSize,
    height: bollSize,

    update : function() {
        var ballElem=document.getElementById('ball');
        ballElem.style.left=Math.round(this.posX)+"px";
        ballElem.style.top=Math.round(this.posY)+"px";
    }
}

var areaH={
    width : gameFieldWidth,
    height : gameFieldHeight
}

function start() {
    // плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
    setInterval(tick,40);
}

function tick() {

    ballH.speedX+=ballH.accelX;
    ballH.posX+=ballH.speedX;

    // вылетел ли мяч правее стены?
    if ( ballH.posX+ballH.width>areaH.width ) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=areaH.width-ballH.width;
    }
    // вылетел ли мяч левее стены?
    if ( ballH.posX<0 ) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=0;
    }

    ballH.speedY+=ballH.accelY;
    
    ballH.posY+=ballH.speedY;

    // вылетел ли мяч ниже пола?
    if ( ballH.posY+ballH.height>areaH.height ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=areaH.height-ballH.height;
    }

    ballH.update();
}

ballH.update();





//движение  боковых панелей




//система подсчета очков




// остановить мяч


// запуск