
 var str= prompt('Введите слово');

function deleteProb(word) {
    var countLeft=0;
    var pos;
    var abc;
       for (var i=0; i<=str.length-1; i++ ){ //считать пробелы в начале слова
        if (str[i]==' ' ) {
             countLeft++;
             if(countLeft==str.length){
                break;
            }
        }
        else if (str[i]!=' ' ){
            break;
        } }

        str= str.slice(countLeft); //удалить пробелы слева
           
          while (str.indexOf(' ')!=-1) {  // убрать пробелы в середине слова и в конце
            pos=str.indexOf(' ');
               abc= str.slice(0,pos);
            str=str.slice(pos+1);
            str=abc+str;
           }
    return str ;
    }

        // если делать как вы говорите,
        // 1. Посчитайте пробелы в начале строки.
        //      2. Посчитайте пробелы в конце строки.

        // я не знаю,как совместить с этим проверку и удаление в середине пробелов.
        /*      for (var i=0; i<=str.length-1; i++ ){

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
        }  */


var cleanWord=deleteProb(str);
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+'-'+ cleanWord+'-');
}

//  есть короче вариант :))  

console.log(str.replace(' ',''));