   //основные размеры
   // в идеале в них записывать реальные  размеры GameDiv
   var mainSizeWidth=1000;
   var mainSizeHeight=1000;
   // у меня поле для работы  100*100
   var sizeSmallSquareCornerWidth=mainSizeWidth/9;  // размер для уголка игрового поля по  ширине
   var sizeForGameSquare= (mainSizeWidth-sizeSmallSquareCornerWidth)/8; // ( 100-120)/8=11
   //радиус круга для шашки
   var figureRadius=sizeForGameSquare*0.3

  // получить див, куда вставлять svg-игровое поле
  var gameDiv=document.getElementById('gameDiv');
    // создать svg поле. резиновые размеры
  // start= document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 
  var start=document.getElementById('start')
    start.setAttribute('viewBox','0 0'+' '+mainSizeWidth+' '+mainSizeHeight)
   start.style.width='100%';
   start.style.height='100%';

  start.style.maxHeight='80vw';
  start.style.maxWidth='80vw';
  start.style.minHeight='20vh';
  start.style.minWidth='20vh';

   start.style.display='block';


 // создать большой фоновый квадрат
   
 var bigRect= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
 bigRect.setAttribute("x", 0);
 bigRect.setAttribute("y", 0);
 bigRect.setAttribute("width",mainSizeWidth);
 bigRect.setAttribute("height",mainSizeHeight );

 bigRect.setAttribute("fill", "aqua");
 start.appendChild(bigRect);
 //gameDiv.appendChild(start);

   // массив для клеток
   function getNumberArr(){
    var numberArr=[],pos;  
    for (var j=1; j<=8; j++){
      for(var i=1; i<=8; i++) {
       pos=i+''+j+'';
      numberArr.push(pos) }
    }
    return numberArr; }
    
 var numberArr=getNumberArr(); // для  перебора. чтобы искать  ["11", "21", "31...
  //console.log(numberArr)
 
 
      // для отрисовки квадратов. базовая точка
   function createGameBigSquare(){
    var letterArr=[]
     var white=[];
     var black=[];
    var countForArr=0;
    var objPos={}
     var x=sizeSmallSquareCornerWidth/2;
     var y=sizeSmallSquareCornerWidth/2;
     var chec=1; // начинаем с черного цвета, если 0
                  // с белого, если 1
                    // сверху вниз все начинаетс  "A8", "B8", "C8"...
    var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g');
    groupCircle.setAttribute("id", 'squareElem');

      for(var j=8; j>=1; j--) {
        for(var i=1; i<=8; i++){ //для столбца
          var gameRect= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          
          gameRect.setAttribute("x", x);
          gameRect.setAttribute("y", y);
          gameRect.setAttribute("width",sizeForGameSquare);
          gameRect.setAttribute("height",sizeForGameSquare );
            // вписать id каждой клетке
            pos= i+''+j+'';
          gameRect.setAttribute("id", pos);
          //добавляем в массив
          letterArr.push(pos)
          // координаты каждой клетки
          objPos[letterArr[countForArr]]={posX: x,
                                            posY:y};
          if(chec==0){  // субпиксильноепозиционирование . видны зазоры
            gameRect.setAttribute("fill", "black");
            black.push( letterArr[countForArr])
            chec=1;
          }
          else {
            gameRect.setAttribute("fill", "white");
            chec=0;
            white.push( letterArr[countForArr])
          }
          countForArr++;
          groupCircle.appendChild(gameRect);
          x+=sizeForGameSquare;
        
        }
        // для строчного  отображения
        // чтоб правильно чередовались цвета
        if(chec==0){
          chec=1;
        }
        else chec=0;

        x=sizeSmallSquareCornerWidth/2; // обнулить, вернуть коорд по Х
       y+=sizeForGameSquare;  // нарастание по оси У
      }
      start.appendChild(groupCircle);
      
    //  console.log(objPos )
    // console.log('black '+blackCell )
    // console.log('white '+whiteCell )
      return {
        blackCell: black,
        whiteCell: white,
        posForSquare :objPos
      }
   }

   // разбивка клеток по цветам
   // глобалный объект с важной информацией
  var about= createGameBigSquare();
      console.log(about )

   //вставить прямоугольники с подписями

   function createReactWithText(){
     //начальное положение
     // для вертикального текста
     var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g')
     groupCircle.setAttribute("id", 'textInfo');

    var y=sizeSmallSquareCornerWidth+sizeForGameSquare/8; // 8- количество  больших квадратов
    var x=sizeSmallSquareCornerWidth/4; // /2 их 2 штуки и еще/2 чтобысередина была
    for(var i=8; i>=1; i--){
    var txt=document.createElementNS("http://www.w3.org/2000/svg",'text');

    txt.setAttribute("x",x);
    txt.setAttribute("y",y);
    txt.style.fill="black";
    txt.style.fontSize=sizeForGameSquare*0.6;
    txt.style.textAnchor="middle";
    txt.textContent=i;
    y+=sizeForGameSquare;

    groupCircle.appendChild(txt);

   }
   //для нижнего горизонтального текста
    y=mainSizeWidth-sizeSmallSquareCornerWidth/8; //  8-подбор оптимальный
    x=sizeSmallSquareCornerWidth;
// получить символы из таблицы юникод. сразу вызвать функцию
    var letterArrForText=(function (){
      var deltaArr=[];
      for(var i=65; i<=72; i++) {
       var s=String.fromCharCode(i);
    deltaArr.push(s);
    }
    return deltaArr;
  })();
 

  //
    for(var j=0; j<=7;j++){
      var txt=document.createElementNS("http://www.w3.org/2000/svg",'text');
  
      txt.setAttribute("x",x);
      txt.setAttribute("y",y);
      txt.style.fill="black";
      txt.style.fontSize=sizeForGameSquare/2;
      txt.style.textAnchor="middle";
      txt.textContent=letterArrForText[j];
      x+=sizeForGameSquare;
      groupCircle.appendChild(txt);
   start.appendChild(groupCircle);
  }
}
  createReactWithText();


  function setFigure(){
  //  получить только черные позиции

  var blackCellGame=about.blackCell;
  var arrFigure={};
  var countForID=1;
// расставить первому игроку  сверху
// первые 12 штук
var groupFigure= document.createElementNS('http://www.w3.org/2000/svg','g');
groupFigure.setAttribute('id','figure')
// как обратиться к  нужной позициии
// узнать координаты
    for(var i=0; i<=11; i++){
     var cx=about.posForSquare[blackCellGame[i]].posX+sizeForGameSquare/2; // координаты по квадрату. верхний левый угол
     // от верхей левой точки отнимаем половину ширины клетки квадрата. чтоб знать центр по Х и У
     var cy=about.posForSquare[blackCellGame[i]].posY+sizeForGameSquare/2;
  var  bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
     
      bigCircle.setAttribute("cx", cx);
      bigCircle.setAttribute("cy",cy);
      bigCircle.setAttribute("r", figureRadius);
      bigCircle.setAttribute("fill", "aqua");
      bigCircle.setAttribute('id','aqua'+countForID)
      // добавить в объект
      arrFigure[blackCellGame[i]]={color:'aqua',
    id:'aqua'+countForID}
    countForID++;
    groupFigure.appendChild(bigCircle);
    }

    //расставить снизу. второму игроку.
    // вернуть начальное значение для счетчика
    countForID=1;

    for (var j=blackCellGame.length-1; j>=blackCellGame.length-12;j-- ){

   var  cx=about.posForSquare[blackCellGame[j]].posX+sizeForGameSquare/2; // координаты по квадрату. верхний левый угол
    //console.log(cx )
      // от верхей левой точки отнимаем половину ширины клетки квадрата. чтоб знать центр по Х и У
      var cy=about.posForSquare[blackCellGame[j]].posY+sizeForGameSquare/2;
      arrFigure[blackCellGame[j]]={color:'magenta'}

      bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
       bigCircle.setAttribute("cx", cx);
       bigCircle.setAttribute("cy",cy);
       bigCircle.setAttribute("r", figureRadius);
       bigCircle.setAttribute("fill", "magenta");
       bigCircle.setAttribute('id','magenta'+countForID)

       arrFigure[blackCellGame[j]]={color:'magenta',
       id: 'magenta'+countForID}
       countForID++;
       groupFigure.appendChild(bigCircle);
       
    }
    start.appendChild(groupFigure);
  //console.log(arrFigure)
  return arrFigure; // объект где все позиции  шашек -> 11:{color: "magenta"}
}
  // добавить в общий объект. потом распределить по игрокам
    about.arrFigure= setFigure();
  //  console.log(about)

