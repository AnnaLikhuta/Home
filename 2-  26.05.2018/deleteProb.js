
 var str= prompt('Введите слово');
 var countLeft=0;
 var countRight=0;

function deleteProb(str) {
           for (var i=0; i<=str.length-1; i++ ){

        if (str[i]==' ' ) {
             countLeft++;
             if(countLeft==str.length){
                 break;
             }
        }
        else if (str[i]!=' ' ){
            break;
        }
              } 

         for ( var j=str.length-1; j>=0; j-- ){

                if (str[j]==' ' ) {
                    countRight++;
                                    }
                else if (str[j]!=' ' ){
                    break;
                }
                
                      }
                     str=str.slice(countLeft,-countRight )
                     
                      return str  }


var cleanWord=deleteProb(str);
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+'-'+ cleanWord+'-');
}

//  есть короче вариант :))  

console.log(str.replace(' ',''));