
var allRight=true;
var elem= document.getElementById('valid-form');
 elem.addEventListener('submit', all, false);
 
var elemDeveloper = document.getElementById('developer');
var elemDeveloperError= document.getElementById('error-developer');
elemDeveloper.onchange = validDeveloper;
 elemDeveloper.onblur = validDeveloper;

var elemSite = document.getElementById('site');
var elemSiteError = document.getElementById('site-error');
 elemSite.onchange = validSite;
 elemSite.onblur = validSite;

 var elemUrlSite = document.getElementById('urlSite');
 var elemUrlSiteError = document.getElementById('urlSite-error');
 elemUrlSite.onchange = validUrlSite;
 elemUrlSite.onblur = validUrlSite; 

 var elemDate = document.getElementById('date');
 var elemDateError = document.getElementById('date-error');
 elemDate.onchange = validDate;
 elemDate.onblur = validDate;

 var elemNumberPeople = document.getElementById('numberPeople');
 var elemNumberPeopleError = document.getElementById('numberPeople-error');
 elemNumberPeople.onchange = validNumberPeople;
 elemNumberPeople.onblur = validNumberPeople;

 var elemEmail = document.getElementById('E-mail');
 var elemEmailError = document.getElementById('E-mail-error');
 elemEmail.onchange = validEmail;
 elemEmail.onblur = validEmail;

 var elemKatalog = document.getElementById('katalog');
 var elemKatalogError = document.getElementById('katalog-error');
 elemKatalog.onblur = validKatalog;

 
 var elemRadioError = document.getElementById('radio-error');
 var elemRadio=elem.elements.radio;
 console.log(elemRadio.length);
 //elem.onchange = validRadio; 
 for(var index=0; index<=elemRadio.length-1; index++){
    elemRadio[index].addEventListener('change', validRadio,false);
 }
 
 var elemCheck = document.getElementById('check');
 var elemCheckError = document.getElementById('check-error');
 elemCheck.onchange = validCheckbox;

 var elemTextarea = document.getElementById('textarea');
 var elemTextareaError = document.getElementById('textarea-error');
 elemTextarea.onchange = validTextarea;


function validDeveloper(EO){ //на пустоту и определенное слово

        EO=EO||window.event; 
            var text = elemDeveloper.value; 
                 if (text.length== 0 || text=='durov' || text=='' ){
                elemDeveloperError.innerHTML='ERROR';
                allRight=false;
        }
        else  {elemDeveloperError.innerHTML='';
        return true;
        }
        if(allRight==false && EO.currentTarget==elem ){
            elemDeveloper.focus();
          }    
       
    }

 function validSite(EO){ //проверка на пустоту и точку 
EO=EO||window.event; 
         text = elemSite.value;
            if (text.length== 0){
                elemSiteError.innerHTML='пустое поле';
                allRight=false;
            }
        else if (text.indexOf('.')==-1){
            elemSiteError.innerHTML=' не содержит домен верхнего уровня'; 
            allRight=false;
          }
         
        else {
            elemSiteError.innerHTML='';
            return true;
        }
        if(allRight==false && EO.currentTarget==elem ){
            elemSite.focus();
          }
        
}
function validUrlSite(EO){ //проверка на пустоту и минимальную длину
    EO=EO||window.event;
        var text = elemUrlSite.value; 
    if (text==''){
        elemUrlSiteError.innerHTML='заполните поле';
        allRight=false;
}
    else if (text.length<=7 ){
    elemUrlSiteError.innerHTML='короткое имя для url';
    allRight=false;
}
    else {elemUrlSiteError.innerHTML='';
    return true; } 
    if(allRight==false && EO.currentTarget==elem){
        elemUrlSite.focus();
    }
}

function validDate(EO){ // проверка на пустоту и на будущую дату
    EO=EO||window.event;
    var text = elemDate.value;
    if (text==''){
        elemDateError.innerHTML='укажите дату';
        allRight=false;
    }
    else if(text){
        var abc = dateToday(text);
        if (!abc){
            elemDateError.innerHTML='Не верно указана дата';
            allRight=false;
        }
    else  elemDateError.innerHTML='';
        return true;
    }
    if(allRight==false && EO.currentTarget==elem){
        elemDate.focus();
    }
}

