

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


          //self.start.setAttribute('width',widthSvgField);
         // self.start.setAttribute('height',heightSvgField);

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
              SvgSmallCircle.setAttribute("fill", "white");
             
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


    self.mathPositionClock=function (myModel) {
  
      return {
          secondAngel: myModel.objDate.countSeconds*koeffSecond,  //здесь вычисляется угол поворота стрелки 
          minuteAngel: myModel.objDate.countMinutes*koeffMinute, // в зависимости от времени
          hourAngel: myModel.objDate.countHours*koeffHour+myModel.objDate.countMinutes*deltaKoeffHour
      }
    }
    
     self.update=function() {
      self.positionForClock= self.mathPositionClock( myModel);

    self.secondElem.setAttribute("transform", "rotate("+self.positionForClock.secondAngel+
    " " +widthSvgField/2 +" "+widthSvgField/2+")");
    self.minuteElem.setAttribute("transform", "rotate(" +self.positionForClock.minuteAngel+
    " " +widthSvgField/2+" "+widthSvgField/2+")");
    self.hourElem.setAttribute("transform", "rotate(" +self.positionForClock.hourAngel+
    " " +widthSvgField/2 +" "+widthSvgField/2+")");


      }
      }

  };