//  перетаскивать по  экрану шашки
// элемент g куда поместила все шашки


 // добавить в глобальный объект about.кто  дамка
 about.king={}

 // учитывать в глобальном объекте, чей ход.  по очереди
 about.whoCanStep={};
 about.whoCanStep={color:true,
                  id: true, 
                  translate: true}


var conteinerFigure= document.getElementById('figure');
conteinerFigure.addEventListener('mousedown',beginerMove, false )
var countGame=0;


function beginerMove(EO){
  EO=EO|| window.event;
  console.log('следующий ход')

  // сохранять следующие доступные шаги
 // var posFigure={};

  // хранить информацию про старый ход, текущий
  var lastStepObj={};
  // хранить про следующую позицию
 var nextStepObj={};
 // для записи возможно побитой фигуры
 nextStepObj.forFightFigure={}
 // для записи отметки дамка
 // добавить в глобальный объект about
 //about.king={}

 


 // для учета типа step - normal/fight/king -1/2/3
 // первоначально все ходят нормально
 var typeStep=1;
 lastStepObj.typeStep=typeStep;
 nextStepObj.typeStep=typeStep;

  // узнать координаты клика. не скорректирванные
  var clickPageX=EO.pageX;
  var clickPageY=EO.pageY;

  // узнать координаты клика с учетом утступов, скорректиров
    var clickCoordObj= translateCoord(clickPageX,clickPageY);
    clickPageX=clickCoordObj.pageX;
    clickPageY=clickCoordObj.pageY;

  // узнать какой квадрат был выбран
  var currentIDSquare= getIDSquare(clickPageX,clickPageY );
  lastStepObj.currentIDSquare=currentIDSquare;

  //  а это фигура есть в дамках? проверить в about.king
 // console.log(about)
 // console.log(currentIDSquare)

  if( currentIDSquare in about.king ){
    lastStepObj.typeStep=3;
    nextStepObj.typeStep=3;
  }

  // сохранить первонаальную позицию. надо ли?
  
   var oldPosition={
    clickPageX: about.posForSquare[currentIDSquare].posX,
    clickPageY: about.posForSquare[currentIDSquare].posY
  }
  

  // координаы клика мыши
  var currentGigure=EO.target;
  // добавить ее в конец в DOM. проблема с Z-index решена так
  conteinerFigure.appendChild(currentGigure);

 // узнать цвет шашки и записать в оба объекта
 var colorFigure= currentGigure.getAttribute('fill');
 lastStepObj.colorFigure=colorFigure;
 nextStepObj.colorFigure=colorFigure;

 // записать в контроль хода. записать в процессе
 //  about.whoCanStep.color=colorFigure;



  // получить возможные,правильные клетки для хода. уже проверили
 
  
 nextStepObj.posFigure=legalyPos(lastStepObj.colorFigure,lastStepObj.currentIDSquare,
   lastStepObj.typeStep,"transferSquare", nextStepObj);

 //nextStepObj.posFigure=abc;
 //  а есть ли на этих позициях шашки
    if(lastStepObj.typeStep==1)
    {checFigure(lastStepObj,nextStepObj)}
    if(lastStepObj.typeStep==3){
      // вызов другого  checFigureю был в legalyPos
     // console.log(3)
    }

  // а ходила раньше фигура
  // можно походитьдважды, если на второй раз тоже что-то бьешь
  if(lastStepObj.currentIDSquare == about.whoCanStep.id){
    doubleStep(lastStepObj, nextStepObj);}

   // подсветить клетки, у которых true
   toLightSquare(nextStepObj);

   console.log(lastStepObj);
   console.log(nextStepObj);

    // записать цвет фигуры, для контроля хода
 //
 // about.whoCanStep.color=colorFigure;

   
  document.onmousemove = function(EO) {
    moveAt(EO);
  };

  function moveAt(EO){
    EO=EO|| window.event;
    var pageX=EO.pageX;
    var pageY=EO.pageY;
    var clickCoordObj= translateCoord(pageX,pageY);
   var clickPageX=clickCoordObj.pageX;
   var  clickPageY=clickCoordObj.pageY;
    currentGigure.setAttribute("cx", clickPageX);
    currentGigure.setAttribute("cy", clickPageY);
    // нужна ли  эта обводка???
    // у дамки остается белая обводка
    if(nextStepObj.typeStep==1 ||
      nextStepObj.typeStep==2){
    currentGigure.setAttribute("stroke", "red");}
    currentGigure.setAttribute('stroke-width',mainSizeWidth*0.005);

    
  
  }
  currentGigure.onmouseup = function(EO) { //когда закончилось перетаскивание
    // неудачно передавался в параметры  aboutStepObj вместе с ЕО
    EO=EO|| window.event;
    var pageX=EO.pageX;
    var pageY=EO.pageY;
  //  console.log(aboutStepObj)
  //----------------------------------------------------test

  // записать цвет фигуры, для контроля хода
  //about.whoCanStep.color=colorFigure;


    // проверить, отпущен ли клик в нужных координатах
    nextStepObj.result= whereMouseUp(pageX,pageY,nextStepObj, lastStepObj )

    about.whoCanStep.translate=false;

        
        // записать цвет фигуры, для контроля хода
 
  about.whoCanStep.color=colorFigure;
 
          
  if(nextStepObj.result.condition) {
      // обрать обводку клетки и обновить массив. скорректиров глоб объекты
    changeGameObjPosFigure(nextStepObj,lastStepObj);
  // нарисовать красиво,  по центру эту фигуру
  paintNiceFirure(currentGigure, nextStepObj,oldPosition);
    
  }
  // если неверное перемещение - вернуть на первоначальную позицию
  if(!nextStepObj.result.condition){
    paintNiceFirure(currentGigure,nextStepObj,oldPosition);

  }
  
  // стала ли фигра дамкой. естьтакая
 var haveKing= toBecomeKing(nextStepObj);
 if(haveKing ){
   console.log('рисовать корону');
   toDrawKing(nextStepObj);
 }

  // удалить на доске и в объекте
  deleteFigureOnDesk(nextStepObj);

// canDoubleStep(lastStepObj,nextStepObj );
  // то,что ниже в самую последнюю очередь
   // console.log(result)
    document.onmousemove = null;
    currentGigure.onmouseup = null;
    nextStepObj=null;
    lastStepObj=null;

  };
  
document.ondragstart = function() {
  return false;
  };
 

// проверка на  конец игры. все фигуры одного цвета остались
  if( Object.keys(about.arrFigure).length<=22){
    console.log('victory')
    victory();
  }

}
//------------------------------------ конец beginerMove

  function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
  }

      // узнать какой квадрат
 function getIDSquare(clickPageX,clickPageY ){
  var numberArr=getNumberArr(); // для  перебора. чтобы искать  ["11", "21", "31...
  // координата высчитывается так- знаю коорд верхнего левого угла
  // прибавляю размеры квадрата игрового. если клик в этом диапазоне- гуд
      for(var i=0; i<=numberArr.length-1; i++){
    var posXForSearch=about.posForSquare[numberArr[i]].posX;
      if(posXForSearch<=clickPageX && clickPageX<=posXForSearch+sizeForGameSquare){
        var posYForSearch=about.posForSquare[numberArr[i]].posY;
          if(posYForSearch<=clickPageY && clickPageY<=posYForSearch+sizeForGameSquare )
        return numberArr[i];
      }
  }
 }
    // проверка хоа. есть ли на этих клетках другие шашки. еще на двойной ход сделать
    // ее дописать
  function checFigure(lastStepObj,nextStepObj){
    var posFigure={}
        //какие позиции предлагает
        // вернуть нормальный тип хода
      //  lastStepObj.typeStep==1;
    // массив из допустимых ходов
    var posForStepArr=Object.keys(nextStepObj.posFigure);
  //  console.log(nextStepObj.posFigure)

    // есть ли на этих позициях шашки
    /*
    if(lastStepObj.typeStep==3){
      console.log('typeStep=3')
      // другая  checFigure для  king
      return;
    }
    */
    for( var i=0; i<=posForStepArr.length-1; i++){
      if (posForStepArr[i] in about.arrFigure  ){
      //  console.log(posForStepArr[i])

              // если шашка такого же цвета
              // 2 позиции. стандартные. +1 клетка в стороны

              // стоит фигура на этой клетке такого же цвета

        if(about.arrFigure[posForStepArr[i]].color==nextStepObj.colorFigure){
          nextStepObj.posFigure[posForStepArr[i]].condition=false;
        }
        // если шашка другого цвета,то подсветить на клетку больше
        
        else if( about.arrFigure[posForStepArr[i]].color!=nextStepObj.colorFigure ){
          // не подходит  эта позиция, зафиксировать
          lastStepObj.typeStep=2;

          nextStepObj.posFigure[posForStepArr[i]].condition=false;


          // узнать другую позицию. следующую

          // здесь новая позиция. а есть ли здесь фигура
         var posFigure= legalyPos(lastStepObj.colorFigure,lastStepObj.currentIDSquare,
             lastStepObj.typeStep,posForStepArr[i],nextStepObj );
           //  console.log(posFigure)

             // вернул одну позицию. узнать ключ
             var nextForStep=Object.keys(posFigure);
            // console.log(posFigure)

             if((nextForStep[0] in about.arrFigure)!=true ){
               // если нет фигуры. нужна эта позиция
               nextStepObj.posFigure[nextForStep[0]]={condition:true};
               // записать для nextStepObj.forFightFigure  в значении-куда надо встать,чтобы убрать
               

               nextStepObj.forFightFigure[nextForStep[0]]=posForStepArr[i] ;

             //  nextStepObj.forFightFigure[posForStepArr[i]]={[nextForStep[0]]:true} ;

             }
        }
      }
    }
   // return aboutStepObj;
   //lastStepObj.typeStep=1;
  }

    // узнать клетки, куда могу ходить

   function legalyPos(colorFigure, currentIDSquare,typeStep, transferSquare,nextStepObj){
     var forNextStep=[];
     // перевод в число
     transferSquare=+transferSquare;
     currentIDSquare=+currentIDSquare;
     // надо ли тут posFigure.по идее - да
     var posFigure={};
    // удалить опредыдущем  ходе, если другой цвет
     if(about.whoCanStep.color!= colorFigure){
      about.whoCanStep.id=true;
     }
     
     // если цвета совпадают. повторный ход недопустить (но если бил  до этого - нужно пропустить)
     //одинаковые цвета?
     // била до этого?
     // от случайных ходов не спасает.
     console.log(about)

     if((about.whoCanStep.color== colorFigure && currentIDSquare!=about.whoCanStep.id &&
      about.whoCanStep.translate==true ) 
     
     

      
    ){
      posFigure[currentIDSquare]={condition:true};
      console.log('вы уже ходили ')
      return posFigure;


     }
     

    // узнать клетки, куда могу ходить
    // обычный ход
       if(typeStep==1)   {
    if(colorFigure=='magenta'){
      forNextStep.push(currentIDSquare-10+1, currentIDSquare+10+1);
    }

    if(colorFigure=='aqua'){
      forNextStep.push(currentIDSquare-10-1, currentIDSquare+10-1);
    }
  }
//--------------------------------
// вызов из checkFigure
    if(typeStep==2 ){
     // console.log('currentIDSquare')

      if(colorFigure=='magenta'){
        // в левую сторону
        if(transferSquare<currentIDSquare ){
        forNextStep.push(currentIDSquare-20+2);}
        // в правуюсторону
        if(transferSquare>currentIDSquare ){
          forNextStep.push(currentIDSquare+20+2);}

        }
        // другой цвет фигуры
      if(colorFigure=='aqua'){
        if(transferSquare<currentIDSquare){
          forNextStep.push(currentIDSquare-20-2);
       }
        if(transferSquare> currentIDSquare)
          forNextStep.push( currentIDSquare+20-2);
        }
      }
// ходит дамка

      if(typeStep==3){
        // изменяются  клетки  -9 +9 -11 +11
        forNextStep= forNextStep.concat(  (toFindPosForKing(currentIDSquare, 9,colorFigure,nextStepObj )) )
        console.log(forNextStep)
        console.log(nextStepObj)

        // здесь  хорошо проверять. разбито по 4-ем направлениям

        forNextStep= forNextStep.concat((toFindPosForKing(currentIDSquare, -9,colorFigure,nextStepObj )))

        forNextStep= forNextStep.concat((toFindPosForKing(currentIDSquare, 11,colorFigure ,nextStepObj)))

        forNextStep= forNextStep.concat((toFindPosForKing(currentIDSquare, -11,colorFigure ,nextStepObj)))

       // console.log(forNextStep)
    }

    //вернуть адекватные значения
    // если выходит за рамки, вписать текущее
    // можно ли  эту запись сделать красивее?
     forNextStep.filter((v)=>{if(10<v && v<89 && v!=20 && v!=30 &&
    v!=40 && v!=50 && v!=60 && v!=70 && v!=80 && v!=19 && v!=29 &&
    v!=39 && v!=49 && v!=59 && v!=69 && v!=79 ){posFigure[v]={condition:true} } });
    // узнать есть ли там вообще допустимые значения
    var forLenghtPosFigure=Object.keys(posFigure);
    if (forLenghtPosFigure.length==0){
      // если был пуст, записать предыдущую позицию
      posFigure[currentIDSquare]={condition:true}
    }
    // не  вносить изменения  в глоб объект nextStepObj
    /*
    if(typeStep==2){
      return posFigure;

    }
    */
    // записать глобально
  //  nextStepObj.posFigure=posFigure;
   return posFigure;
   }

   function doubleStep(lastStepObj, nextStepObj){
     //фигуры побитые есть при возможных ходах
     var forFight=Object.keys(nextStepObj.forFightFigure)
    // есть ли эта фигра/клетка в записи  whoCanStep
    if((lastStepObj.currentIDSquare == about.whoCanStep.id) &&
    forFight.length!=0 ){
    //  console.log('верный ход')

    }
    else {
      //console.log('неверный ход. обработать');
    //если нечего бить, то в каждую допустимую позицию для хода condition=false
    // и ходить некуда
    var badPos=Object.keys(nextStepObj.posFigure);
   // console.log(badPos)

    for(var i=0; i<=badPos.length-1; i++){
      nextStepObj.posFigure[badPos[i]].condition=false;
    }
}
   }


