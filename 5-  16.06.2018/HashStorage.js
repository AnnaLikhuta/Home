function HashStorage ( ){
   var self=this; 
   self.objInfo={};
   self.addValue = function (key,value){
       //console.log(value);
       self.objInfo[key]=value; // почему не срабатывал self.key=value
       //console.log(self.objInfo)
       }
    self.getValue = function(key){
       if(key in self.objInfo)
       return self.objInfo[key];
       else {
           return;
       }

    }
    self.deleteValue = function(key){
        delete self.objInfo[key];
    }
    self.getKeys = function(){
        for (var k in self.objInfo)
         console.log( k);
    }

}

var drinkStorage=new HashStorage();
function askInfo() {
    
    var nameCoctail = prompt('Введите название коктеля')
    var value={};
    var nameAlgol = confirm('Какой алкоголь входит в состав')
    if( nameAlgol==false){
    nameAlgol='алкоголь отсутствует';    }
    else{
        nameAlgol='алкоголь есть';    }
    value['Алкоголь']=nameAlgol;
     var nameIngridient = prompt('Советы по приготовлению');
    value['Ингридиенты']=nameIngridient;
    //console.log(value);
      drinkStorage.addValue(nameCoctail, value);
}

function getInfo () {
    var nameCoctail = prompt('Введите название напитка');
    var drink =drinkStorage.getValue(nameCoctail);
    if (drink==undefined){
        console.log('Информации нет по данному коктелю')
    }
    else{
        console.log('Коктель:  ' + nameCoctail)
        console.log(drink);
    }
    /*if (!drinkStorage.getValue(nameCoctail)){
        console.log('Информации нет по данному коктелю')
        console.log('Для напитка ' + nameCoctail + drinkStorage.objInfo);
    }    else{
       
    } */
}

function deleteCoctail (){
    var nameCoctail = prompt('Название коктеля, который желаете удалить');
    drinkStorage.deleteValue(nameCoctail);
    console.log('Информация удалена');

}
function allCoctail (){
    console.log('Имеются следующие напитки');
    drinkStorage.getKeys();

}



