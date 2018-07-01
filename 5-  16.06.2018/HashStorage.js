function HashStorage ( ){
    //
   var self=this; 
   self.objInfo={};
   self.addValue = function (key,value){
     self.objInfo[key]=value; 

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

var drinkStorage=new HashStorage();
function askInfo() {
    
    var nameCoctail = prompt('Введите название коктеля')
    var value={};
    var nameAlgol = confirm('Какой алкоголь входит в состав')
   /* if( nameAlgol==false){
    nameAlgol='алкоголь отсутствует';    }
    else{
        nameAlgol='алкоголь есть';    }*/

    value['Алкоголь']=nameAlgol;
    // var nameIngridient = prompt('Советы по приготовлению');
    value['Ингридиенты']=prompt('Советы по приготовлению');;
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
        if(drink['Алкоголь']==true) {
            drink['Алкоголь']='Алкоголь есть'
        }
        else {
            drink['Алкоголь']='Алкоголь отсутствует';
        }
       
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



