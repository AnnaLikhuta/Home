

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

        self.context.fillStyle='white';
        self.context.strokeStyle='black';
        self.context.beginPath();
        self.context.arc(elemCenterX,elemCenterY,radiusCnvSmallCircle, 0, Math.PI*2, false );
        self.context.fill();
        self.context.stroke(); 

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
  self.context.stroke(); 

  // нарисовать кружочки
  self.createCnvSmallCircle();

  self.positionForClock= self.mathPositionClock( myModel);


  self.second= koeffInRad*self.positionForClock.secondAngel;   //перевод в радианы
  self.minute=koeffInRad*self.positionForClock.minuteAngel ;  
  self.hour=koeffInRad*self.positionForClock.hourAngel ; 


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
 
  self.mathPositionClock=function (myModel) {

    return {
        secondAngel: myModel.objDate.countSeconds*koeffSecond,  //здесь вычисляется угол поворота стрелки 
        minuteAngel: myModel.objDate.countMinutes*koeffMinute, // в зависимости от времени
        hourAngel: myModel.objDate.countHours*koeffHour+myModel.objDate.countMinutes*deltaKoeffHour
    }
  }
};