// функция для посиска клеток для дамки
  function toFindPosForKing(currentIDSquare, changeNumber, colorFigure,nextStepObj ){
    var saveCurrentIDSquare=currentIDSquare;
    var arr=[]
    while(saveCurrentIDSquare>10 && saveCurrentIDSquare<89 ){
      saveCurrentIDSquare=saveCurrentIDSquare+changeNumber;
      // если выполняется условие
       // проверка на допустимые значения
       // и есть ли такая клетка вообще
      if( saveCurrentIDSquare>10 && saveCurrentIDSquare<89 &&
        (saveCurrentIDSquare in about.posForSquare)==true   ){
          // если она существует, то проверим, где на пути первая фигура

          if(saveCurrentIDSquare in about.arrFigure  ){
            // вынести информацию по этой фигуре
           var fistFigureByWay=about.arrFigure[saveCurrentIDSquare];
           // проверить цвета. свой или нет
              if(fistFigureByWay.color==colorFigure){
              // совпадают. нет смысла считать дальше. не добавлять в массив
              return arr;
               }
          // если не совпадают цвета - вернуть на позицию больше и уйти из функции
          // но проверить что на следующей клетке, есть ли фигура
          // saveCurrentIDSquare+changeNumber+changeNumber
              else if(fistFigureByWay.color!=colorFigure )        {
                               
                // следующая клетка
                var abc=saveCurrentIDSquare+changeNumber;
                // чтобы избежать в nextStepObj.forFightFigure --> 20:31
                // несуществующая ячейка

                if( !(abc in about.posForSquare )){
                  return arr;
                }
                // если есть, выход
                else if(abc in about.arrFigure ){
                  return arr;
                }
               
            // проверить следующую клетку
          // добавить к тем, которые можно бить
          console.log(nextStepObj)
         // nextStepObj.forFightFigure={[saveCurrentIDSquare]: true}
                
          nextStepObj.forFightFigure[abc]=saveCurrentIDSquare ;
            arr.push(saveCurrentIDSquare+changeNumber);
            return arr;
              }
          
          }

       // добавить
       arr.push(saveCurrentIDSquare);

      }
      // иначе выход
      else  saveCurrentIDSquare=0;
  }
 // console.log(arr)
return arr;
  }


   // в пределах ли клетка поля находится

        // подсветить клетки, у которых true
   function toLightSquare(nextStepObj){
        // подсветить клетки, у которых true
        var squareIDForAttention=Object.keys(nextStepObj.posFigure);
        // console.log(squareIDForAttention)
     
         for(var i=0; i<=squareIDForAttention.length-1; i++){
           if(nextStepObj.posFigure[squareIDForAttention[i]].condition==true ){
           elem=document.getElementById(squareIDForAttention[i]);
           if(elem==null){
           return }
     
           elem.setAttribute('stroke','red');
           elem.setAttribute('stroke-width',mainSizeWidth*0.005);

          }
         }
         
       // дописать координаты этих клеток. а нужно ли?
         for( var j=0; j<=squareIDForAttention.length-1; j++){
          nextStepObj.posFigure[squareIDForAttention[j]].posX=
           about.posForSquare[squareIDForAttention[j]].posX;
           nextStepObj.posFigure[squareIDForAttention[j]].posY=
           about.posForSquare[squareIDForAttention[j]].posY;
         }
   }

   function translateCoord(pageX,pageY){
      // получить размеры дива для svg элемента
  var widthConteinerDiv=gameDiv.offsetWidth;
  var offsetLeftGameDiv=gameDiv.offsetLeft;
  var offsetTopGameDiv=gameDiv.offsetTop;
  // пересчет масштаба с учетом поправки/корректировки
var delta=widthConteinerDiv/mainSizeWidth;
  // узнать координаты клика с учетом утступов
 var   clickPageX=(pageX-offsetLeftGameDiv)/delta;
  var  clickPageY=(pageY-offsetTopGameDiv)/delta;
  return {
    pageX: clickPageX,
    pageY: clickPageY
  }
   }

   // проверить, отпущен ли клик в нужных координатах
   function whereMouseUp(pageX,pageY,nextStepObj, lastStepObj ){
     // получить скорректиров координ
    var clickCoordObj= translateCoord(pageX,pageY);
    var clickPageX=clickCoordObj.pageX;
    var  clickPageY=clickCoordObj.pageY;
    // проверка где отпущен  клик
    var squareIDForAttention=Object.keys(nextStepObj.posFigure);
    //console.log(squareIDForAttention )
    for(var i=0; i<=squareIDForAttention.length-1; i++){

    if(nextStepObj.posFigure[squareIDForAttention[i]].condition==true ){
      if(clickPageX>= nextStepObj.posFigure[squareIDForAttention[i]].posX &&
         clickPageX<=nextStepObj.posFigure[squareIDForAttention[i]].posX+sizeForGameSquare &&
         clickPageY>= nextStepObj.posFigure[squareIDForAttention[i]].posY &&
         clickPageY<=nextStepObj.posFigure[squareIDForAttention[i]].posY+sizeForGameSquare
        ){
          return {condition:true,
                  newPositionID:squareIDForAttention[i]   } 
     // else return false;
    }
   else continue;
  }
   }
   // эту ошибку обработать.более точно
   //отпущен клик не в подсвеченных элементах
   console.log('клик не в новом квадрате отпущен');
   deleteStrokeOnFigure(nextStepObj);
  // about.whoCanStep.color=true;
  // неосторожный  ход. дать еще один шанс
  /*
  //реализовано в дополнит функции canDoubleStep
  //----------------------------------------------------------------
if(lastStepObj.currentIDSquare in nextStepObj.posFigure){
  
 // console.log('eeee')
   about.whoCanStep.color=true;
}
*/
  return {condition:false,
          newPositionID:false} }


  //красиво нарисовать в центре
   function   paintNiceFirure(figureDOM, nextStepObj,oldPosition){
    // для более удобного  доступа
    var newPositionID =nextStepObj.result.newPositionID
   // console.log(newPositionID);
     //если хреново передвинули. оставили не там
     if(nextStepObj.result.newPositionID==false ){
      var PageX=oldPosition.clickPageX+sizeForGameSquare/2;
      var PageY=oldPosition.clickPageY+sizeForGameSquare/2;
   
      figureDOM.setAttribute("cx", PageX);
      figureDOM.setAttribute("cy", PageY);
      return;

     }
   // координ верхнего левого угла клетки игровой
   var posX=nextStepObj.posFigure[newPositionID].posX;
   var posY=nextStepObj.posFigure[newPositionID].posY;
   // в середине будет с учетомполовины клетки
    PageX=posX+sizeForGameSquare/2;
    PageY=posY+sizeForGameSquare/2;

   figureDOM.setAttribute("cx", PageX);
   figureDOM.setAttribute("cy", PageY);
   }

     // убрать обводку клетки и обновить массив. скорректиров глоб объекты
    function changeGameObjPosFigure(nextStepObj,lastStepObj){
          // подсветить клетки, у которых true
    var squareIDForAttention=Object.keys(nextStepObj.posFigure);
    // console.log(squareIDForAttention)
 var newPositionID =nextStepObj.result.newPositionID
     for(var i=0; i<=squareIDForAttention.length-1; i++){
       if(nextStepObj.posFigure[squareIDForAttention[i]].condition==true ){
       elem=document.getElementById(squareIDForAttention[i]);
       elem.setAttribute('stroke','black');}
     }
 // перезаписать положение с учетом перемещения клетки
 // какой цвет был
    var whichColorWas= about.arrFigure[lastStepObj.currentIDSquare];
    // console.log(newPositionID);
    // var abc=lastStepObj.currentIDSquare
  //   console.log(about.arrFigure[11]);

     delete about.arrFigure[lastStepObj.currentIDSquare];

     // а были перемещения фигур на игровом поле верные, тогда  true и ходит следующий
    
    about.whoCanStep.translate=true;
    

     // записать новый
     about.arrFigure[newPositionID]=whichColorWas;
     // скорректировать king
     if(lastStepObj.typeStep==3){
      //  была ли эта позиция раньше в массиве 
         if  (lastStepObj.currentIDSquare in about.king){
           //  значение ключа для этой позиции(цвет, id)
           var newPosForKing=about.king[lastStepObj.currentIDSquare];
            //удалить
           delete about.king[lastStepObj.currentIDSquare ]
           //записать новую
           about.king[nextStepObj.result.newPositionID]=newPosForKing;
         }
     }

    }
 
