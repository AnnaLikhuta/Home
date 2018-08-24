
  // описание констант
  // размеры для div-container
  var divContainerWidth=300;
  var divContainerHeight=300;

  // для DOM-элементов
  var widthBigCircleDom=200;
  var heightBigCircleDom=200;

  var smalClock=20; // размер малых кружков для цифр
  
  var startCenterX=widthBigCircleDom/2; // центр по Х для любых вращений и построений 
  // относительного большого, фоного круга

var startCenterY=heightBigCircleDom/2; // центр по У для любых вращений и построений
       // относительного большого, фоного круга
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var valueRadius=heightBigCircleDom*0.43; // удаление от центра  малых кружов. задаем меньше половины высоты, 42%
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var centerArrowX=widthBigCircleDom/2;
var centerArrowY=heightBigCircleDom/2;




// для svg
var sizeBigCircle=100; // радиус большого круга
var widthSvgField=200; // размеры поля svg 
var heightSvgField=200; //// размеры поля svg 

var widthSvgFieldX=widthSvgField/2; //  координаты середины поля svg
var heightSvgFieldY=heightSvgField/2;

var radiusSvgSmallCircle=10;// радиус малого шара


var valueRadiusSvg=sizeBigCircle*0.80; // удаление от центра  малых кружов. задаем меньше радиуса круга, 42%
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var lengthSecondElem=sizeBigCircle*0.7; //длина секундной стрелки
var lengthMinuteElem=sizeBigCircle*0.55;
var lengthHourElem=sizeBigCircle*0.45;

// для canvas
var sizeBigCircleCns=100; // радиус большого круга
var widthCnvField=200; // размеры поля canvas 
var heightCnvField=200; //// размеры поля canvas 

var widthCnvFieldX=widthCnvField/2; //  координаты середины поля canvas
var heightCnvFieldY=heightCnvField/2;

var radiusCnvSmallCircle=10;// радиус малого шара


var valueRadius=sizeBigCircle*0.82; // удаление от центра  малых кружов. задаем меньше радиуса круга, 42%
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

// перевод в радианы
var koeffInRad=Math.PI/180;

