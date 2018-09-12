var conteinerFigure= document.getElementById('figure');
conteinerFigure.addEventListener('mousedown',beginerMove, false )



function beginerMove(EO){
  EO=EO|| window.event;
  // сохранять следующие доступные шаги
  var posFigure={};

  // хранить информацию про старый ход, текущий
  var lastStepObj={};
  // хранить про следующую позицию
 var aboutStepObj={};
 // для учета типа step - normal/fight/double/king -1/2/3/4
 
 //aboutStepObj.typeStep=1;
 lastStepObj.typeStep=1;
 // побита шашка. ее перескакиваешь
 aboutStepObj.victory={};
  // узнать координаты клика. не скорректирванные
  var clickPageX=EO.pageX;
  var clickPageY=EO.pageY;

  // узнать координаты клика с учетом утступов, скорректиров
    var clickCoordObj= translateCoord(clickPageX,clickPageY);
    clickPageX=clickCoordObj.pageX;
    clickPageY=clickCoordObj.pageY;

       // узнать какой квадрат
  var currentIDSquare= getIDSquare(clickPageX,clickPageY );

  // сохранить первонаальную позицию
   var oldPosition={
    clickPageX: about.posForSquare[currentIDSquare].posX,
    clickPageY: about.posForSquare[currentIDSquare].posY
  }

  // координаы клика мыши
  var currentGigure=EO.target;
  // добавить ее в конец в DOM. проблема с Z-index решена так
  conteinerFigure.appendChild(currentGigure);

 // узнать цвет шашки
 var colorFigure= currentGigure.getAttribute('fill');
 // console.log( colorFigure )

  // записать информацию простарый ход
  lastStepObj.oldPosition=oldPosition;
  lastStepObj.currentIDSquare=currentIDSquare;
  lastStepObj.colorFigure=colorFigure;
  console.log(lastStepObj )

  // подсветить, куда можно ходить
  // заполняю информацией про варианты следующего хлда
 // вернули позиции.  куда можно - true, коорднаты этих элементов
 aboutStepObj.colorFigure=colorFigure;
   aboutStepObj=legalyPos(lastStepObj,aboutStepObj);
       // проверка. есть ли на этих клетках другие шашки
       var answerFromCheckFigure=checFigure(aboutStepObj,lastStepObj);
       if(answerFromCheckFigure==false){
         // если дохожу до края, вписать исходную клетку для следующего хода. 
         //даже без вписывания координат той клетки
         posFigure[lastStepObj.currentIDSquare]={condition:true};
         aboutStepObj.posFigure=posFigure;
       }
       else{
         aboutStepObj=answerFromCheckFigure;
       }
   
   // подсветить клетки, у которых true
   toLightSquare(aboutStepObj);


// 

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
    currentGigure.setAttribute("stroke", "red");
  
  }
  currentGigure.onmouseup = function(EO) { //когда закончилось перетаскивание
    // неудачно передавался в параметры  aboutStepObj вместе с ЕО
    EO=EO|| window.event;
    var pageX=EO.pageX;
    var pageY=EO.pageY;
    console.log(aboutStepObj)

    // проверить, отпущен ли клик в нужных координатах
    aboutStepObj.result= whereMouseUp(pageX,pageY,aboutStepObj )

  if(aboutStepObj.result.condition) {
      // обрать обводку клетки и обновить массив. скорректиров глоб объекты
    changeGameObjPosFigure(aboutStepObj,lastStepObj);
  // нарисовать красиво,  по центру эту фигуру
  paintNiceFirure(currentGigure, aboutStepObj,oldPosition);
    
  }
  // если неверное перемещение - вернуть на первоначальную позицию
  if(!aboutStepObj.result.condition){
    paintNiceFirure(currentGigure,aboutStepObj,oldPosition);

  }
   // console.log(result)
    document.onmousemove = null;
    currentGigure.onmouseup = null;
    aboutStepObj=null;
    lastStepObj=null;

  };
  
