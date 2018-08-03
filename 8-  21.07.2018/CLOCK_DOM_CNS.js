var sizeBigCircle=150; // радиус большого круга
var widthCnvField=400; // размеры поля canvas 
var heightCnvField=400; //// размеры поля canvas 

var widthCnvFieldX=widthCnvField/2; //  координаты середины поля canvas
var heightCnvFieldY=heightCnvField/2;

var radiusCnvSmallCircle=22;// радиус малого шара


var valueRadius=sizeBigCircle*0.82; // удаление от центра  малых кружов. задаем меньше радиуса круга, 42%
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var lengthSecondElem=sizeBigCircle*0.7; //длина секундной стрелки
var lengthMinuteElem=sizeBigCircle*0.55;
var lengthHourElem=sizeBigCircle*0.45;

var koeffInRad=Math.PI/180;
var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
                         // секунду смещение/поворот на 6 градусов
var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
                             // проходит 3600 секунд,то есть  умножить на 360/3600
var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
                             // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
                             // за 1 секунду 360/43200
var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается



function  changePositionClock(obj){
    //  создаем поле canvas
    var cvs=document.getElementById('CCC');
    cvs.width=widthCnvField;
    cvs.height=heightCnvField;
    // большой круг, циферблат
    var context=cvs.getContext('2d');
    context.fillStyle='aqua';
    context.strokeStyle='black';
    context.beginPath();
    context.arc(widthCnvFieldX,heightCnvFieldY,sizeBigCircle, 0, Math.PI*2, false );
    context.fill();
    context.stroke(); 
    
    // создать малые кружки функцией
    
    function createCnvSmallCircle(){
        
        for (var i=1; i<=12; i++){
            var radius=parseFloat(valueRadius); //вынессти. не делать через var
            var angle=parseFloat(valueAngle)/180*Math.PI;
            var elemCenterX=widthCnvField/2+ radius*Math.sin(angle);
            var elemCenterY= heightCnvField/2-radius*Math.cos(angle);
    
            context.fillStyle='white';
            context.strokeStyle='black';
            context.beginPath();
            context.arc(elemCenterX,elemCenterY,radiusCnvSmallCircle, 0, Math.PI*2, false );
            context.fill();
            context.stroke(); 
    
            context.fillStyle='black';
            context.font='italic bold 20px Arial';
            context.strokeText(''+i+'',elemCenterX, elemCenterY );
            context.textAlign='center';
            context.textBaseline='middle';
            valueAngle+=stepAngle;
    
        }
     }
     createCnvSmallCircle();
    
     
    var secondGrad=obj.countSeconds*koeffSecond;  //здесь вычисляется угол поворота стрелки 
    var minuteGrad=obj.countMinutes*koeffMinute;  // в зависимости от времени
    var hourGrad=obj.countHours*koeffHour+obj.countMinutes*deltaKoeffHour; 

    var second= koeffInRad*secondGrad;   //перевод в радианы
    var minute=koeffInRad*minuteGrad ;  
    var hour=koeffInRad*hourGrad ; 

    
    context.translate(widthCnvFieldX,heightCnvFieldY)
    context.rotate(second);
    context.fillRect(-4/2 , 0-lengthSecondElem, 4, lengthSecondElem );
    context.resetTransform();

    context.translate(widthCnvFieldX,heightCnvFieldY)
    context.rotate(minute);
    context.fillRect(-6/2 , 0-lengthMinuteElem, 6, lengthMinuteElem );
    context.resetTransform();


    context.translate(widthCnvFieldX,heightCnvFieldY)
    context.rotate(hour);
    context.fillRect(-8/2 , 0-lengthHourElem, 8, lengthHourElem );
    context.resetTransform();

}


updateTime();
 
 // обработка  текущего времени
 setInterval(updateTime,1000);

 function updateTime() {
     var currTime=new Date();
     objDate=formatDateTime(currTime);
     var currTimeStr=changeFormatDate(objDate);
     document.getElementById('TTT').innerHTML='Текущее время - '+currTimeStr;
     changePositionClock(objDate);
 
 }
 
 function formatDateTime(dt) {
     var year=dt.getFullYear();
     var month=dt.getMonth()+1;
     var day=dt.getDate();
     var hours=dt.getHours();
     var minutes=dt.getMinutes();
     var seconds=dt.getSeconds();
     return {countDay: day,          // вернуть объект в цифрах,чтобы использовать для расчета
         countHours: hours,
         countMinutes: minutes,
         countSeconds: seconds,
         countMonths: month,
         countYear: year
     }
 }
 
 function changeFormatDate(objDate){
 return   str0l(objDate.countDay,2) + '.' + str0l(objDate.countMonths,2)+   '.' + objDate.countYear + ' ' + str0l(objDate.countHours,2) + ':' + str0l(objDate.countMinutes,2) + ':' + str0l(objDate.countSeconds,2);
 
 }
 
 
 function str0l(val,len) {
     var strVal=val.toString();
     while ( strVal.length < len )
         strVal='0'+strVal;
     return strVal;
 } 