// убрать обводку
 function deleteStrokeOnFigure(nextStepObj){
        var squareIDForAttention=Object.keys(nextStepObj.posFigure);
      // console.log(squareIDForAttention)
         
      for(var i=0; i<=squareIDForAttention.length-1; i++){
      if(nextStepObj.posFigure[squareIDForAttention[i]].condition==true ){
    elem=document.getElementById(squareIDForAttention[i]);
    if(elem==null){
    return false;}
     elem.setAttribute('stroke','black');}
             }
 }

 // стала ли дамкой фигура
function toBecomeKing (nextStepObj){
  // если дошла фигура до крайних клеток - это вторая цифра=1 или8
  // узнать позицию, куда в итоге стала фигура
 var newPos= nextStepObj.result.newPositionID;
 //переводв строку
 var posStr=newPos+'';
  if(posStr[1]==1 || posStr[1]==8) { 
     if((nextStepObj.colorFigure=='magenta' && posStr[1]==8) ||
      (nextStepObj.colorFigure=='aqua' && posStr[1]==1  )  ){
        nextStepObj.king={[newPos]:nextStepObj.colorFigure }
        // записать данные в глоб объект, чтобы и в след ход видеть кто дамка
        // позиция на поле, цвет, ее id
        var abc={};
         abc=nextStepObj.result.newPositionID;
        about.king[abc]={color: nextStepObj.colorFigure,
          id: about.arrFigure[nextStepObj.result.newPositionID].id
        }
    console.log('king')
    console.log(about)

      return true;
    }
  }
  return false;
}