document.ondragstart = function() {
  return false;
};

  
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
  function checFigure(aboutStepObj,lastStepObj){
        //какие позиции предлагает
        // вернуть нормальный тип хода
      //  lastStepObj.typeStep==1;

    var posForSquareArr=Object.keys(aboutStepObj.posFigure);
    // если  дошла шашка до края и следующей клетки нет , вперед нет
    if( posForSquareArr.length==0){
      return false;
    }
   // console.log(posForSquareArr);
    // есть ли на этих позициях шашки
    for( var i=0; i<=posForSquareArr.length-1; i++){
      if (posForSquareArr[i] in about.arrFigure  ){
              // если шашка такого же цвета
        if(about.arrFigure[posForSquareArr[i]].color==aboutStepObj.colorFigure){
          aboutStepObj.posFigure[posForSquareArr[i]].condition=false;
        }
        // если шашка другого цвета,то подсветить на клетку больше
        
        else if( about.arrFigure[posForSquareArr[i]].color!=aboutStepObj.colorFigure ){
          // вызвать  legalyPos. обновить позицию допустипую для хода
          // менять тип хода
          var whereFigure=posForSquareArr[i];
          console.log(whereFigure+'haaa')
        // lastStepObj.typeStep=2;
       //  legalyPos(lastStepObj, aboutStepObj,whereFigure)
        }
        


      }
    }
    return aboutStepObj;
  }

    // узнать клетки, куда могу ходить
   function legalyPos(lastStepObj, aboutStepObj,whereFigure){
     var forNextStep=[];
     var posFigure={};

    // var aboutStepObj={}
    // узнать клетки, куда могу ходить
    // обычный ход
       if(lastStepObj.typeStep==1)   {
    if(aboutStepObj.colorFigure=='magenta'){
      forNextStep.push(+lastStepObj.currentIDSquare-10+1, +lastStepObj.currentIDSquare+10+1);
    }

    if(aboutStepObj.colorFigure=='aqua'){
      forNextStep.push(+lastStepObj.currentIDSquare-10-1, +lastStepObj.currentIDSquare+10-1);
    }
   // console.log(forNextStep)
  
  }
//--------------------------------
/*
    if(lastStepObj.typeStep==2 ){
      if(aboutStepObj.colorFigure=='magenta'){
        // в левую сторону
        if(whereFigure<lastStepObj.currentIDSquare ){
        forNextStep.push(+lastStepObj.currentIDSquare-20+2);}
        // в правуюсторону
        if(whereFigure>lastStepObj.currentIDSquare ){
          forNextStep.push(+lastStepObj.currentIDSquare+20+2);}

        }
        // другой цвет фигуры
      if(aboutStepObj.colorFigure=='aqua'){
        if(whereFigure<lastStepObj.currentIDSquare){
          forNextStep.push(+lastStepObj.currentIDSquare-20-2);
       }
        if(whereFigure> lastStepObj.currentIDSquare)
          forNextStep.push( +lastStepObj.currentIDSquare+20-2);
        }
        console.log(forNextStep)

      }
      */
    //вернуть адекватные значения
    // если выходит за рамки, вписать текущее
    // можно ли  эту записьсделать красивее?
     forNextStep.filter((v)=>{if(10<v && v<89 && v!=20 && v!=30 &&
    v!=40 && v!=50 && v!=60 && v!=70 && v!=80 && v!=19 && v!=29 &&
    v!=39 && v!=49 && v!=59 && v!=69 && v!=79 ){posFigure[v]={condition:true} } });
     aboutStepObj.posFigure=posFigure;

   // console.log(posFigure)
   return aboutStepObj;

    
   }

   

        // подсветить клетки, у которых true
   function toLightSquare(aboutStepObj){
        // подсветить клетки, у которых true
        var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
        // console.log(squareIDForAttention)
     
         for(var i=0; i<=squareIDForAttention.length-1; i++){
           if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
           elem=document.getElementById(squareIDForAttention[i]);
           if(elem==null){
           return }
     
           elem.setAttribute('stroke','red');}
         }
         
       // дописать координаты этих клеток. а нужно ли?
         for( var j=0; j<=squareIDForAttention.length-1; j++){
           aboutStepObj.posFigure[squareIDForAttention[j]].posX=
           about.posForSquare[squareIDForAttention[j]].posX;
           aboutStepObj.posFigure[squareIDForAttention[j]].posY=
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
   function whereMouseUp(pageX,pageY,aboutStepObj ){
     // получить скорректиров координ
    var clickCoordObj= translateCoord(pageX,pageY);
    var clickPageX=clickCoordObj.pageX;
    var  clickPageY=clickCoordObj.pageY;
    // проверка где отпущен  клик
    var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
    //console.log(squareIDForAttention )
    for(var i=0; i<=squareIDForAttention.length-1; i++){

    if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
      if(clickPageX>= aboutStepObj.posFigure[squareIDForAttention[i]].posX &&
         clickPageX<=aboutStepObj.posFigure[squareIDForAttention[i]].posX+sizeForGameSquare &&
         clickPageY>= aboutStepObj.posFigure[squareIDForAttention[i]].posY &&
         clickPageY<=aboutStepObj.posFigure[squareIDForAttention[i]].posY+sizeForGameSquare
        ){
          return {condition:true,
                  newPositionID:squareIDForAttention[i]   } 
     // else return false;
    }
   else continue;
  }
   }
   // эту ошибку обработать.более точно
   console.log('alarm');
   deleteStrokeOnFigure(aboutStepObj)
  return {condition:false,
          newPositionID:false} }


  //красиво нарисовать в центре
   function   paintNiceFirure(figureDOM, aboutStepObj,oldPosition){
    // для более удобного  доступа
    var newPositionID =aboutStepObj.result.newPositionID

     //если хреново передвинули. оставили не там
     if(aboutStepObj.result.newPositionID==false ){
      var PageX=oldPosition.clickPageX+sizeForGameSquare/2;
      var PageY=oldPosition.clickPageY+sizeForGameSquare/2;
   
      figureDOM.setAttribute("cx", PageX);
      figureDOM.setAttribute("cy", PageY);
      return;

     }
   // координ верхнего левого угла клетки игровой
   var posX=aboutStepObj.posFigure[newPositionID].posX;
   var posY=aboutStepObj.posFigure[newPositionID].posY;
   // в середине будет с учетомполовины клетки
    PageX=posX+sizeForGameSquare/2;
    PageY=posY+sizeForGameSquare/2;

   figureDOM.setAttribute("cx", PageX);
   figureDOM.setAttribute("cy", PageY);
   }


     // убрать обводку клетки и обновить массив. скорректиров глоб объекты
    function changeGameObjPosFigure(aboutStepObj,lastStepObj){
          // подсветить клетки, у которых true
    var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
    // console.log(squareIDForAttention)
 var newPositionID =aboutStepObj.result.newPositionID
     for(var i=0; i<=squareIDForAttention.length-1; i++){
       if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
       elem=document.getElementById(squareIDForAttention[i]);
       elem.setAttribute('stroke','black');}
     }
 // перезаписать положение с учетом перемещения клетки
 // какой цвет был
    var whichColorWas= about.arrFigure[lastStepObj.currentIDSquare];
     console.log(newPositionID);
    // var abc=lastStepObj.currentIDSquare
  //   console.log(about.arrFigure[11]);

     delete about.arrFigure[lastStepObj.currentIDSquare];
     // записать новый
     about.arrFigure[newPositionID]=whichColorWas;
     // работает удаление и добавление
     console.log(about)
    }
 
// убрать обводку
 function deleteStrokeOnFigure(aboutStepObj){
        var squareIDForAttention=Object.keys(aboutStepObj.posFigure);
      // console.log(squareIDForAttention)
         
      for(var i=0; i<=squareIDForAttention.length-1; i++){
      if(aboutStepObj.posFigure[squareIDForAttention[i]].condition==true ){
    elem=document.getElementById(squareIDForAttention[i]);
    if(elem==null){
    return false;}
     elem.setAttribute('stroke','black');}
             }
        

 }
