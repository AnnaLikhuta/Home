


// записать при уходе на сервер
// получить из локал


function  saveAJAXStorage(abc){
  var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='LIKHUTA_DRINKS_AJAX_STORAGE';

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
//-----------------------------------------------------------
/*
// читать с сервера
function restoreInfo() {
  $.ajax(
      {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'READ', n : stringName },
          success : readReady, error : errorHandler
      }
  );
}

function readReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error); 
  else if ( callresult.result!="" ) {
      var info=JSON.parse(callresult.result); 
      console.log(info)
  }
}
//restoreInfo();
*/
}



//создать класс

function AJAXStorage (name ){

  //дать имя  drink / dishes
  var self=this; 
  self.name=name;

self.updatePassword;

  //создать объект для хранения данных, местный - ключ:значение
  self.objInfo={};

  // проверка. есть в LocalStorage данные с предыдущего раза
 if( localStorage[self.name] ) {
     //преобразовать в js. загружаем в текущий хэш, с которым будем работать
     self.objInfo=JSON.parse(localStorage[self.name]);
    // console.log(self.objInfo)

 }


 // добавить данные
 self.addValue = function (key,value){
  self.objInfo[key]=value; 
 // var name= self.name+'';
  self.abc=JSON.stringify(self.objInfo);
  localStorage.setItem(self.name, self.abc);
  console.log(self.objInfo)
  // правильно ли, что LocalStorage перезаписывается всегда весь?
  saveAJAXStorage(localStorage)

      }

  //найти данные в текущем хэше
  self.getValue = function(key){
  //  var hashFromJson=JSON.parse(localStorage[self.name]); 
     if( key in self.objInfo){
      //console.log(hashFromJson[key]);
            return self.objInfo[key]; }
         return false;
         }

   // удалить данные
   self.deleteValue = function(key){
    //var hashFromJson=JSON.parse(localStorage[self.name]); 
      if(! self.objInfo[key]){
           return false;
       }
       else{
       delete self.objInfo[key];
     var hashToJson=JSON.stringify(self.objInfo);
     localStorage.setItem(self.name, hashToJson);
     saveAJAXStorage(localStorage)
       return true;}
   }

   // получить полный список элементов хэша, т.е.ключей
   self.getKeys = function(){
 return Object.keys(self.objInfo)
   }
}

// создать объекты

var drinkStorage= new AJAXStorage ('drink');
var dishesStorage= new AJAXStorage ('dishes');


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
