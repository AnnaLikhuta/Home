
/*
drinkStorage.objInfo={'Ann': 'Likhuta'};


drinkStorage.addLocalStorage();
var d=drinkStorage.getFromLocalStorage('An');
console.log(d)
*/



/*
function HashStorage (name ){
    
   var self=this; 
   self.name=name;
   self.objInfo={};

    // добавить в LocalStorage
   self.addLocalStorage = function (){
      var key= self.name+'';
      var value=JSON.stringify(self.objInfo);
    localStorage.setItem(key, value);

         }

         // получить значение.поиск нужного элемента
    self.getFromLocalStorage = function(key){
      var hashFromJson=JSON.parse(localStorage[self.name]); // ее можно вынести и получить. когда добавляетмя, обновлять.и  загружать при первой   загрузе стр
       if( key in hashFromJson){
        //console.log(hashFromJson[key]);
              return hashFromJson[key]; }

           return false;
           }
    
    self.deleteValue = function(key){
        if(!self.objInfo[key]){
            return false;
        }
        else
        delete self.objInfo[key];
        return true;
    }
    self.getKeys = function(){
        var arr=[];
        for (var k in self.objInfo)
      arr.push(k);
        return arr;
    }

}


var drinkStorage= new HashStorage ('drink');
var dishesStorage= new HashStorage ('dishes');


drinkStorage.objInfo={'Ann': 'Likhuta'};


drinkStorage.addLocalStorage();
var d=drinkStorage.getFromLocalStorage('An');
console.log(d)
//   dishesStorage.objInfo={'Ann': 'Likhuta'};


//dishesStorage.addLocalStorage();
*/


/*
// проверка на пустоту
console.log(drinkStorage);
console.log(dishesStorage);
drinkStorage.addValue('Ann','Likhuta');
drinkStorage.addValue('AAAA','SSSS');

console.log(drinkStorage);

//drinkStorage.addLocalStorage();
console.log(drinkStorage.getValue('Ann'));
console.log(drinkStorage.deleteValue('Annv'));
console.log(drinkStorage.getKeys());
drinkStorage.addLocalStorage();
console.log(drinkStorage);

*/
