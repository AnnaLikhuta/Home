 //описать константы
//         <svg id="SSS" > </svg>





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
 
 var centerX= gameFieldWidth/2;
 var centerY=gameFieldHeight/2;
 var currentState=1;
 // currentState=1 -  можно нажимать на кнопку пуск,начинать игру
 // currentState=2  -  мячик летает пополю. повторно пуск
 // currentState=3 -  мячик коснулся стенки левой. 
 // currentState=4 -  мячик коснулся стенки правой. 
 var dopHeightBoll=bollSize/5;
 


 // создать игровое поле
var SSSBasic=document.getElementById('SSS'); 

SSSBasic.setAttribute('width',gameFieldWidth);
SSSBasic.setAttribute('height',gameFieldHeight);

var gameField= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
gameField.id='gameField';
gameField.setAttribute("x", 0);
gameField.setAttribute("y",0);
gameField.setAttribute('width',gameFieldWidth);
gameField.setAttribute('height',gameFieldHeight);
gameField.setAttribute("fill", "aqua");

SSSBasic.appendChild(gameField);

// создать мяч
   
    var ball= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ball.id='ball';
    ball.setAttribute("r", bollSize/2);
    ball.setAttribute("fill", "yellow");

    SSSBasic.appendChild(ball);

//создать ракетку левую
var leftRacket= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
leftRacket.id='leftRacket';
leftRacket.setAttribute('width',RacketWidth);
leftRacket.setAttribute('height',RacketHeight);
leftRacket.setAttribute("fill", "red");

SSSBasic.appendChild(leftRacket);

// создать правую ракетку
var rightRacket= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rightRacket.id='leftRacket';
rightRacket.setAttribute('width',RacketWidth);
rightRacket.setAttribute('height',RacketHeight);
rightRacket.setAttribute("fill", "magenta");

SSSBasic.appendChild(rightRacket);

// кнопка пуск
var mainArea=document.createElement('div');
mainArea.id='mainArea';
mainArea.style.width=gameFieldWidth+'px';

var buttonStart=document.createElement('input');
buttonStart.type='button';
buttonStart.value='ПУСК';
buttonStart.style.marginLeft=marginElem+'px';
buttonStart.style.marginBottom=marginElem+'px';

mainArea.appendChild(buttonStart);
document.body.insertBefore(mainArea,SSSBasic)


//создать поле для подсчета очов
var countElem=document.createElement('div');
countElem.style.display='inline-block';
countElem.id='countElem';
countElem.style.width='400px';  // способ отцентрировать  
countElem.style.textAlign='center';



var leftScoreWrite=document.createElement('span');
leftScoreWrite.id='leftScoreWrite';
leftScoreWrite.style.textAlign='center';
leftScoreWrite.innerHTML='0'

var rightScoreWrite=document.createElement('span');
rightScoreWrite.id='rightScoreWrite';
rightScoreWrite.innerHTML='0'


countElem.appendChild(leftScoreWrite);
var text=document.createTextNode(':');
countElem.appendChild(text);
countElem.appendChild(rightScoreWrite);
mainArea.appendChild(countElem);

 
 
 //движение мяча
 var ballH={
     getSpeed : function() {
         
         this.speedX= Math.floor(Math.random()*(9-7+1))+7;  // высчитываю скорость по теореме Пифагора
         this.speedY= Math.sqrt(Math.pow(this.radius,2)- Math.pow(this.speedX,2));
        
       
       //this.speedX= 8; // для отладки
       // this.speedY=0;
       
         this.signX=Math.floor(Math.random()*(1-0+1))+0;
         this.signY=Math.floor(Math.random()*(1-0+1))+0;
         if (this.signX==0){
             this.speedX=-this.speedX; 
         }
         if (this.signY==0){
             this.speedY=-this.speedY; 
         }
     },
     // координаты центра окружности
     posX : centerX,
     posY : centerY,
     radius: 11, // 11 оптимальное движение мяча. на таком расстоянии от центра будет мяч  в любом направлении
     width : bollSize,
     height: bollSize,
 
     update : function() {
        ball.setAttribute("cx",this.posX );
        ball.setAttribute("cy", this.posY );

     }
 }
 
 
 //-------------------- движение левой ракетки
 var leftRacketObj={
     posX : 0,
     posY : gameFieldHeight/2-RacketHeight/2,
     speedY : 0,
 
     update : function() {
        leftRacket.setAttribute("x", this.posX);
        leftRacket.setAttribute("y",this.posY);
 
     }
 }
 
 var rightRacketObj={
     //расположить в центре. по верхнему левому глу
     posX : gameFieldWidth-RacketWidth,
     posY : gameFieldHeight/2-RacketHeight/2,
     speedY : 0,
 
     update : function() {

        rightRacket.setAttribute("x", this.posX);
        rightRacket.setAttribute("y",this.posY);
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
     if ( ballH.posY+bollSize/2>gameFieldHeight ) {
         ballH.speedY=-ballH.speedY;
         ballH.posY=gameFieldHeight-bollSize/2;
     }
 
     //мяч выше потолка
     
     if ( ballH.posY-bollSize/2<0 ) {
         ballH.speedY=-ballH.speedY;
         ballH.posY=bollSize/2;
     }
     
 
     // если коснулся ракетки левой
     if ( ballH.posX-bollSize/2<=RacketWidth &&
       ballH.posY>= leftRacketObj.posY-dopHeightBoll &&   
       ballH.posY<= leftRacketObj.posY+ RacketHeight+dopHeightBoll &&  ballH.speedX!=0      ) {
         ballH.speedX=-ballH.speedX;
         ballH.posX=RacketWidth+bollSize/2;
     }
 
     
     //  если мяч коснулся правой ракетки
     
     if(ballH.posX+bollSize/2>=gameFieldWidth-RacketWidth  &&
         ballH.posY>=rightRacketObj.posY-dopHeightBoll &&
         ballH.posY<=rightRacketObj.posY+ RacketHeight+dopHeightBoll  && ballH.speedX!=0    ){
 
         ballH.speedX=-ballH.speedX;
         ballH.posX=gameFieldWidth-RacketWidth-bollSize/2;
 
     }
  
      // если коснулось стенки левой
      if ( ballH.posX-bollSize/2<0 ) {
         ballH.speedX=0;
        ballH.speedY=0;
        rightCount++;
         rightScoreWrite.innerHTML=rightCount;
         ballH.posX=bollSize/2;
        }
        
        if(ballH.posX==bollSize/2){
         currentState=3; 
        }
 
             // если коснулось правой стенки
      if ( ballH.posX+bollSize/2>gameFieldWidth) {
         ballH.speedX=0;
        ballH.speedY=0;
        ballH.posX=gameFieldWidth-bollSize/2;
        leftCount++;
        leftScoreWrite.innerHTML=leftCount;
        }
        
        if(ballH.posX==gameFieldWidth-bollSize/2){
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
