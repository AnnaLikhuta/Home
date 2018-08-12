function getSpeed(){
    var radius=11;
    var  abc= Math.floor(Math.random()*(10+10+1))-10;
    var bbb = Math.sqrt(Math.pow(radius,2)- Math.pow(abc,2));
    

}
console.log(abc);
console.log(bbb);




//-----------------
 //описать константы

var gameFieldHeight=300;
var gameFieldWidth=500;
var marginElem=15;
var bollSize=40;
var RacketWidth= 10;
var RacketHeight=80;
var RacketBeginPositionLeft=gameFieldHeight/2-RacketHeight/2;
var RacketBeginPositionRight=gameFieldHeight/2-RacketHeight/2;


 
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
//ball.style.left=gameFieldWidth/2-bollSize/2+'px';
//ball.style.bottom=gameFieldHeight/2-bollSize/2+'px';
gameField.appendChild(ball);


var leftRacket=document.createElement('div');
leftRacket.id='leftRacket';
leftRacket.style.width=RacketWidth+'px';
leftRacket.style.height=RacketHeight+'px';
leftRacket.style.borderColor='black';
leftRacket.style.backgroundColor='yellow';
leftRacket.style.position='absolute';
//leftRacket.style.left='0%';
//leftRacket.style.top=RacketBeginPositionLeft+'px';
gameField.appendChild(leftRacket);



var rightRacket=document.createElement('div');
rightRacket.id='rightRacket';
rightRacket.style.width=RacketWidth+'px';
rightRacket.style.height=RacketHeight+'px';
rightRacket.style.backgroundColor='green';
rightRacket.style.position='absolute';
rightRacket.style.right='0%'
rightRacket.style.top=RacketBeginPositionRight+'px';
gameField.appendChild(rightRacket);


document.body.appendChild(mainArea)



//движение мяча
var ballH={
    getSpeed : function() {
        this.speedX= Math.floor(Math.random()*(9-7+1))+7;
        this.speedY= Math.sqrt(Math.pow(this.radius,2)- Math.pow(this.speedX,2));
        this.signX=Math.floor(Math.random()*(1-0+1))+0;
        this.signY=Math.floor(Math.random()*(1-0+1))+0;
        if (this.signX==0){
            this.speedX=-this.speedX; 
        }
        if (this.signY==0){
            this.speedY=-this.speedY; 
        }

    },
    posX : gameFieldWidth/2-bollSize/2,
    posY : gameFieldHeight/2-bollSize/2,
    
    radius: 10, //11
    //speedX : 0,
    //speedY : 4,
    accelX : 0.,
    accelY :0.,
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

var leftRacketObj={

    posX : 0,
    RacketBeginPositionLeft : gameFieldHeight/2-RacketHeight/2,
    
    speedY : 1,
    width : RacketWidth,
    height: RacketHeight,

    update : function() {
        leftRacket.style.left=Math.round(this.posX)+"px";
        leftRacket.style.top=Math.round(this.RacketBeginPositionLeft)+"px";
    }
}

function start() {
    // плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
    setInterval(tick,40);
}

function tick() {

    var rightCount=0; //для  левого игрока
    ballH.speedX+=ballH.accelX;
    ballH.posX+=ballH.speedX;

    ballH.speedY+=ballH.accelY;
    ballH.posY+=ballH.speedY;
    console.log(RacketBeginPositionLeft);
    console.log('posX  '+ballH.posX);
    console.log('posY  '+ ballH.posY);


    // вылетел ли мяч правее стены?
    if ( ballH.posX+ballH.width>areaH.width ) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=areaH.width-ballH.width;
        console.log('1')
    }
    // если коснулся ракетки 
    if ( (ballH.posX)<=RacketWidth &&
      ballH.posY>= RacketBeginPositionLeft &&   
      ballH.posY<= RacketBeginPositionLeft+ RacketHeight &&  ballH.speedX!=0      ) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=RacketWidth;

       
        
        console.log('2')
    }
  
     // если коснулось стенки
     if ( ballH.posX<=0 ) {
        ballH.speedX=0;
       ballH.speedY=0;
       ballH.posX=0;
       rightCount++;
       rightScore.innerHTML=rightCount;
       }

   

    // вылетел ли мяч ниже пола?
    if ( ballH.posY+ballH.height>areaH.height ) {
        ballH.speedY=-ballH.speedY;
        
        ballH.posY=areaH.height-ballH.height;
        console.log('3')
    }

    //мяч выше потолка
    
    if ( ballH.posY<0 ) {
        ballH.speedY=-ballH.speedY;
        
        ballH.posY=0;
        console.log('4')
    }

    ballH.update();
    leftRacketObj.update();

//--------------------  racket









}

ballH.update();
ballH.getSpeed(); // запустить случайное начальное направление




leftRacketObj.update();


//движение  боковых панелей
//leftRacket.onkeydown=leftRacketMove;

window.addEventListener('keydown', leftRacketMove)
window.addEventListener('keyup', leftRacketStop)


//перемещение ракетки
function leftRacketMove(EO){
    EO=EO||window.event;
    EO.preventDefault();
    leftRacketObj.speedY=1;
    // опускать в низ
    if(EO.keyCode==32 && RacketBeginPositionLeft<(gameFieldHeight-RacketHeight)) {
        RacketBeginPositionLeft+=leftRacketObj.speedY;
       // leftRacket.style.top=RacketBeginPositionLeft+'px';
        if(RacketBeginPositionLeft>=(gameFieldHeight-RacketHeight)) {
            leftRacket.style.top=(gameFieldHeight-RacketHeight)+'px';
        
        }



       // console.log('ha-ha')
    }
    // поднимаем в верх
    if(EO.keyCode==18 && RacketBeginPositionLeft>0 ){
        RacketBeginPositionLeft-=leftRacketObj.speedY;
       // leftRacket.style.top=RacketBeginPositionLeft+'px';
        if(RacketBeginPositionLeft<=0) {
            leftRacket.style.top=0+'px';
        
        }

    }
}



 function leftRacketStop(EO){
    EO=EO||window.event;
    EO.preventDefault();
     console.log('haha')
     leftRacketObj.speedY=0;
 }



//система подсчета очков




// остановить мяч


// запуск