var lengthSecondElem=sizeBigCircle*0.7; //длина секундной стрелки
var lengthMinuteElem=sizeBigCircle*0.55;
var lengthHourElem=sizeBigCircle*0.45;



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

  

 

  // model

  function ClockModel(city) {
    var self=this; // в таймере this ссылается на свой контекст. через self спасаем
    self.city=city;
      self.objCity={
        'Нью-Йорк':-5,
        'Лондон': 0,
        'Берлин':1,
        'Минск':3,
        'Токио':9,
        'Владивосток':10
      }
      var myView = null;
      self.start=function(view) {
          myView=view;
      }
      // 0 - часы идут
      //1 - нажата кнопка стартю часы идут
      //2 - нажата кнопка стоп. часы не идут
      self.isStage=0;

      self.updateView=function() {
          // при любых изменениях модели попадаем сюда
          // представление может быть любым,

          // лишь бы имело метод update()
          if ( myView )
              myView.update();
      };
self.timeCity=self.objCity[city];
self.timer=function(){
    self.objDate= self.formatDateTime(self.timeCity);
    self.positionForClock= self.mathPositionClock( self.objDate);
    self.updateView();

  // setInterval(()=>{this.timer()   } ,1000);

  }

    // первоначальное положение стрелок
        //получить уголы поворотов для стрелок
    self.objDate= self.formatDateTime();
        //получить уголы поворотов для стрелок
    self.positionForClock= self.mathPositionClock( self.objDate);
    //вызов таймера
    self.timer();

    self.startTimer=function(){
        if(self.isStage==0 || self.isStage==1){
        self.timerId= setInterval(self.timer,100);
      
        }
      }

      self.startTimer(); 

    // остановить таймер  
    self.stopTimer=function(){
     if(self.isStage==2 ){
      clearInterval(self.timerId);
    console.log('ha')
     }
    }
    
  //  self.stopTimer();

// end model
  };


  // добавить в прототипы нужный,общие функции для всех

  // узнать текущее время
  ClockModel.prototype.formatDateTime= function (a) {
    
   // по Гринвичу
     var dt =new Date();
     
     var year=dt.getUTCFullYear();
     var month=dt.getUTCMonth()+1;
     var day=dt.getUTCDate();
     var hours=dt.getUTCHours()+a;
     var minutes=dt.getUTCMinutes();
     var seconds=dt.getUTCSeconds();
     
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

      self.update=function() {

        // повернуть стрелки
        
        self.secondElem.style.transform='rotate('+myModel.positionForClock.secondAngel+'deg)';  // заставляем повернуть на нужный угол
        self.minuteElem.style.transform='rotate('+myModel.positionForClock.minuteAngel+'deg)';
        self.hourElem.style.transform='rotate('+myModel.positionForClock.hourAngel+'deg)';

      }

  };


    // ----------------------------------------view SVG

    function ClockViewSVGPage() {
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

          //создать поле svg и позиционировать его
          self.start= document.createElementNS('http://www.w3.org/2000/svg', 'svg'); //основной фоновый циферблат, большой
          self.start.style.display='inline-block';
          self.start.style.width=widthSvgField+'px';
          self.start.style.height=heightSvgField+'px';
          self.start.style.position='absolute';
          self.start.style.left=divContainerWidth/2-widthBigCircleDom/2+'px';
          self.start.style.top=divContainerHeight-heightBigCircleDom +'px';


// создать большой фоновый кружок
   
    self.bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    self.bigCircle.setAttribute("cx", widthSvgField/2);
    self.bigCircle.setAttribute("cy", heightSvgField/2);
    self.bigCircle.setAttribute("r", sizeBigCircle);
    self.bigCircle.setAttribute("fill", "aqua");
    self.start.appendChild(self.bigCircle);

    myField.appendChild(self.start);

         // создаем малые кружки и вписываем цифры
      self.createSvgSmallCircle=   function (){
          var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g')
          for (var i=1; i<=12; i++){
              var SvgSmallCircle=document.createElementNS('http://www.w3.org/2000/svg','circle');
  
              var radius=parseFloat(valueRadiusSvg);
              var angle=parseFloat(valueAngle)/180*Math.PI;
              var elemCenterX=widthSvgField/2+ radius*Math.sin(angle);
              var elemCenterY= heightSvgField/2-radius*Math.cos(angle);
  
  
              SvgSmallCircle.setAttribute("cx", elemCenterX);
              SvgSmallCircle.setAttribute("cy", elemCenterY);
              SvgSmallCircle.setAttribute("r", radiusSvgSmallCircle);
              SvgSmallCircle.setAttribute("fill", "crimson");
             
              groupCircle.appendChild(SvgSmallCircle);
  
              var txt=document.createElementNS("http://www.w3.org/2000/svg",'text');
              txt.setAttribute("x",elemCenterX);
              txt.setAttribute("y",elemCenterY+radiusSvgSmallCircle/4);
              txt.style.fill="black";
              txt.style.fontSize="16px";
              txt.style.textAnchor="middle";
              txt.textContent=i;
              groupCircle.appendChild(txt);
  
              valueAngle+=stepAngle;
  
          }
          self.start.appendChild(groupCircle);
  
       }

       self.createSvgSmallCircle();

       //создать стрелки
       
// секундная
    self.secondElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    self.secondElem.setAttribute("x", widthSvgFieldX-4/2);
    self.secondElem.setAttribute("y", heightSvgFieldY-secondArrowHeight);
    self.secondElem.setAttribute("width",secondArrowWidth);
    self.secondElem.setAttribute("height",secondArrowHeight);
    self.secondElem.setAttribute("fill", "black");
    self.start.appendChild(self.secondElem);
    //минутная
    self.minuteElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    self.minuteElem.setAttribute("x", widthSvgFieldX-5/2);
    self.minuteElem.setAttribute("y", heightSvgFieldY-minuteArrowHeight);
    self.minuteElem.setAttribute("width",minuteArrowWidth);
    self.minuteElem.setAttribute("height",minuteArrowHeight);
    self.minuteElem.setAttribute("fill", "black");
    self.start.appendChild(self.minuteElem);
    // часовая
    self.hourElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    self.hourElem.setAttribute("x", widthSvgFieldX-6/2);
    self.hourElem.setAttribute("y", heightSvgFieldY-hourArrowHeight);
    self.hourElem.setAttribute("width",hourArrowWidth);
    self.hourElem.setAttribute("height",hourArrowHeight);
    self.hourElem.setAttribute("fill", "black");
    self.start.appendChild(self.hourElem);

  

     self.update=function() {

    self.secondElem.setAttribute("transform", "rotate("+myModel.positionForClock.secondAngel+
    " " +widthSvgField/2 +" "+widthSvgField/2+")");
    self.minuteElem.setAttribute("transform", "rotate(" +myModel.positionForClock.minuteAngel+
    " " +widthSvgField/2+" "+widthSvgField/2+")");
    self.hourElem.setAttribute("transform", "rotate(" +myModel.positionForClock.hourAngel+
    " " +widthSvgField/2 +" "+widthSvgField/2+")");


      }
      }

  };


