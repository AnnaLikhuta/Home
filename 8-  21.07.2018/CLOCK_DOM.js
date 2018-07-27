
  // описание констант
  var start= document.getElementById('start'); //основной фоновый циферблат, большой

  var startCenterX=start.offsetLeft+start.offsetWidth/2; // центр по Х для любых вращений и построений 
                                                        // относительного большого, фоного круга

   var startCenterY=start.offsetTop+start.offsetHeight/2; // центр по У для любых вращений и построений
                                                             // относительного большого, фоного круга
    var deltaSmalClock=25; // размер малых кружков для цифр.из CSS class: .background_small
    valueAngle=30; // начальный угол для отсчета и построения малых кружков, цифр
    valueRadius=start.offsetHeight*0.42; // удаление от центра  малых кружов. задаем меньше половины высоты, 42%
    var  clockDiv=document.createElement('DIV'); // хранилище для маленьких кружочков. чтобы единовременно все ставить в DOM 
    clockDiv.id='clockDiv';  // добавляем ID
    var stepAngle=30; // шаг для построения следующего малого кружка в 30 градусов

    var koeffSecond=360/60; // при совершении  полного оборота, 360 градусов, каждую
                             // секунду смещение/поворот на 6 градусов
    var koeffMinute=360*60/3600; // пересчитываем минут в секунды- умножаем на 60, а за полный оборот (360 градусов)
                                 // проходит 3600 секунд,то есть  умножить на 360/3600
    var koeffHour= 360*3600/43200;// пересчитываем в секунды,то есть умножаем на 3600
                                 // за полный оборот (360 градусов) проходит 12 часов,что равно 43200 секунд,а 
                                 // за 1 секунду 360/43200
    var deltaKoeffHour = 360/43200*60;  // перемещение часов стрелки в секунду,  умножаем на количество минут и на 60 секунд. т.к. пока идут минуты,часовая тоже перемещается


    function pos(elem, valueRadius, valueAngle ) {
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

    
    var elem=[] // массив малых кружков
     for (var i=1; i<=12; i++){
     elem[i]= document.createElement('DIV');
     elem[i].innerHTML=i; // записываем  цифру
    elem[i].className='background_small';
    clockDiv.appendChild(elem[i]); // добавляем в промежуточный DIV 

    pos( elem[i],valueRadius, valueAngle ); 
    valueAngle+=stepAngle;
    }
    start.appendChild(clockDiv); // добавляю в DOM все созданные малые кружочки

// вставить стрелки секундную,мин. и часовую и позиционировать в центр отсчета
// найти стрелки в DOM
var secondElem=document.getElementById('second');
var minuteElem=document.getElementById('minute');
var hourElem=document.getElementById('hour');

function setPositionArrow(){
    
    secondElem.style.left= startCenterX + secondElem.offsetWidth/2 +'px';
    secondElem.style.top= startCenterY - secondElem.offsetHeight +'px';
    
   
    minuteElem.style.left= startCenterX +minuteElem.offsetWidth/2 +'px';
    minuteElem.style.top= startCenterY - minuteElem.offsetHeight +'px';
    
    
    hourElem.style.left= startCenterX + hourElem.offsetWidth/2 +'px';
    hourElem.style.top= startCenterY - hourElem.offsetHeight +'px';


}


   // математика
   
   function  changePositionClock(obj){
       var second=obj.countSeconds*koeffSecond;  //здесь вычисляется угол поворота стрелки 
       var minute=obj.countMinutes*koeffMinute;  // в зависимости от времени
       var hour=obj.countHours*koeffHour+obj.countMinutes*deltaKoeffHour; 

       secondElem.style.transform='rotate('+second+'deg)'; // заставляем повернуть на нужный угол
       minuteElem.style.transform='rotate('+minute+'deg)';
        hourElem.style.transform='rotate('+hour+'deg)';

   }
    document.addEventListener('DOMContentLoaded',updateTime, false ); // поставить в нужную позицию стрелки сразу
    
setInterval(updateTime,1000);

function updateTime() {
    var currTime=new Date();
    objDate=formatDateTime(currTime);
   
    var currTimeStr=changeFormatDate(objDate);
    document.getElementById('TTT').innerHTML='Текущее время - '+currTimeStr;
    changePositionClock(objDate);
    setPositionArrow();

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
