
  // описание констант
  // размеры для div-container
  var divContainerWidth=400;
  var divContainerHeight=400;

  // для DOM-элементов
  var widthBigCircleDom=300;
  var heightBigCircleDom=300;
  var deltaSmalClock=25; // размер малых кружков для цифр.из CSS class: .background_small
  
  var startCenterX=widthBigCircleDom/2; // центр по Х для любых вращений и построений 
  // относительного большого, фоного круга

var startCenterY=heightBigCircleDom/2; // центр по У для любых вращений и построений
       // относительного большого, фоного круга
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var valueRadius=heightBigCircleDom*0.43; // удаление от центра  малых кружов. задаем меньше половины высоты, 42%
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var centerArrowX=widthBigCircleDom/2;
var centerArrowY=heightBigCircleDom/2;





// размеры стрелок. либо читает программно размеры
var secondArrowHeight=140;
var secondArrowWidth=2;

var minuteArrowHeight=80;
var minuteArrowWidth=4;

var hourArrowHeight=50;
var hourArrowWidth=8;


  //общие
     
      
  var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
  // секунду смещение/поворот на 6 градусов
  var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
      // проходит 3600 секунд,то есть  умножить на 360/3600
  var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
      // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
      // за 1 секунду 360/43200
  var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается

  

 

  // model

  function ClockModel() {
      var myView = null;

      this.start=function(view) {
          myView=view;
      }


      this.updateView=function() {
          // при любых изменениях модели попадаем сюда
          // представление может быть любым,

          // лишь бы имело метод update()
          if ( myView )
              myView.update();
      };

      
  // получаем хэш,где есть текущее время. его постоянно запускать
  // this.objDate= this.formatDateTime();
    //получить уголы поворотов для стрелок
  // this.positionForClock= this.mathPositionClock( this.objDate);

      
   // получаем хэш,где есть текущее время. его постоянно запускать
  // this.objDate= this.formatDateTime();
  //  console.log( this.objDate);
   // console.log( this.objDate);

    //получить уголы поворотов для стрелок
  // this.positionForClock= this.mathPositionClock( this.objDate);
    //    console.log( this.positionForClock);



           // 1-ый вариант. если выбираю его,то все отображается верно.
           // как только добавляю
             // setInterval(this.timer,1000);
// то начинаются ошибки. TypeErroe. this.formatDateTime  is not a function
// почему? не понимаю,в чем ошибка. Подскажите пожалуйста,почему не получается.

      this.timer=function(){
        console.log('ha')
         this.objDate= this.formatDateTime();
            console.log( this.objDate);

        this.positionForClock= this.mathPositionClock( this.objDate);
        console.log(this.positionForClock)
        this.updateView();
      }
      this.timer(); 

      //  конец 1-го варианта
  setInterval(this.timer,1000);



  };


  // добавить в прототипы нужный,общие функции для всех

  // узнать текущее время
  ClockModel.prototype.formatDateTime= function (a) {
    
   // var self=this;
     var dt =new Date();
     var year=dt.getFullYear();
     var month=dt.getMonth()+1;
     var day=dt.getDate();
     var hours=dt.getHours();
     var minutes=dt.getMinutes();
     var seconds=dt.getSeconds();
     
    //console.log('ha-ha')
    return {
        countDay: day,          // вернуть объект в цифрах,чтобы использовать для расчета
        countHours: hours,
        countMinutes: minutes,
        countSeconds: seconds,
        countMonths: month,
        countYear: year
        
    }

    
}

