

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


// создать  элемент canvas
    var cvs=document.getElementById('CCC');
    cvs.width=gameFieldWidth;
    cvs.height=gameFieldHeight;
    var context=cvs.getContext('2d');

    document.body.insertBefore(mainArea,cvs) // объявление canvas  должно быть выше


    // игровое поле
    context.fillStyle='yellow';
    context.fillRect(0,0,gameFieldWidth,gameFieldHeight  );

    // игровой мяч
    /*
    context.fillStyle='aqua';
    context.strokeStyle='black';
  //  context.arc(centerX,centerY,bollSize/2, 0, Math.PI*2, false );
    context.fill();
    context.stroke(); 
*/

/*
    // левая ракетка
    context.fillStyle='magenta';
    context.fillRect(0,centerY-RacketHeight/2,RacketWidth,RacketHeight  );

    //правая ракетка
    context.fillStyle='blue';
    context.fillRect(gameFieldWidth-RacketWidth,centerY-RacketHeight/2,RacketWidth,RacketHeight  );


*/

 
 //движение мяча
 var ballH={
     getSpeed : function() {
         
         this.speedX= Math.floor(Math.random()*(4-3+1))+3;  // высчитываю скорость по теореме Пифагора
         this.speedY= Math.sqrt(Math.pow(this.radius,2)- Math.pow(this.speedX,2));
        
       
     //  this.speedX= 4; // для отладки
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
     radius: 5, //  оптимальное движение мяча. на таком расстоянии от центра будет мяч  в любом направлении
     width : bollSize,
     height: bollSize,
 
     update : function() {
         // расположить мяч. нарисовать его
             context.fillStyle='aqua';
             context.strokeStyle='black';
             context.arc(this.posX,this.posY ,bollSize/2, 0, Math.PI*2, false );
             context.fill();
            context.stroke(); 
     }
 }


  //-------------------- движение левой ракетки
  var leftRacketObj={
    posX : 0,
    posY : centerY-RacketHeight/2,
    speedY : 0,

    update : function() {

        context.fillStyle='magenta';
        context.fillRect(this.posX,this.posY,RacketWidth,RacketHeight  );
    }
}
// движение правой ракетки ---------------
var rightRacketObj={
    //расположить в центре. по верхнему левому глу
    posX : gameFieldWidth-RacketWidth,
    posY : centerY-RacketHeight/2,
    speedY : 0,

    update : function() {

        context.fillStyle='blue';
        context.fillRect(this.posX,this.posY,RacketWidth,RacketHeight  );
       }
}


// первоначальное позиционирование. до нажатия кнопки ПУСК
 ballH.getSpeed(); // запустить случайное начальное направление
 ballH.update();
 leftRacketObj.update();
 rightRacketObj.update();


 buttonStart.addEventListener('click',start); // обработчик  для запуска таймера
 
 // запуск таймера
 function start() {
         if(currentState==1){
              requestAnimationFrame(tick)
         }
 }

  //----------------------повторный запуск-----
  buttonStart.addEventListener('click',againPlayGame);
 
  function againPlayGame(EO){
      EO=EO||window.event;
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

 
 // собственно таймер------------------------------ТАЙМЕР-------------------------------------------
 function tick() {
    cvs.width=gameFieldWidth; //очистить поле

    context.fillStyle='yellow'; // показать свежее игровое поле
    context.fillRect(0,0,gameFieldWidth,gameFieldHeight  );


     currentState=2; // не нажимать повторно пуск кнопку


     ballH.posX+=ballH.speedX;
     ballH.posY+=ballH.speedY;
     ballH.update(); // перерисовка мяча



// перериросовка ракеток
leftRacketObj.posY+=leftRacketObj.speedY;
rightRacketObj.posY+=rightRacketObj.speedY;



     // вылетел ли мяч ниже пола?
          if ( ballH.posY+bollSize/2>=gameFieldHeight ) {
            ballH.speedY=-ballH.speedY;
            ballH.posY=gameFieldHeight-bollSize/2;
        }

 //мяч выше потолка
     
 if ( ballH.posY-bollSize/2<=0 ) {
    ballH.speedY=-ballH.speedY;
    ballH.posY=bollSize/2;
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

 //------перемещения ракеток
 
     // ракетки не движется, когда мячик коснулся стенки

 if(currentState==3){
    leftRacketObj.speedY=0;
    rightRacketObj.speedY=0;
 }





 
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


 leftRacketObj.update();
 rightRacketObj.update();


   requestAnimationFrame(tick);

 }
//----------------------------------------------------------конец ТАЙМЕРА------------------ --------------
 

 //движение  боковых панелей
 window.addEventListener('keydown', RacketMove)
 window.addEventListener('keyup', RacketStop)
 
 
 //скорость перемещение левой ракетки
 function RacketMove(EO){
     EO=EO||window.event;
     EO.preventDefault();
     // опускать в низ
     if (currentState==2){

     
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
     
 
 }
  function RacketStop(EO){
     EO=EO||window.event;
     EO.preventDefault();
     if(currentState==3) {
        leftRacketObj.speedY=0;
        rightRacketObj.speedY=0;
   
     }
 
  }