function toDrawKing(nextStepObj){
  

  var whoIsKing=Object.keys(nextStepObj.king); //["68"] всегда одно значение, текущее
  console.log(whoIsKing);
  // найти квадрат, куда стала
  var elemToSquare=nextStepObj.result.newPositionID;
// узнать id фигуры, что стоит там. сделать белый ободок
  var elemKing=document.getElementById(about.arrFigure[elemToSquare].id);
  elemKing.setAttribute('stroke-width',mainSizeWidth*0.008);
  elemKing.setAttribute('stroke','white');
}

function canDoubleStep(lastStepObj,nextStepObj ){
  //не было впринципе корректного хода
  if(nextStepObj.result.condition==false){
    about.whoCanStep.color=true;
  }

}


// удаляю фигуру с доски и удаляю из  about.arrFigure

 function deleteFigureOnDesk(nextStepObj){




  var checForFight=Object.keys(nextStepObj.forFightFigure);
  // проверка, есть ли что бить
  //  console.log(checForFight)
    if(checForFight.length==0 || nextStepObj.result.newPositionID==false ){
      return;
    }
    // когда игноришь,что нужно бить
    
    if( nextStepObj.result.newPositionID!=checForFight[0] &&
      //если возращается 2 варианта, то не выбирать постоянн второй. нужно для этого усл. ниже
      checForFight.length==1){
      return;
    }

    
   var deleteThisFigure=nextStepObj.forFightFigure[nextStepObj.result.newPositionID];
  // console.log(deleteThisFigure)

   var deleteFigureID=about.arrFigure[deleteThisFigure].id;
    console.log(deleteFigureID)
     var elem=document.getElementById(deleteFigureID);

   // фигура побита. значит эта фигура может ходить еще раз. записать ее данныею в какой  клетке
   var plusStep=nextStepObj.result.newPositionID;
  // var plusStep=about.arrFigure[nextStepObj.result.newPositionID].id;

   about.whoCanStep.id=plusStep;
   console.log(about)




     // тестовый подсчет очков
     countGame++;
      elem.setAttribute('class','aaa');
   //запланировать удаление
    setTimeout (function() { elem.setAttribute('display','none');  }, 1000);
   
   console.log(countGame)
// удалить из глобального объекта
 delete about.arrFigure[deleteThisFigure]

 // проверка ее в king
 if(deleteThisFigure in about.king){
   delete about.king[deleteThisFigure]
   console.log('del king')
 }
 }

 // закончилась ли игра?
 // определить победителя
 function victory() {

  var arrOfColor=Object.keys(about.arrFigure);

  // если все одинаковые цвета остались,сообщить о победе
   function whichColorMagenta(v,i,a){
    
       return v="magenta";}

     function whichColorAqua(v,i,a){
    
     return v="aqua";}
    
      // кто первый даст true, тот и выиграл
   var answerMagenta=arrOfColor.every(whichColorMagenta);
   var answerAqua=arrOfColor.every(whichColorAqua);

  if(answerMagenta==true){
    return "magenta";
  }
  if(answerAqua==true){
    return "aqua";
  }

 }


