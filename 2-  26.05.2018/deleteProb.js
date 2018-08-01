
var str= prompt('Введите слово');
 var countLeft=0;
 var countRight=0;

function deleteProb(str) {
           for (var i=0; i<=str.length-1; i++ ){

        if (str[i]==' ' ) {
             countLeft++;
             if(countLeft==str.length){
                 return countLeft ;
             } 
        }
        else break;
              } 
              console.log(countLeft);
         for ( var j=str.length-1; j>=0; j-- ){

                if (str[j]==' ' ) {
                    countRight++;
                                    }
                else break;
                      }
		str=str.substr(countLeft,str.length-countRight-countLeft)
		return str;
/*
                      if (countRight==0){
                        str=str.slice(countLeft )  
                      }
                      else{
                        //str=str.slice(countLeft, -countRight );
			str=str.substr(countLeft,str.length-countRight)
                      }
                      return str 
                    // без этих if вот такой ввод ->( ф)  вернет пустую строку
*/
                }


var cleanWord=deleteProb(str);
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+'-'+ cleanWord+'-');
}

//  есть короче вариант :))  

//console.log(str.replace(' ',''));
