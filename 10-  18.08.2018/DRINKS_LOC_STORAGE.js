//добавлять название напитка и цена
//   название блюда- цена

//localStorage.clear(); //очистить
//создать класс

function HashStorage (name ){

    //дать имя  drink / dishes
    var self=this; 
    self.name=name;

    //создать объект для хранения данных - ключ:значение
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
    var abc=JSON.stringify(self.objInfo);
    localStorage.setItem(name, abc);

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
         return true;}
     }

     // получить полный список элементов хэша, т.е.ключей
     self.getKeys = function(){
        // var arr=[];
       //  for (var k in self.objInfo)
       //arr.push(k);
         //return arr;
	 return Object.keys(self.objInfo)
     }
}

// создать объекты

var drinkStorage= new HashStorage ('drink');
var dishesStorage= new HashStorage ('dishes');


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



