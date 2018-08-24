
  // описание констант
  // размеры для div-container
  var divContainerWidth=300;
  var divContainerHeight=300;

  // для DOM-элементов
  var widthBigCircleDom=200;
  var heightBigCircleDom=200;

  var smalClock=20; // размер малых кружков для цифр.из CSS class: .background_small
  
  var startCenterX=widthBigCircleDom/2; // центр по Х для любых вращений и построений 
  // относительного большого, фоного круга

var startCenterY=heightBigCircleDom/2; // центр по У для любых вращений и построений
       // относительного большого, фоного круга
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var valueRadius=heightBigCircleDom*0.43; // удаление от центра  малых кружов. задаем меньше половины высоты, 42%
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var centerArrowX=widthBigCircleDom/2;
var centerArrowY=heightBigCircleDom/2;

  //общие
      // размеры стрелок
      var secondArrowHeight=widthBigCircleDom*0.42;
      var secondArrowWidth=2;
      
      var minuteArrowHeight=secondArrowHeight*0.8;
      var minuteArrowWidth=4;
      
      var hourArrowHeight=minuteArrowHeight*0.65;
      var hourArrowWidth=6;
      
        var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
        // секунду смещение/поворот на 6 градусов
        var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
            // проходит 3600 секунд,то есть  умножить на 360/3600
        var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
            // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
            // за 1 секунду 360/43200
        var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается
      

  // ------------------------------view DOM

  function ClockViewWebPage() {
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка
    var self=this;
    this.start=function(model,field) {
        myModel=model;
        myField=field;

          // создать кнопки
    self.startBt=document.createElement('input');
    self.startBt.type='button';
    self.startBt.value='Пуск';
    self.startBt.className='startBt';

    self.stopBt=document.createElement('input');
    self.stopBt.type='button';
    self.stopBt.value='Стоп';
    self.stopBt.className='stopBt';

    self.cityTime=document.createElement('span');
    self.cityTime.innerHTML=myModel.city+'  GMT ' +myModel.objCity[myModel.city];


    myField.appendChild(self.startBt);
    myField.appendChild(self.stopBt);
    myField.appendChild(self.cityTime);

        // задать нужные размеры myField
        myField.style.width=divContainerWidth+'px';
        myField.style.height=divContainerHeight+'px';

          // задать фон. большой круг
          self.start= document.createElement('DIV'); //основной фоновый циферблат, большой
          self.start.className='background_main';
          self.start.id='start';
          //задать размеры и отобразить
          self.start.style.width=widthBigCircleDom+'px';
          self.start.style.height=heightBigCircleDom+'px';
          self.start.style.left=divContainerWidth/2-widthBigCircleDom/2+'px';
          self.start.style.top=divContainerHeight-heightBigCircleDom +'px';

        myField.appendChild(self.start);


        //сделать маленькие кружки
        self.clockDiv=document.createElement('DIV'); // хранилище для маленьких кружочков. чтобы единовременно все ставить в DOM 
        self.elem=[] // массив малых кружков
         for (var i=1; i<=12; i++){
        self.elem[i]= document.createElement('DIV');
        self.elem[i].style.width=smalClock+'px';
        self.elem[i].style.height=smalClock+'px';
        self.elem[i].innerHTML=i; // записываем  цифру
        self.elem[i].className='background_small';
        self.clockDiv.appendChild(self.elem[i]); // добавляем в промежуточный DIV 
 
     // задать положение малеким кружочкам
     self.pos( self.elem[i],valueRadius, valueAngle ); 
     valueAngle+=stepAngle;
     }
     self.start.appendChild(self.clockDiv); // добавляю в DOM все созданные малые кружочки

     //создать стрелки и вставить  в containerElem
     self.secondElem=document.createElement('div');
     self.secondElem.className='second';
     self.secondElem.style.width=secondArrowWidth+'px';
     self.secondElem.style.height=secondArrowHeight+'px';
     self.start.appendChild(self.secondElem); 

     self.minuteElem=document.createElement('div');
     self.minuteElem.className='minute';
     self.minuteElem.style.width=minuteArrowWidth+'px';
     self.minuteElem.style.height=minuteArrowHeight+'px';
     self.start.appendChild(self.minuteElem); 

     self.hourElem=document.createElement('div');
     self.hourElem.className='hour';
     self.hourElem.style.width=hourArrowWidth+'px';
     self.hourElem.style.height=hourArrowHeight+'px';
     self.start.appendChild(self.hourElem); 

     //изначально расположить на 12 часов
     self.secondElem.style.left= centerArrowX+ secondArrowWidth/2 +'px';
     self.secondElem.style.top= centerArrowY-secondArrowHeight +'px';
  
     self.minuteElem.style.left= centerArrowX + minuteArrowWidth/2+'px';
     self.minuteElem.style.top= centerArrowY-minuteArrowHeight +'px';
     
     self.hourElem.style.left= centerArrowX + hourArrowWidth/2+'px';
     self.hourElem.style.top= centerArrowY-hourArrowHeight +'px';
    
    }
    self.pos=function(elem, valueRadius, valueAngle){
      //  получаем начальный угол и радиус
      var radius=parseFloat(valueRadius);
      var angle=parseFloat(valueAngle)/180*Math.PI;
      // через sin and cos  узнаем смщение элемента по осям Х и У
      var elemCenterX=startCenterX+ radius*Math.sin(angle);
      var elemCenterY=startCenterY-radius*Math.cos(angle);
      //  прописываем в style  новое положениес учетом размера малого кружка deltaSmalClock
      elem.style.left=Math.round(elemCenterX - smalClock/2)+'px';
      elem.style.top=Math.round(elemCenterY-smalClock/2)+'px';


    }

    self.mathPositionClock=function (myModel) {


      return {
          secondAngel: myModel.objDate.countSeconds*koeffSecond,  //здесь вычисляется угол поворота стрелки 
          minuteAngel: myModel.objDate.countMinutes*koeffMinute, // в зависимости от времени
          hourAngel: myModel.objDate.countHours*koeffHour+myModel.objDate.countMinutes*deltaKoeffHour
      }
    }
    
    self.update=function() {
  self.positionForClock= self.mathPositionClock( myModel);

      // повернуть стрелки
      
      self.secondElem.style.transform='rotate('+self.positionForClock.secondAngel+'deg)';  // заставляем повернуть на нужный угол
      self.minuteElem.style.transform='rotate('+self.positionForClock.minuteAngel+'deg)';
      self.hourElem.style.transform='rotate('+self.positionForClock.hourAngel+'deg)';

    }

};
