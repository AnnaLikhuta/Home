

  // размеры для div-container
  var divContainerWidth=400;
  var divContainerHeight=400;

  // для DOM-элементов
  var widthBigCircleDom=300;
  var heightBigCircleDom=300;
  var deltaSmalClock=25; // размер малых кружков для цифр.из CSS class: .background_small
  
  var startCenterX=divContainerWidth/2; // центр по Х для любых вращений и построений 
  // относительного большого, фоного круга

var startCenterY=divContainerHeight/2; // центр по У для любых вращений и построений
       // относительного большого, фоного круга
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var valueRadius=divContainerHeight*0.42; // удаление от центра  малых кружов. задаем меньше половины высоты, 42%
// размеры стрелок
var secondArrowHeight=140;
var secondArrowWidth=2;

var minuteArrowHeight=80;
var minuteArrowWidth=4;

var hourArrowHeight=50;
var hourArrowWidth=6;


  //общие
     
      
var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
// секунду смещение/поворот на 6 градусов
var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
    // проходит 3600 секунд,то есть  умножить на 360/3600
var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
    // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
    // за 1 секунду 360/43200
var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается

      
      
      
      
      
      // узнать время
        // обработка  текущего времени
    // задать таймер. Только где?  updateTime();
   //setInterval(updateTime,1000);

// как для разных стран считать время








// model

function ClockModel(){
    var self=this;


    // хранить положение стрелок. сначала задать по времени
    self.secondElem.posX= startCenterX+secondArrowWidth/2 ;
    self.secondElem.posY=startCenterY-secondArrowHeight ;
    
   
    self.minuteElem.posX= startCenterX+minuteArrowWidth/2;
    self.minuteElem.posY= startCenterY-minuteArrowHeight ;
    
    
    self.hourElem.posX=startCenterX+hourArrowWidth/2;
    self.hourElem.posY= startCenterY-hourArrowHeight;


    // нажата ли кнопка СТОП
    //0- сразу загружаем
    //1- нажата кнопка стоп. остановить
    //2- опять стрелки идут. показать время
    self.isGame=0;

    // получаем хэш,где есть текущее время. его постоянно запускать
    self.objDate=self.formatDateTime();
    console.log(self.objDate);

    //получить уголы поворотов для стрелок
    self.positionForClock=self.mathPositionClock(self.objDate);
        console.log(self.positionForClock);
 
      var myView = null;
      
  // передеть на вью угол поворота стрелок
     self.start=function(view) {
        myView=view;
        // console.log(myView.start)
        }

        self.updateView=function() {
          // при любых изменениях модели попадаем сюда
          // представление может быть любым,
          // лишь бы имело метод update()
          if ( myView )
              myView.update();
      };



    
}

// получить объект с текущей датой
// эту функцию в прототип для model
// в прототип функцию  получить текуее время
ClockModel.prototype.formatDateTime= function () {
    var self=this;
     self.dt =new Date();
     self.year=dt.getFullYear();
     self.month=dt.getMonth()+1;
     self.day=dt.getDate();
     self.hours=dt.getHours();
     self.minutes=dt.getMinutes();
     self.seconds=dt.getSeconds();
    //console.log('ha-ha')
    return {countDay: day,          // вернуть объект в цифрах,чтобы использовать для расчета
        countHours: hours,
        countMinutes: minutes,
        countSeconds: seconds,
        countMonths: month,
        countYear: year
        
    }
}

// таймер ????
ClockModel.prototype.timer=function(){
    setInterval(this.formatDateTime,1000);
    
}

// углы поворота для стрелок посчитать
ClockModel.prototype.mathPositionClock=function (objDate) {
    return {
        secondAngel: this.objDate.countSeconds*koeffSecond,  //здесь вычисляется угол поворота стрелки 
        minuteAngel: this.objDate.countMinutes*koeffMinute, // в зависимости от времени
        hourAngel: this.objDate.countHours*koeffHour+objDate.countMinutes*deltaKoeffHour
    }

}


var abc=new ClockModel();

