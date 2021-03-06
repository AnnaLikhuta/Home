var sizeBigCircle=150; // радиус большого круга
var widthSvgField=400; // размеры поля svg 
var heightSvgField=400; //// размеры поля svg 

var widthSvgFieldX=widthSvgField/2; //  координаты середины поля svg
var heightSvgFieldY=heightSvgField/2;

var radiusSvgSmallCircle=22;// радиус малого шара


var valueRadius=sizeBigCircle*0.82; // удаление от центра  малых кружов. задаем меньше радиуса круга, 42%
var valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

var lengthSecondElem=sizeBigCircle*0.7; //длина секундной стрелки
var lengthMinuteElem=sizeBigCircle*0.55;
var lengthHourElem=sizeBigCircle*0.45;

var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
                         // секунду смещение/поворот на 6 градусов
var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
                             // проходит 3600 секунд,то есть  умножить на 360/3600
var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
                             // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
                             // за 1 секунду 360/43200
var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается

// создать большойфоновый кружок
 var SSSBasic=document.getElementById('SSS');
 SSSBasic.setAttribute('width',widthSvgField);
 SSSBasic.setAttribute('height',heightSvgField);

    
     var bigCircle= document.createElementNS('http://www.w3.org/2000/svg', 'circle');
     bigCircle.setAttribute("cx", widthSvgField/2);
     bigCircle.setAttribute("cy", heightSvgField/2);
     bigCircle.setAttribute("r", sizeBigCircle);
     bigCircle.setAttribute("fill", "aqua");
     SSSBasic.appendChild(bigCircle);

     // создаем малые кружки и вписываем цифры
     function createSvgSmallCircle(){
        var groupCircle= document.createElementNS('http://www.w3.org/2000/svg','g')
        for (var i=1; i<=12; i++){
            var SvgSmallCircle=document.createElementNS('http://www.w3.org/2000/svg','circle');

            var radius=parseFloat(valueRadius);
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
            txt.style.fontSize="20px";
            txt.style.textAnchor="middle";
            txt.textContent=i;
            groupCircle.appendChild(txt);

            valueAngle+=stepAngle;

        }
        SSSBasic.appendChild(groupCircle);

     }
     createSvgSmallCircle();


//создать стрелки
// секундная
var secondElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
secondElem.setAttribute("x", widthSvgFieldX-4/2);
secondElem.setAttribute("y", heightSvgFieldY-lengthSecondElem);
secondElem.setAttribute("width",4);
secondElem.setAttribute("height",lengthSecondElem);
secondElem.setAttribute("fill", "black");
SSSBasic.appendChild(secondElem);
//минутная
var minuteElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
minuteElem.setAttribute("x", widthSvgFieldX-5/2);
minuteElem.setAttribute("y", heightSvgFieldY-lengthMinuteElem);
minuteElem.setAttribute("width",5);
minuteElem.setAttribute("height",lengthMinuteElem);
minuteElem.setAttribute("fill", "black");
SSSBasic.appendChild(minuteElem);
// часовая
var hourElem=document.createElementNS("http://www.w3.org/2000/svg",'rect');
hourElem.setAttribute("x", widthSvgFieldX-6/2);
hourElem.setAttribute("y", heightSvgFieldY-lengthHourElem);
hourElem.setAttribute("width",6);
hourElem.setAttribute("height",lengthHourElem);
hourElem.setAttribute("fill", "black");
SSSBasic.appendChild(hourElem);



function  changePositionClock(obj){
    var second=obj.countSeconds*koeffSecond;  //здесь вычисляется угол поворота стрелки 
    var minute=obj.countMinutes*koeffMinute;  // в зависимости от времени
    var hour=obj.countHours*koeffHour+obj.countMinutes*deltaKoeffHour; 

    // заставляем повернуть на нужный угол
    secondElem.setAttribute("transform", "rotate("+second+" " +200 +" "+200+")");
    minuteElem.setAttribute("transform", "rotate(" +minute+" " +200 +" "+200+")");
    hourElem.setAttribute("transform", "rotate(" +hour+" " +200 +" "+200+")");
}


updateTime();
 
 // обработка  текущего времени
 setInterval(updateTime,1000);

 function updateTime() {
     var currTime=new Date();
     objDate=formatDateTime(currTime);
    
     var currTimeStr=changeFormatDate(objDate);
     //document.getElementById('TTT').innerHTML='Текущее время - '+currTimeStr;
     changePositionClock(objDate);
    // setPositionArrow();
 
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
 
 