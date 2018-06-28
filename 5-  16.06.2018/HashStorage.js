function HashStorage ( ){
   var self=this; 
   self.objInfo={};
   self.addValue = function (key,value){
     self.objInfo[key]=value; // почему не срабатывал self.key=value
         }

    self.getValue = function(key){
       if(key in self.objInfo)
       return self.objInfo[key];
       else {
           return;
       }

    }
    self.deleteValue = function(key){
        if(!self.objInfo[key]){
            return console.log('false. elem is not finded')
        }
        else
        delete self.objInfo[key];
        return console.log('true. elem delete')
    }
    self.getKeys = function(){
        for (var k in self.objInfo){
         console.log( k);
         console.log(self.objInfo[k]) ;}
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
}

function deleteCoctail (){
    var nameCoctail = prompt('Название коктеля, который желаете удалить');
    drinkStorage.deleteValue(nameCoctail);
   

}
function allCoctail (){
    console.log('Имеются следующие напитки');
    //console.log();
    drinkStorage.getKeys();

}