//var ddd=new ClockModel();


 
    // view


    function ClockViewDOM(){
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка
      var isGame = null; // тип поведения часов. нажата ли кнопка
      var manDiv = null; // сами часы. нужно ли?  это будут стрелки


      self.pos=function(elem, valueRadius, valueAngle ){
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




      self.start=function(model,field) {
        myModel=model;
        myField=field; //  view.start(man,containerElem);


           // задать фон. большой круг
           var start= document.getElementById('start'); //основной фоновый циферблат, большой

           start.className='background_main';
           //задать размеры
           start.style.width=widthBigCircleDom+'px';
           start.style.height=heightBigCircleDom+'px';


        var  clockDiv=document.createElement('DIV'); // хранилище для маленьких кружочков. чтобы единовременно все ставить в DOM 

            // сделать маленькие кружки
        var elem=[] // массив малых кружков
        for (var i=1; i<=12; i++){
        elem[i]= document.createElement('DIV');
        elem[i].innerHTML=i; // записываем  цифру
       elem[i].className='background_small';
       clockDiv.appendChild(elem[i]); // добавляем в промежуточный DIV 
   
       // задать положение малеким кружочкам
       self.pos( elem[i],valueRadius, valueAngle ); 
       valueAngle+=stepAngle;
       }
       start.appendChild(clockDiv); // добавляю в DOM все созданные малые кружочки


       //создать стрелки и вставить
       var secondElem=document.createElement('div');
       secondElem.className='second';
       //  вставить в containerElem
       myField.appendChild(secondElem); 

       var minuteElem=document.createElement('div');
       minuteElem.className='minute';
       //  вставить в containerElem
       myField.appendChild(minuteElem); 

       var hourElem=document.createElement('div');
       hourElem.className='hour';
       //  вставить в containerElem
       myField.appendChild(hourElem); 



    

   
        /*
        // ищем и запоминаем интересные нам элементы DOM
        runCheckbox=myField.querySelector('.SRun');
        manDiv=myField.querySelector('.SMan');
        */
    }


    self.update=function() {
      //проверить статус часов по кнопке
      isGame=myModel.isGame;

      // повернуть/расположить стрелки в нужном месте


      secondElem.style.left= startCenterX + secondElem.offsetWidth/2 +'px';
      secondElem.style.top= startCenterY - secondElem.offsetHeight +'px';
      
     
      minuteElem.style.left= startCenterX +minuteElem.offsetWidth/2 +'px';
      minuteElem.style.top= startCenterY - minuteElem.offsetHeight +'px';
      
      
      hourElem.style.left= startCenterX + hourElem.offsetWidth/2 +'px';
      hourElem.style.top= startCenterY - hourElem.offsetHeight +'px';
//-----------------------------
      
      self.secondElem.posX= startCenterX+secondArrowWidth/2 ;
      self.secondElem.posY=startCenterY-secondArrowHeight ;
      
     
      self.minuteElem.posX= startCenterX+minuteArrowWidth/2;
      self.minuteElem.posY= startCenterY-minuteArrowHeight ;
      
      
      self.hourElem.posX=startCenterX+hourArrowWidth/2;
      self.hourElem.posY= startCenterY-hourArrowHeight;

      


      manDiv.style.left=myModel.posX+"px";
      manDiv.style.top=myModel.posY+"px";
  }




    }

    /*

    function ManViewWebPage() {
      var myModel = null; // с какой моделью работаем
      var myField = null; // внутри какого элемента DOM наша вёрстка
      var runCheckbox = null; // чекбокс "бег"
      var manDiv = null; // сам человечек

      this.start=function(model,field) {
          myModel=model;
          myField=field;

          // ищем и запоминаем интересные нам элементы DOM
          runCheckbox=myField.querySelector('.SRun');
          manDiv=myField.querySelector('.SMan');
      }

      this.update=function() {
          runCheckbox.checked=myModel.isRun;
          manDiv.style.left=myModel.posX+"px";
          manDiv.style.top=myModel.posY+"px";
      }

  };
*/