//------------------------------ view canvas


    

    function ClockViewCanvasPage() {
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка
      var self=this;

      this.start=function(model,field) {
          myModel=model;
          myField=field;

                    // задать нужные размеры myField
                    myField.style.width=divContainerWidth+'px';
                    myField.style.height=divContainerHeight+'px';
          

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

      self.cvs=document.createElement('canvas');
      self.cvs.width=widthCnvField;
      self.cvs.height=heightCnvField;
      self.cvs.style.position='absolute';
      self.cvs.style.left=divContainerWidth/2-widthBigCircleDom/2+'px';
      self.cvs.style.top=divContainerHeight-heightBigCircleDom +'px';

      myField.appendChild(self.cvs);

       self.createCnvSmallCircle =function (){
        
        for (var i=1; i<=12; i++){
            var radius=parseFloat(valueRadius); 
            var angle=parseFloat(valueAngle)/180*Math.PI;
            var elemCenterX=widthCnvField/2+ radius*Math.sin(angle);
            var elemCenterY= heightCnvField/2-radius*Math.cos(angle);
    
            self.context.fillStyle='crimson';
            self.context.strokeStyle='black';
            self.context.beginPath();
            self.context.arc(elemCenterX,elemCenterY,radiusCnvSmallCircle, 0, Math.PI*2, false );
            self.context.fill();
            //self.context.stroke(); 
    
            self.context.fillStyle='black';
            self.context.font='italic bold 16px Arial';
            
            self.context.textAlign='center';
            self.context.textBaseline='middle';
            self.context.strokeText(''+i+'',elemCenterX, elemCenterY );
            valueAngle+=stepAngle;
    
        }
     }
    }

     self.update=function() {

     // var cvs=document.createElement('canvas');
      self.cvs.width=widthCnvField;
      self.cvs.height=heightCnvField;
      // большой круг, циферблат
      self.context= self.cvs.getContext('2d');
      self.context.fillStyle='aqua';
      self.context.strokeStyle='black';
      self.context.beginPath();
      self.context.arc(widthCnvFieldX,heightCnvFieldY,sizeBigCircle, 0, Math.PI*2, false );
      self.context.fill();
     // self.context.stroke(); 

      // нарисовать кружочки
      self.createCnvSmallCircle();



      self.second= koeffInRad*myModel.positionForClock.secondAngel;   //перевод в радианы
      self.minute=koeffInRad*myModel.positionForClock.minuteAngel ;  
      self.hour=koeffInRad*myModel.positionForClock.hourAngel ; 


      self.context.translate(widthCnvFieldX,heightCnvFieldY)
      self.context.rotate(self.second);
      self.context.fillRect(-secondArrowWidth/2 , 0-lengthSecondElem, secondArrowWidth, lengthSecondElem );
      self.context.resetTransform();

      self.context.translate(widthCnvFieldX,heightCnvFieldY)
      self.context.rotate(self.minute);
      self.context.fillRect(-minuteArrowWidth/2 , 0-lengthMinuteElem, minuteArrowWidth, lengthMinuteElem );
      self.context.resetTransform();


      self.context.translate(widthCnvFieldX,heightCnvFieldY)
      self.context.rotate(self.hour);
      self.context.fillRect(-hourArrowWidth/2 , 0-lengthHourElem, hourArrowWidth, lengthHourElem );
      self.context.resetTransform();

      }
      
      

  };




  // controller

  function ClockControllerButtons() {
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка
      var runCheckbox = null; // чекбокс "бег"
      var self=this;

      self.start=function(model,field) {
          myModel=model;
          myField=field;

          var startBt=myField.querySelector('.startBt');
          startBt.addEventListener('click',self.startClock);

          var stopBt=myField.querySelector('.stopBt');
          stopBt.addEventListener('click',self.stopClock);
      }
      self.startClock=function(){
        if(myModel.isStage==2){
          myModel.isStage=1;
          myModel.startTimer();
         // console.log('ha')
  
        }
      }

      self.stopClock=function(){
        if(myModel.isStage==0 || myModel.isStage==1 ){
          myModel.isStage=2;
          myModel.stopTimer();
          console.log('ha')
  
        }
      }



  }



  // настройка, инициализация первого комплекта

  // создаём все три компонента
  
  var clock1=new ClockModel('Нью-Йорк');
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



    // настройка, второй

  // создаём все три компонента
  var clock2=new ClockModel('Лондон');
  var view2=new ClockViewWebPage();
  var controller2=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem2=document.getElementById('Clock2Container');
  clock2.start(view2);
  view2.start(clock2,containerElem2);
  controller2.start(clock2,containerElem2);

  // инициируем первичное отображение Model во View
  clock2.updateView();

      // настройка, третий

  // создаём все три компонента
  var clock3=new ClockModel('Берлин');
  var view3=new ClockViewSVGPage();
  var controller3=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem3=document.getElementById('Clock3Container');
  clock3.start(view3);
  view3.start(clock3,containerElem3);
  controller3.start(clock3,containerElem3);

  // инициируем первичное отображение Model во View
  clock3.updateView();


      // настройка, четвертый

  // создаём все три компонента
  var clock4=new ClockModel('Минск');
  var view4=new ClockViewSVGPage();
  var controller4=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem4=document.getElementById('Clock4Container');
  clock4.start(view4);
  view4.start(clock4,containerElem4);
  controller4.start(clock4,containerElem4);

  // инициируем первичное отображение Model во View
  clock4.updateView();

        // настройка, пятый
       
  // создаём все три компонента
  var clock5=new ClockModel('Токио');
  var view5=new ClockViewCanvasPage();
  var controller5=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem5=document.getElementById('Clock5Container');
  clock5.start(view5);
  view5.start(clock5,containerElem5);
  controller5.start(clock5,containerElem5);

  // инициируем первичное отображение Model во View
  clock5.updateView();

        // настройка, шестой
        
  // создаём все три компонента
  var clock6=new ClockModel('Владивосток');
  var view6=new ClockViewCanvasPage();
  var controller6=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem6=document.getElementById('Clock6Container');
  clock6.start(view6);
  view6.start(clock6,containerElem6);
  controller6.start(clock6,containerElem6);

  // инициируем первичное отображение Model во View
  clock6.updateView();