// углы поворота для стрелок посчитать
ClockModel.prototype.mathPositionClock=function (objDate) {

  
  return {
      secondAngel: this.objDate.countSeconds*koeffSecond,  //здесь вычисляется угол поворота стрелки 
      minuteAngel: this.objDate.countMinutes*koeffMinute, // в зависимости от времени
      hourAngel: this.objDate.countHours*koeffHour+objDate.countMinutes*deltaKoeffHour
  }
}





  // view

  function ClockViewWebPage() {
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка

      this.start=function(model,field) {
          myModel=model;
          myField=field;

          // задать нужные размеры myField
          myField.style.width=divContainerWidth+'px';
          myField.style.height=divContainerHeight+'px';

            // задать фон. большой круг
            this.start= document.createElement('DIV'); //основной фоновый циферблат, большой
            this.start.className='background_main';
            this.start.id='start';
            //задать размеры и отобразить
            this.start.style.width=widthBigCircleDom+'px';
            this.start.style.height=heightBigCircleDom+'px';
            this.start.style.left=divContainerWidth/2-widthBigCircleDom/2+'px';
            this.start.style.top=divContainerHeight-heightBigCircleDom +'px';

          myField.appendChild(this.start);


          //сделать маленькие кружки
          this.clockDiv=document.createElement('DIV'); // хранилище для маленьких кружочков. чтобы единовременно все ставить в DOM 
          this.elem=[] // массив малых кружков
        for (var i=1; i<=12; i++){
          this.elem[i]= document.createElement('DIV');
          this.elem[i].innerHTML=i; // записываем  цифру
          this.elem[i].className='background_small';
          this.clockDiv.appendChild(this.elem[i]); // добавляем в промежуточный DIV 
   
       // задать положение малеким кружочкам
       this.pos( this.elem[i],valueRadius, valueAngle ); 
       valueAngle+=stepAngle;
       }
       this.start.appendChild(this.clockDiv); // добавляю в DOM все созданные малые кружочки

       //создать стрелки и вставить  в containerElem
       this.secondElem=document.createElement('div');
       this.secondElem.className='second';
       this.start.appendChild(this.secondElem); 

       this.minuteElem=document.createElement('div');
       this.minuteElem.className='minute';
       this.start.appendChild(this.minuteElem); 

       this.hourElem=document.createElement('div');
       this.hourElem.className='hour';
       this.start.appendChild(this.hourElem); 

       //изначально расположить на 12 часов
       this.secondElem.style.left= centerArrowX+ secondArrowWidth/2 +'px';
       this.secondElem.style.top= centerArrowY-secondArrowHeight +'px';
      
       console.log(centerArrowX)
       console.log(centerArrowY)
      
       this.minuteElem.style.left= centerArrowX + minuteArrowWidth/2+'px';
       this.minuteElem.style.top= centerArrowY-minuteArrowHeight +'px';
       
       
       this.hourElem.style.left= centerArrowX + hourArrowWidth/2+'px';
       this.hourElem.style.top= centerArrowY-hourArrowHeight +'px';
      

   

          // ищем и запоминаем интересные нам элементы DOM
          /*
          runCheckbox=myField.querySelector('.SRun');
          manDiv=myField.querySelector('.SMan');
          */


      }
      this.pos=function(elem, valueRadius, valueAngle){
        //  получаем начальный угол и радиус
        var radius=parseFloat(valueRadius);
        var angle=parseFloat(valueAngle)/180*Math.PI;
        // через sin and cos  узнаем смщение элемента по осям Х и У
        var elemCenterX=startCenterX+ radius*Math.sin(angle);
        var elemCenterY=startCenterY-radius*Math.cos(angle);
        //  прописываем в style  новое положениес учетом размера малого кружка deltaSmalClock
        elem.style.left=Math.round(elemCenterX - deltaSmalClock/2)+'px';
        elem.style.top=Math.round(elemCenterY-deltaSmalClock/2)+'px';


      }

      this.update=function() {

        // повернуть стрелки
        
        this.secondElem.style.transform='rotate('+myModel.positionForClock.secondAngel+'deg)';  // заставляем повернуть на нужный угол
        this.minuteElem.style.transform='rotate('+myModel.positionForClock.minuteAngel+'deg)';
        this.hourElem.style.transform='rotate('+myModel.positionForClock.hourAngel+'deg)';

 //console.log(myModel.positionForClock.secondAngel)
 //console.log(myModel.positionForClock.minuteAngel)
 //console.log(myModel.positionForClock.hourAngel)
 
      }

  };

  // controller

  function ClockControllerButtons() {
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка
      var runCheckbox = null; // чекбокс "бег"

      this.start=function(model,field) {
          myModel=model;
          myField=field;

          // ищем и запоминаем интересные нам элементы DOM
          // назначаем обработчики событий
/*
          runCheckbox=myField.querySelector('.SRun');
          runCheckbox.addEventListener('change',this.runChanged);

          var buttonUp=myField.querySelector('.SUp');
          buttonUp.addEventListener('click',this.shiftUp);
          var buttonDown=myField.querySelector('.SDown');
          buttonDown.addEventListener('click',this.shiftDown);
          var buttonLeft=myField.querySelector('.SLeft');
          buttonLeft.addEventListener('click',this.shiftLeft);
          var buttonRight=myField.querySelector('.SRight');
          buttonRight.addEventListener('click',this.shiftRight);
          */
      }


  }



  // настройка, инициализация первого комплекта

  // создаём все три компонента
  var clock1=new ClockModel();
  var view1=new ClockViewWebPage();
  var controller1=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem1=document.getElementById('Clock1Container');
  clock1.start(view1);
  view1.start(clock1,containerElem1);
  controller1.start(clock1,containerElem1);

  // инициируем первичное отображение Model во View
  clock1.updateView();

/*

    // настройка, второй

  // создаём все три компонента
  var clock2=new ClockModel();
  var view2=new ClockViewWebPage();
  var controller2=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem2=document.getElementById('Clock2Container');
  clock2.start(view2);
  view2.start(clock2,containerElem2);
  controller1.start(clock2,containerElem2);

  // инициируем первичное отображение Model во View
  clock2.updateView();

*/