function validNumberPeople(EO){ // на пустоту и большое число посетителей
    EO=EO||window.event;
  var  text = elemNumberPeople.value;
    if (text.length== 0){
        elemNumberPeopleError.innerHTML='пустое поле';
        allRight=false;
    }
else if (text>=100){
    elemNumberPeopleError.innerHTML=' вы уверены?'; 
    allRight=false; 
  }
else {
    elemNumberPeopleError.innerHTML='';
    return true;
}
if(allRight==false && EO.currentTarget==elem){
    elemNumberPeople.focus();
}
}

function validEmail(EO){ // проверка на пустоту и на содержание @
    EO=EO||window.event;
        var text = elemEmail.value;
            if (text.length== 0){
                elemEmailError.innerHTML='пустое поле';
                allRight=false;
                }
            else if (text.indexOf('@')==-1){
                elemEmailError.innerHTML=' не содержит @';  
                allRight=false;
              }
            else {
                elemEmailError.innerHTML='';
                return true; 
            }
        if(allRight==false && EO.currentTarget==elem){
                elemNumberPeople.focus();
        }
    }

function validKatalog(EO){ // проверка на отсутствие выбора и на первый вариант
    EO=EO||window.event;
    var text = elemKatalog.value;
    if (text==1){
    elemKatalogError.innerHTML=' данная рубрика не доступна'; 
    allRight=false; 
  }
    else {
    elemKatalogError.innerHTML=' ';
    return true;
}
if(allRight==false && EO.currentTarget==elem){
    elemKatalog.focus();
}
}

function validRadio(EO){ //проверка на отсутствие выбора
    EO=EO||window.event;
    var text = elemRadio.value;
    if (text==''){
    elemRadioError.innerHTML='сделайте выбор';
    allRight=false;   
  }
else if (text==11){
    elemRadioError.innerHTML='не доступен для выбора ';
    allRight=false; 
}
else{
    elemRadioError.innerHTML='';
    return true;
}
var elemRadioScroll = document.getElementById('radio1');
if(allRight==false && EO.currentTarget==elem){
    elemRadioScroll.scrollIntoView(); // скроллить к этому месту
}
 
}

function validCheckbox(EO){ // проверка на обязательный выбор
    EO=EO||window.event;
    var text = elemCheck.checked;
       if(!text){
        elemCheckError.innerHTML='указать разрешить отзывы'; 
        allRight= false;

    }
    else{
        elemCheckError.innerHTML=' ';
        return true;
    } 
    if(allRight==false &&  EO.currentTarget==elem){
        elemCheck.focus();
        
    }

}

function validTextarea(EO){ // проверка на пустоту и короткое сообщение
    EO=EO||window.event;
    var text = elemTextarea.value;
    if (text.length==0){
        elemTextareaError.innerHTML='опишите ваш сайт';
        allRight= false;   
  }
 else if (text.length<=10){
    elemTextareaError.innerHTML='Краткое описание ';
    allRight= false;
}
else{
    elemTextareaError.innerHTML='';
    return true;
}
if(allRight==false &&  EO.currentTarget==elem){
    elemTextarea.focus();
}

}

 function dateToday(text){
    var dateArr = text.split('-');
    var fromElem = new Date (dateArr[0], dateArr[1]-1,dateArr[2]);
var justNow = new Date();  //now time
   var abc= justNow.getTime()- fromElem.getTime();
   if (abc>=0)
   return true;
   else 
   return false;
 }
 
function all (EO){
    var arr=[]
        EO=EO||window.event; 
      arr.push(validTextarea() );
      arr.push(validCheckbox());
      arr.push(validRadio());
      arr.push(validKatalog());
      arr.push(validEmail());
      arr.push(validNumberPeople());
      arr.push(validDate());
      arr.push(validUrlSite());
      arr.push(validSite());
      arr.push(validDeveloper());
       
   // console.log(arr);
    var answer = arr.every(checkArray);
   // console.log(answer);
    if (answer!=true){
        EO.preventDefault();
        }

}

function checkArray(v,i,a){
    return v==true;
}
 



    

 


