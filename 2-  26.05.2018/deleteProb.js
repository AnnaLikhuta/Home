
 var str= prompt('Введите слово');

function deleteProb(str) {
     var check=false;
    var countLeft=0;
    var countRight=0;
       for (var i=0; i<=str.length-1; i++ ){

        if (str[i]==' ' && check==false ) {
             countLeft++;
             if(countLeft==str.length){
                 break;
             }
        }
        else if (str[i]!=' ' ){
            check=true;
        }
        else if(str[i]==' ' && check==true) {
            countRight++;
           }
        }
        str= str.slice(countLeft, -countRight);
    return str ; 
    }
   


var cleanWord=deleteProb(str);
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+'-'+ cleanWord+'-');
}