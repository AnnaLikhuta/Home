


// записать при уходе на сервер
// получить из локал
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName='LIKHUTA_DRINKS_AJAX_STORAGE';


function  saveAJAXStorage(abc){
var updatePassword;

function storeInfo() {

    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else {
        // нам всё равно, что было прочитано - 
        // всё равно перезаписываем
        var info=abc;
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
}
function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

storeInfo();


}
//------------------------------- 
//--------------------------------

    //  возникли трудности при возрате с сервера. READ
    // return  не сделаешь для вызова restoreInfo()
    // и  оборачивать ее в еще одну функцию не вариант.
    // как потом дальше передавать  то, что сделал READ?
    // restoreInfo() - работает с переменными только из своего окружения?

/*

function readAJAX(){
  
function restoreInfo() {
  var lastSession;
  $.ajax(
      {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'READ', n : stringName },
          success : readReady, error : errorHandler
      }
  );
  console.log(lastSession);

}

function readReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error); 
  else if ( callresult.result!="" ) {
     lastSession=JSON.parse(callresult.result); 
    console.log(lastSession);
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
restoreInfo();
}
readAJAX();
*/

//создать класс

function AJAXStorage (name, ){

  //дать имя  drink / dishes
  var self=this; 
  self.name=name;

self.updatePassword;

  //создать объект для хранения данных, местный - ключ:значение
  self.objInfo={};

  //записатьс сервера
  self.restoreInfo=function () {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : self.readReady, error : errorHandler
        }
    );
  }
  
  self.readReady=function (callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else if ( callresult.result!="" ) {
      self.objInfo=JSON.parse(callresult.result); 
      
    }
  }
  
  function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
  }
  self.restoreInfo()

 // добавить данные
 self.addValue = function (key,value){
  self.objInfo[key]=value; 
  console.log(self.objInfo)
  saveAJAXStorage(self.objInfo)

      }

  //найти данные в текущем хэше
  self.getValue = function(key){
     if( key in self.objInfo){
            return self.objInfo[key]; }
         return false;
         }

   // удалить данные
   self.deleteValue = function(key){
      if(! self.objInfo[key]){
           return false;
       }
       else{
       delete self.objInfo[key];
     saveAJAXStorage(self.objInfo)
       return true;}
   }

   // получить полный список элементов хэша, т.е.ключей
   self.getKeys = function(){
 return Object.keys(self.objInfo)
   }
}

// создать объекты

var drinkStorage= new AJAXStorage ('drink');
//var dishesStorage= new AJAXStorage ('dishes');


function askInfoDrink() {
  
  var nameDrink = prompt('Введите название коктеля');
  var costDrink = prompt('Стоимость напитка');
  var ingrid = prompt('Ингридиенты');

  var deltaObj={
    'Стоимость':costDrink,
    'Ингридиенты': ingrid
  }
    drinkStorage.addValue(nameDrink, deltaObj);
}

function getInfo () {
  var nameCoctail = prompt('Введите название напитка');
  var drink =drinkStorage.getValue(nameCoctail);
  
  if (drink==undefined){
      console.log('Информации нет по данному коктелю')
  }
  else{
     console.log(nameCoctail)
      console.log(drink);
  }
  
}

function deleteCoctail (){
  var nameCoctail = prompt('Название коктеля, который желаете удалить');
  var result = drinkStorage.deleteValue(nameCoctail);
 result?console.log('Данный напиток успешно удален'):console.log('Данный напиток отсутствует');

}
function allCoctail (){
  console.log('Имеются следующие напитки');
  var result = drinkStorage.getKeys();
  console.log( result.join(', ') );

}
/*
//для блюд

function askInfoDishes() {
  
  var nameDishes = prompt('Введите название блюда');
  var costDishes = prompt('Стоимость блюда');
  var ingrid = prompt('Ингридиенты');

  var deltaObj={
    'Стоимость':costDishes,
    'Ингридиенты': ingrid
  }
  dishesStorage.addValue(nameDishes, deltaObj);
}

function getInfoDishes () {
  var nameDishes = prompt('Введите название напитка');
  var dishes =dishesStorage.getValue(nameDishes);
  if (dishes==undefined){
      console.log('Информации нет ')}
  else{
    console.log(nameDishes)
    console.log(dishes);
  }
}

function deleteDishes(){
  var nameDishes = prompt('Название блюда, которое желаете удалить');
  var result = dishesStorage.deleteValue(nameDishes);
 result?console.log('Данное блюдо успешно удалено'):console.log('Отсутствует');

}
function allDishes (){
  console.log('Имеются следующие блюда');
  var result = dishesStorage.getKeys();
  console.log( result.join(', ') );

}
*/